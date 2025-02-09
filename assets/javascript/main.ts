// variables
let msgTxt = document.querySelector(
		"main .container > .right .send_message input"
	),
	sendButton = document.querySelector(
		"main .container > .right .send_message img"
	),
	sender: string | null = localStorage.getItem("sender"),
	ChangeLoginPageButton: HTMLElement =
		document.querySelector(".container > .Register")! ||
		document.querySelector(".container > .Register"),
	registerLogin = document.querySelector(".logIn form"),
	registerForm = document.querySelector(".register form"),
	user = localStorage.getItem("sender"),
	allUsers = [],
	allMessages = [],
	allowed = false,
	loginInput = document.querySelectorAll(
		"main .container .before_login .container .box .cont input"
	),
	friendsList = document.querySelector("main .container > .left .friends"),
	account: HTMLElement = document.querySelector("header .account")!,
	windowWidth = window.innerWidth,
	// ipv4: string = "192.168.1.102";
	ipv4: string = "127.0.0.1";

if (localStorage.getItem("sender") !== null) {
	sender = localStorage.getItem("sender");
} else {
	localStorage.setItem("sender", "null");
}
if (localStorage.getItem("loggedIn") == null) {
	localStorage.setItem("loggedIn", String(false));
}

interface Module {
	sendMsg: (chatId: number, message: string, receiver: string) => void;
	// sendUsers: (userName: string, password: string | number) => void;
	// chatsContainer: (
	//     chatId: string | number,
	//     message: string,
	//     receiver: string
	// ) => void;
	// chatId, message, receiver
}
const module: Partial<Module> = {}; // Declare module with

// Send message Django api
async function sendMsg(
	chatId: number,
	message: string,
	receiver: string
): Promise<void> {
	// API URL
	const apiUrl = `http://${ipv4}:8000/api/chat/save-message/`;

	let sender = localStorage.getItem("sender");
	let userId = localStorage.getItem("sender_id");
	let token = localStorage.getItem("token");
	var BigDate = new Date();
	var date = BigDate.toLocaleString();
	var timestamp = new Date().getTime();
	// console.log(chatId, message, receiver)
	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				message: {
					sender: sender,
					msg: message,
					receiver: receiver,
					date: date,
					chatId: chatId,
				},
				user: {
					userId: userId,
				},
			}),
		});

		// Handle response
		const responseData = await response.json();

		if (response.ok) {
			console.log(`Success: ${responseData.message}`);
		} else {
			console.log(`Error: ${responseData.error || "An error occurred"}`);
		}
	} catch (error: any) {
		console.log(`Network Error: ${error.message}`);
	}
}

// Send message Django api
async function getOpenChatMessageApi(chatId: number): Promise<void> {
	let userId = localStorage.getItem("sender_id");
	let token = localStorage.getItem("token");
	// API URL
	// console.log(userId);
	const apiUrl = `http://${ipv4}:8000/api/chat/OpenedChatMessages/?chatId=${chatId}&userId=${userId}`;

	try {
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
		});

		// Handle response
		const responseData = await response.json();
		if (response.ok) {
			// console.log("Success", responseData.chat);
			viewMessages(null, responseData.chat);
			return responseData.chat;
		} else {
			console.log(`Error: ${responseData.error || "An error occurred"}`);
		}
	} catch (error: any) {
		console.log(`Network Error: ${error.message}`);
	}
}

let userId = localStorage.getItem("sender_id");
let token = localStorage.getItem("token");
declare var io: any;
let socket = io(`http://${ipv4}:3002`, {
	reconnectionAttempts: 3, // Retry 10 times if the connection fails
	timeout: 30000, // Wait 30 seconds for a connection
	transports: ["websocket", "polling"],
	auth: {
		token: token,
		userId: userId,
	},
});
console.log("Connecting to Socket.IO...");

socket.on("connect", () => {
	console.log("Connected to server with ID:", socket.id);

	socket.on("newMessage", (data: any) => {
		console.log("New message:", data);
	});
});

socket.on("connect_error", (error: any) => {
	console.log("server can`t connect", error);
});

// Handle disconnection
socket.on("disconnect", () => {
	console.log("Disconnected from server");
});

// // handle this function
// const unsubscribeFromChat = (chatId: any) => {
// 	console.log(`Unsubscribing from chat: ${chatId}`);
// 	socket.emit("unsubscribeFromChat", chatId);
// };

function setupListeners(chatId: number) {
	// Unsubscribe from previous chat to avoid duplication
	socket.emit("unsubscribeFromChat", chatId.toString());

	// Subscribe to the new chat
	socket.emit("subscribeToChat", chatId.toString());
	console.log(`Subscribed to chat: ${chatId}`);

	// Remove previous listeners to avoid duplication
	socket.off("newMessage");
	socket.on("newMessage", (data: any) => {
		console.log("New message received:", data, data.message);
		viewMessages(data.message, null); // Call your message handling function
	});
}

// function stopListeningToChat(chatId: number) {
// 	console.log(`Unsubscribing from chat: ${chatId}`);
// 	socket.emit("unsubscribeFromChat", chatId.toString());
// }

/********************* login and register page and logout handle *********************/
//  check if loggedIn
async function checkIfLogged(check: null | string) {
	let before_login: HTMLElement | null =
		document.querySelector(".before_login")!;
	// if not logged in
	if (String(check) == "null" || String(check) == "false") {
		console.log("not login");
		localStorage.setItem("loggedIn", String(false));
		before_login.style.cssText = "display: flex";
		account.querySelector(".main_header .account .userName")!.innerHTML = "";
		account.style.display = "none";
		loginAndRegister();
		// if logged in
	} else if (String(check) == "true" || String(check) != "null") {
		console.log("login");
		localStorage.setItem("loggedIn", String(true));
		sender = localStorage.getItem("sender");
		before_login.style.cssText = "display: none";
		const userNameElement: HTMLElement = account.querySelector(
			".main_header .account .userName"
		)!;
		if (userNameElement && sender) {
			userNameElement.innerHTML = sender;
		}
		account.style.display = "flex";
		await handleFriendsList();
	}
}
checkIfLogged(sender);

// Login handle
async function loginHandle(user_name: string, password: string): Promise<void> {
	// API URL
	const apiUrl = `http://${ipv4}:8000/api/chat/login/`;

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_name: user_name,
				password: password,
				platform: "web",
			}),
			// credentials: "include",
		});

		// Handle response
		const responseData = await response.json();
		// console.log(responseData);
		console.log("Cookies sent:", document.cookie);
		if (response.ok) {
			console.log(`Success: ${JSON.stringify(responseData)}`);
			return responseData;
		} else {
			console.log(`Error: ${responseData.error || "An error occurred"}`);
		}
	} catch (error: any) {
		console.log(`Network Error: ${error.message}`);
	}
}
// Login handle
async function registerHandle(
	user_name: string,
	password: string,
	gender: string
): Promise<void> {
	// API URL
	const apiUrl = `http://${ipv4}:8000/api/chat/Signup/`;

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_name: user_name,
				password: password,
				gender: gender,
				Platform: "web",
			}),
		});

		// Handle response
		const responseData = await response.json();
		// console.log(responseData);
		if (response.ok) {
			console.log(`Success: ${JSON.stringify(responseData)}`);
			return responseData;
		} else {
			console.log(`Error: ${responseData.error || "An error occurred"}`);
		}
	} catch (error: any) {
		console.log(`Network Error: ${error.message}`);
	}
}

// login and register handle
// Define types for the input elements and other elements you are interacting with
function loginAndRegister(): void {
	// Handle hide and show password
	const hidePassword: NodeListOf<HTMLElement> = document.querySelectorAll(
		"main > .container .before_login > .container .box form .cont .container img"
	);
	hidePassword.forEach((element) => {
		element.addEventListener("click", function () {
			const parent = element.parentElement;

			if (parent) {
				// Check if parentElement is not null
				const input = parent.querySelector("input");

				if (input && input.type === "text") {
					// Check if input is not null
					input.type = "password";
				} else if (input) {
					input.type = "text";
				}
			} else {
				console.error("Parent element not found.");
			}
		});
	});

	/************** register **************/
	async function register(): Promise<void> {
		let registerCard: HTMLElement = document.querySelector(
			"main .container .before_login .container .register"
		)!;
		let registerForm: HTMLFormElement =
			document.querySelector(".register form")!;
		let userName: HTMLInputElement = registerCard.querySelector(
			".container .before_login .container .box .cont  .name"
		)!;
		let password: HTMLInputElement = registerCard.querySelector(
			".container .before_login .container .box .cont  .password"
		)!;
		let registerButton = document.querySelector(
			"main .container .before_login .container .box  .register_button"
		)!;
		let gender: HTMLSelectElement = document.querySelector(
			"main .container .before_login .container .box  .gender"
		)!;
		let confirmPassword: HTMLInputElement = document.querySelector(
			".container .before_login .container .box .cont  .confirm_password"
		)!;
		let registrationPasswordAlarm: HTMLElement = document.querySelector(
			".container .before_login .container .box.register .cont .alarm.password"
		)!;
		let registrationUserNameAlarm = document.querySelector(
			".container .before_login .container .box.register .cont .alarm.userName"
		)!;
		let passwordCheck = false;

		// check password
		confirmPassword.addEventListener("input", function () {
			if (
				password.value.length <= confirmPassword.value.length &&
				confirmPassword.value !== password.value
			) {
				registrationPasswordAlarm.style.cssText =
					"display: block; background: #f29999;";
				confirmPassword.style.cssText = "background-color: #f29999;";
				passwordCheck = false;
			} else if (confirmPassword.value == password.value) {
				registrationPasswordAlarm.style.display = "none";
				confirmPassword.style.cssText = "background-color: #1296d1;";
				passwordCheck = true;
			}
		});

		// send new user
		registerButton.addEventListener("click", async function (): Promise<void> {
			let allCheck =
				// userName.value.length >= 2 &&
				passwordCheck && gender.value && registerForm.checkValidity(); // return boolean
			// let key: number | string;
			try {
				if (allCheck) {
					let result: any = await registerHandle(
						userName.value,
						password.value,
						gender.value
					);
					console.log("result", result);
					if (result.response == "user_name_founded") {
						registrationUserNameAlarm.classList.add("open");
					} else {
						registrationUserNameAlarm.classList.remove("open");
						// handleNewUser();
						localStorage.setItem("loggedIn", "true");
						localStorage.setItem("sender", userName.value);
						localStorage.setItem("sender_id", result.userId);
						localStorage.setItem("token", result.token);
						checkIfLogged("true");
						userName.value = "";
						password.value = "";
						confirmPassword.value = "";
						ChangeLoginPageButton.click();
					}
				}
			} catch (error) {
				console.error("Login error: ", error);
			}
		});
	}
	register();

	/************** login **************/
	async function login(): Promise<void> {
		const userNameInput = document.querySelector(
			".before_login .container .box form .cont .name"
		) as HTMLInputElement; // Type assertion
		const passwordInput = document.querySelector(
			".before_login .container .box form .cont .password"
		) as HTMLInputElement; // Type assertion
		const loginAlarm = document.querySelector(
			".container .before_login .container .box.logIn .cont .alarm"
		) as HTMLElement; // Type assertion
		const loginButton = document.querySelector(
			"main .container .before_login .container .box  .login_button"
		) as HTMLElement; // Type assertion

		loginButton.addEventListener("click", async function (): Promise<void> {
			if (userNameInput.value.length > 0 && passwordInput.value.length > 0) {
				try {
					// Await the result of the loginHandle function
					let result: any = await loginHandle(
						userNameInput.value,
						passwordInput.value
					);
					if (result.Found == "true") {
						loginAlarm.classList.remove("open");
						localStorage.setItem("loggedIn", "true");
						localStorage.setItem("sender", userNameInput.value);
						localStorage.setItem("sender_id", result.userId);
						localStorage.setItem("token", result.token);
						checkIfLogged("true");
						userNameInput.value = "";
						passwordInput.value = "";
					} else {
						loginAlarm.classList.add("open");
					}
				} catch (error) {
					console.error("Login error: ", error);
				}
			} else {
				loginAlarm.classList.add("open");
			}
		});
	}
	login();
}

// change between register and login button
ChangeLoginPageButton.addEventListener("click", function () {
	let loginBox: HTMLElement = document.querySelector(".logIn")!;
	let registerBox: HTMLElement = document.querySelector(".register")!;
	if (loginBox.style.display == "none") {
		loginBox.style.cssText = "display: flex";
		registerBox.style.cssText = "display: none";
		ChangeLoginPageButton.innerHTML = "Register";
	} else {
		loginBox.style.cssText = "display: none";
		registerBox.style.cssText = "display: flex";
		ChangeLoginPageButton.innerHTML = "Login";
	}
});

// logout button handle
account
	.querySelector(".main_header .account .logout")!
	.addEventListener("click", function () {
		localStorage.setItem("loggedIn", "false");
		localStorage.setItem("sender", "null");
		localStorage.setItem("sender_id", "null");
		localStorage.setItem("receiver", "null");
		localStorage.setItem("opened_chat", "null");
		localStorage.setItem("addedFriends", "null");
		localStorage.removeItem("token");
		checkIfLogged("false");
		account.querySelector(".main_header .account .userName")!.innerHTML = "";
	});
/********************* login and register page and logout handle *********************/

/********************* handle friends list *********************/
async function handleFriendsList() {
	let userId = localStorage.getItem("sender_id");
	let token = localStorage.getItem("token");
	async function GetAllUsers() {
		// console.log(userId, token);
		const apiUrl = `http://${ipv4}:8000/api/chat/getFriendsList/?userId=${userId}`;
		try {
			const response = await fetch(apiUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				// credentials: "include",
			});

			// Handle response
			const responseData = await response.json();
			console.log(`users: ${JSON.stringify(responseData)}`);
			if (response.ok) {
				putFriendsToPage(responseData.users);
				localStorage.setItem(
					"addedFriends",
					JSON.stringify(responseData.users)
				);
				return responseData;
			} else {
				console.log(`Error: ${responseData.error || "An error occurred"}`);
				putFriendsToPage(false);
			}
		} catch (error: any) {
			console.log(`Network Error: ${error.message}`);
			putFriendsToPage(false);
		}
	}
	await GetAllUsers();

	function putFriendsToPage(users: any) {
		let friendsList: HTMLElement = document.querySelector(
			"main .container > .left .friends"
		)!;

		if (users) {
			friendsList.innerHTML = "";
			for (const chat of users) {
				let friend: HTMLElement = document.createElement("div");
				friend.className = "friend";
				friend.setAttribute("id", chat.id);

				let userPhoto = document.createElement("img");
				userPhoto.className = "user_photo";
				userPhoto.src = "assets/imgs/user.png";

				let cont = document.createElement("div");
				cont.className = "cont";

				let h1 = document.createElement("h1");
				h1.className = "name";
				h1.innerHTML = chat.user_name;

				// let h2 = document.createElement("h2")
				// h2.classList = "last-message"

				cont.appendChild(h1);
				friend.appendChild(userPhoto);
				friend.appendChild(cont);
				friendsList.appendChild(friend);
			}
		} else {
			let errorH1 = document.createElement("h1");
			errorH1.classList.add("friends_list_error");
			errorH1.innerText = "Server Error";
			friendsList.appendChild(errorH1);
		}
	}

	handleChat();
}
/********************* handle friends list *********************/

/********************* handle chat *********************/
// handle open chat
function handleChat() {
	let chatBox: HTMLElement = document.querySelector(
		"main .container > .right"
	)!;
	let friendsList = document.querySelectorAll(
		"main .container > .left .friends .friend"
	);
	chatBox.innerHTML = "";

	friendsList.forEach((element) => {
		element.addEventListener("click", function () {
			let chat_id = Number(localStorage.getItem("opened_chat"));
			// stopListeningToChat(chat_id);
			if (windowWidth < 600) {
				chatBox.style.cssText = "display: flex;";
				element.parentElement!.parentElement!.style.cssText = "display: none;";
			}

			let receiverName = element.querySelector(".name")!;
			const receiverId = element.getAttribute("id")!;
			const senderId = localStorage.getItem("sender_id")!;
			const receiverLastFourNums = receiverId.slice(-2)!;
			const senderLastFourNums = senderId.slice(-2)!;
			console.log(receiverId, senderId);
			const chatId = +receiverLastFourNums + +senderLastFourNums;
			localStorage.setItem("opened_chat", chatId.toString());
			localStorage.setItem("receiver", receiverName.innerHTML);

			chatBox.innerHTML = "";

			// Creating the header
			const header = document.createElement("header");

			// Left part of the header
			const leftDiv = document.createElement("div");
			leftDiv.className = "left";

			const userImg = document.createElement("img");
			userImg.src = "assets/imgs/user.png";
			userImg.alt = "user-photo";

			const userCont = document.createElement("div");
			userCont.className = "cont";

			const userName = document.createElement("h2");
			userName.className = "name";
			userName.innerHTML = element.querySelector(".name")!.innerHTML;

			userCont.appendChild(userName);
			leftDiv.appendChild(userImg);
			leftDiv.appendChild(userCont);

			// Right part of the header
			const rightDiv = document.createElement("div");
			rightDiv.className = "right";

			let width = screen.width;
			if (width <= 600) {
				const searchImg = document.createElement("img");
				searchImg.src = "assets/imgs/cross.png";
				searchImg.alt = "exit-chat";
				rightDiv.appendChild(searchImg);
			}

			// Append left and right parts to the header
			header.appendChild(leftDiv);
			header.appendChild(rightDiv);

			// Create the send message section
			const sendMessageDiv = document.createElement("div");
			sendMessageDiv.className = "send_message";

			const formSendMessageDiv = document.createElement("form");
			formSendMessageDiv.onsubmit = () => false;

			const messageInput = document.createElement("input");
			messageInput.type = "text";
			messageInput.placeholder = "send message";
			messageInput.required = true;

			// <input type="image" src="path/to/your/image.png" alt="Submit" />
			const sendImg = document.createElement("input");
			sendImg.type = "image";
			sendImg.src = "assets/imgs/send.png";
			sendImg.alt = "Submit";

			formSendMessageDiv.appendChild(messageInput);
			formSendMessageDiv.appendChild(sendImg);
			sendMessageDiv.appendChild(formSendMessageDiv);

			// Append all sections to the body (or any container)
			chatBox.appendChild(header);
			chatBox.appendChild(sendMessageDiv);
			allowed = true;
			sendMessage();
			// getNewOpenChatMessages(chatId);
			setupListeners(chatId);
			// console.log("calling getOpenChatMessageApi()", chatId);
			getOpenChatMessageApi(chatId);

			if (width <= 600) {
				// handle close chat
				let exitButton: HTMLElement = document.querySelector(
					"main > .container > .right header .right img"
				)!;
				exitButton.addEventListener("click", function () {
					chatBox.style.cssText = "display: none;";
					element.parentElement!.parentElement!.style.cssText =
						"display: flex;";
				});
			}

			// CHeckIfAnyChangesInChatsListener();
		});
	});

	// handle send message
	function sendMessage() {
		let input: HTMLInputElement = document.querySelector(
			"main .container > .right .send_message input"
		)!;
		let img = document.querySelector(
			'main .container > .right .send_message input[type="image"]'
		)!;
		let form = document.querySelector(
			"main .container > .right .send_message form"
		)!;
		form.addEventListener("submit", function (event) {
			event.preventDefault(); // Prevents the form from submitting
		});

		img.addEventListener("click", function () {
			let receiver = localStorage.getItem("receiver");
			const openedChat = localStorage.getItem("opened_chat");
			const message = input.value;

			if (openedChat && message && receiver) {
				// Call the function with the correct parameters
				sendMsg(Number(openedChat), message, receiver);
				input.value = "";
			} else {
				// Handle cases where one of the values might be null or undefined
				console.error("Error: One or more required values are missing.");
			}
		});
	}
}

// handle view messages
async function viewMessages(newMessageData?: any, messagesData?: {} | null) {
	// console.log("up #####", newMessageData, messagesData);
	let sender = localStorage.getItem("sender");
	let receiver = localStorage.getItem("receiver");
	let rightDiv = document.querySelector("main .container > .right")!;
	let chatDiv = document.querySelector("main .container > .right .chat")!;

	if (chatDiv == null) {
		chatDiv = document.createElement("div");
		chatDiv.className = "chat";
	}

	if (messagesData != null) {
		for (const [key, data] of Object.entries(messagesData)) {
			putMessagesInThePage(
				data as { date: string; msg: string; receiver: string; sender: string }
			);
		}
	} else {
		// console.log("new-message", newMessageData);
		putMessagesInThePage(newMessageData);
	}

	function putMessagesInThePage(
		// messageKey: number,
		messageData: { date: string; msg: string; receiver: string; sender: string }
	) {
		// console.log("new-message", messageData);
		// let dateObj = new Date(+messageKey);
		// let options: Intl.DateTimeFormatOptions = {
		// 	hour: "numeric",
		// 	minute: "numeric",
		// 	hour12: true,
		// };
		// let formattedDate = dateObj.toLocaleString("en-US", options);

		// console.log(chatDiv)
		if (messageData.receiver === sender) {
			const friendMessageDiv = document.createElement("div");
			friendMessageDiv.className = "friend_message";

			const friendCont = document.createElement("div");
			friendCont.className = "cont";

			const friendContent = document.createElement("h3");
			friendContent.className = "content";
			friendContent.textContent = messageData.msg;

			const friendDate = document.createElement("h4");
			friendDate.className = "date";
			friendDate.innerText = messageData.date;

			friendCont.appendChild(friendContent);
			friendCont.appendChild(friendDate);
			friendMessageDiv.appendChild(friendCont);
			chatDiv.appendChild(friendMessageDiv);
		}

		if (sender === messageData.sender) {
			const myMessageDiv = document.createElement("div");
			myMessageDiv.className = "my_message";

			const myCont = document.createElement("div");
			myCont.className = "cont";

			const myContent = document.createElement("h3");
			myContent.className = "content";
			myContent.textContent = messageData.msg;

			const myDate = document.createElement("h4");
			myDate.className = "date";
			myDate.textContent = messageData.date;

			myCont.appendChild(myContent);
			myCont.appendChild(myDate);
			myMessageDiv.appendChild(myCont);

			chatDiv.appendChild(myMessageDiv);
		}
	}

	if (rightDiv.children.length == 2) {
		rightDiv.insertBefore(chatDiv, rightDiv.querySelector(".send_message"));
	}

	chatDiv.scrollTop = chatDiv.scrollHeight;
}
