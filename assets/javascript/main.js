"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// variables
let msgTxt = document.querySelector("main .container > .right .send_message input"), sendButton = document.querySelector("main .container > .right .send_message img"), sender = localStorage.getItem("sender"), ChangeLoginPageButton = document.querySelector(".container > .Register") ||
    document.querySelector(".container > .Register"), registerLogin = document.querySelector(".logIn form"), registerForm = document.querySelector(".register form"), user = localStorage.getItem("sender"), allUsers = [], allMessages = [], allowed = false, loginInput = document.querySelectorAll("main .container .before_login .container .box .cont input"), friendsList = document.querySelector("main .container > .left .friends"), logoutButton = document.querySelector("main .container .logout") ||
    document.querySelector("main .container .logout"), windowWidth = window.innerWidth;
if (localStorage.getItem("sender") !== null) {
    sender = localStorage.getItem("sender");
}
else {
    localStorage.setItem("sender", "null");
}
if (localStorage.getItem("loggedIn") == null) {
    localStorage.setItem("loggedIn", String(false));
}
const module = {}; // Declare module with
// Send message Django api
function sendMsg(chatId, message, receiver) {
    return __awaiter(this, void 0, void 0, function* () {
        // API URL
        const apiUrl = "http://127.0.0.1:8000/api/chat/save-message/";
        let sender = localStorage.getItem("sender");
        var BigDate = new Date();
        var date = BigDate.toLocaleString();
        var timestamp = new Date().getTime();
        // console.log(chatId, message, receiver)
        try {
            const response = yield fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: sender,
                    msg: message,
                    receiver: receiver,
                    date: date,
                    messageTime: timestamp,
                    chatId: chatId,
                }),
            });
            // Handle response
            const responseData = yield response.json();
            if (response.ok) {
                // console.log(`Success: ${responseData.message}`);
            }
            else {
                // console.log(`Error: ${responseData.error || "An error occurred"}`);
            }
        }
        catch (error) {
            console.log(`Network Error: ${error.message}`);
        }
    });
}
// Send message Django api
// async function getOpenChatMessageApi(chatId: any): Promise<Record<string, any> | null> {
function getOpenChatMessageApi(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        // API URL
        const apiUrl = "http://127.0.0.1:8000/api/chat/OpenedChatMessages/";
        try {
            const response = yield fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId
                }),
            });
            // Handle response
            const responseData = yield response.json();
            if (response.ok) {
                // console.log("Success", responseData.chat);
                return responseData.chat;
            }
            else {
                console.log(`Error: ${responseData.error || "An error occurred"}`);
            }
        }
        catch (error) {
            console.log(`Network Error: ${error.message}`);
        }
    });
}
const socket = io("http://localhost:3002");
function getNewOpenChatMessages(chatId) {
    console.log("Attempting to listen for messages on chat:", chatId);
    // Ensure the socket is connected before subscribing
    if (socket.connected) {
        setupListeners(chatId);
    }
    else {
        socket.once("connect", () => {
            console.log("Connected to server with ID:", socket.id);
            setupListeners(chatId);
        });
    }
    // Handle disconnection
    socket.once("disconnect", () => {
        console.log("Disconnected from server");
    });
}
function setupListeners(chatId) {
    // Unsubscribe from previous chat to avoid duplication
    socket.emit("unsubscribeFromChat", chatId.toString());
    console.log(`Subscribed to chat: ${chatId}`);
    // Subscribe to the new chat
    socket.emit("subscribeToChat", chatId.toString());
    // Remove previous listeners to avoid duplication
    socket.off("newMessage");
    socket.on("newMessage", (data) => {
        console.log("New message received:", data);
        viewMessages(data.id, data.Data); // Call your message handling function
    });
}
function stopListeningToChat(chatId) {
    console.log(`Unsubscribing from chat: ${chatId}`);
    socket.emit("unsubscribeFromChat", chatId.toString());
}
// Example usage: stop listening to chat "98" after 10 seconds
// setTimeout(() => {
//     stopListeningToChat(119);
// }, 10000);
// Login handle 
function loginHandle(user_name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // API URL
        const apiUrl = "http://127.0.0.1:8000/api/chat/login/";
        try {
            const response = yield fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_name: user_name,
                    password: password,
                }),
            });
            // Handle response
            const responseData = yield response.json();
            // console.log(responseData);
            if (response.ok) {
                console.log(`Success: ${JSON.stringify(responseData)}`);
                return responseData;
            }
            else {
                console.log(`Error: ${responseData.error || "An error occurred"}`);
            }
        }
        catch (error) {
            console.log(`Network Error: ${error.message}`);
        }
    });
}
// Login handle 
function registerHandle(user_name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // API URL
        const apiUrl = "http://127.0.0.1:8000/api/chat/Signup/";
        try {
            const response = yield fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_name: user_name,
                    password: password,
                }),
            });
            // Handle response
            const responseData = yield response.json();
            // console.log(responseData);
            if (response.ok) {
                console.log(`Success: ${JSON.stringify(responseData)}`);
                return responseData;
            }
            else {
                console.log(`Error: ${responseData.error || "An error occurred"}`);
            }
        }
        catch (error) {
            console.log(`Network Error: ${error.message}`);
        }
    });
}
/********************* login and register page and logout handle *********************/
//  check if loggedIn
function checkIfLogged(check) {
    return __awaiter(this, void 0, void 0, function* () {
        let before_login = document.querySelector(".before_login");
        // if not logged in
        if (String(check) == "null" || String(check) == "false") {
            console.log("not login");
            localStorage.setItem("loggedIn", String(false));
            before_login.style.cssText = "display: flex";
            logoutButton.style.display = "none";
            loginAndRegister();
            // if logged in
        }
        else if (String(check) == "true" || String(check) != "null") {
            console.log("login");
            localStorage.setItem("loggedIn", String(true));
            sender = localStorage.getItem("sender");
            before_login.style.cssText = "display: none";
            logoutButton.style.display = "unset";
            yield handleFriendsList();
            // handleChat();
            // getChatsMessages();
            // CHeckIfAnyChangesInChatsListener();
        }
    });
}
checkIfLogged(sender);
// login and register handle
// Define types for the input elements and other elements you are interacting with
function loginAndRegister() {
    // Handle hide and show password
    const hidePassword = document.querySelectorAll("main > .container .before_login > .container .box form .cont .container img");
    hidePassword.forEach((element) => {
        element.addEventListener("click", function () {
            const parent = element.parentElement;
            if (parent) {
                // Check if parentElement is not null
                const input = parent.querySelector("input");
                if (input && input.type === "text") {
                    // Check if input is not null
                    input.type = "password";
                }
                else if (input) {
                    input.type = "text";
                }
            }
            else {
                console.error("Parent element not found.");
            }
        });
    });
    /************** register **************/
    function register() {
        return __awaiter(this, void 0, void 0, function* () {
            let registerCard = document.querySelector("main .container .before_login .container .register");
            let registerForm = document.querySelector(".register form");
            let userName = registerCard.querySelector(".container .before_login .container .box .cont  .name");
            let password = registerCard.querySelector(".container .before_login .container .box .cont  .password");
            let registerButton = document.querySelector("main .container .before_login .container .box  .register_button");
            let confirmPassword = document.querySelector(".container .before_login .container .box .cont  .confirm_password");
            let registrationPasswordAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.password");
            let registrationUserNameAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.userName");
            let passwordCheck = false;
            // check password
            confirmPassword.addEventListener("input", function () {
                if (password.value.length <= confirmPassword.value.length &&
                    confirmPassword.value !== password.value) {
                    registrationPasswordAlarm.style.cssText =
                        "display: block; background: #f29999;";
                    confirmPassword.style.cssText = "background-color: #f29999;";
                    passwordCheck = false;
                }
                else if (confirmPassword.value == password.value) {
                    registrationPasswordAlarm.style.display = "none";
                    confirmPassword.style.cssText = "background-color: #1296d1;";
                    passwordCheck = true;
                }
            });
            // send new user
            registerButton.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    let allCheck = userName.value.length > 2 &&
                        passwordCheck &&
                        registerForm.checkValidity(); // return boolean
                    // let key: number | string;
                    try {
                        if (allCheck) {
                            let result = yield registerHandle(userName.value, password.value);
                            console.log("result", result);
                            if (result.response == "user_name_founded") {
                                registrationUserNameAlarm.classList.add("open");
                            }
                            else {
                                registrationUserNameAlarm.classList.remove("open");
                                // handleNewUser();
                                localStorage.setItem("loggedIn", "true");
                                localStorage.setItem("sender", userName.value);
                                localStorage.setItem("sender_id", result.key);
                                checkIfLogged('true');
                                userName.value = "";
                                password.value = "";
                                confirmPassword.value = "";
                                ChangeLoginPageButton.click();
                            }
                        }
                    }
                    catch (error) {
                        console.error("Login error: ", error);
                    }
                });
            });
        });
    }
    register();
    /************** login **************/
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            const userNameInput = document.querySelector(".before_login .container .box form .cont .name"); // Type assertion
            const passwordInput = document.querySelector(".before_login .container .box form .cont .password"); // Type assertion
            const loginAlarm = document.querySelector(".container .before_login .container .box.logIn .cont .alarm"); // Type assertion
            const loginButton = document.querySelector("main .container .before_login .container .box  .login_button"); // Type assertion
            loginButton.addEventListener("click", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (userNameInput.value.length > 0 && passwordInput.value.length > 0) {
                        try {
                            // Await the result of the loginHandle function
                            let result = yield loginHandle(userNameInput.value, passwordInput.value);
                            if (result.Found == "true") {
                                loginAlarm.classList.remove("open");
                                localStorage.setItem("loggedIn", "true");
                                localStorage.setItem("sender", userNameInput.value);
                                localStorage.setItem("sender_id", result.user_id);
                                checkIfLogged("true");
                                userNameInput.value = "";
                                passwordInput.value = "";
                            }
                            else {
                                loginAlarm.classList.add("open");
                            }
                        }
                        catch (error) {
                            console.error("Login error: ", error);
                        }
                    }
                    else {
                        loginAlarm.classList.add("open");
                    }
                });
            });
        });
    }
    login();
}
// change between register and login button
ChangeLoginPageButton.addEventListener("click", function () {
    let loginBox = document.querySelector(".logIn");
    let registerBox = document.querySelector(".register");
    if (loginBox.style.display == "none") {
        loginBox.style.cssText = "display: flex";
        registerBox.style.cssText = "display: none";
        ChangeLoginPageButton.innerHTML = "Register";
    }
    else {
        loginBox.style.cssText = "display: none";
        registerBox.style.cssText = "display: flex";
        ChangeLoginPageButton.innerHTML = "Login";
    }
});
// logout button handle
logoutButton.addEventListener("click", function () {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("sender", "null");
    localStorage.setItem("sender_id", "null");
    localStorage.setItem("receiver", "null");
    localStorage.setItem("opened_chat", "null");
    checkIfLogged("false");
});
/********************* login and register page handle *********************/
/********************* handle friends list *********************/
function handleFriendsList() {
    return __awaiter(this, void 0, void 0, function* () {
        sender = localStorage.getItem("sender");
        let users;
        let apiResponse;
        function GetAllUsers(sender) {
            return __awaiter(this, void 0, void 0, function* () {
                // API URL
                const apiUrl = "http://127.0.0.1:8000/api/chat/getFriendsList/";
                try {
                    const response = yield fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            sender: sender
                        }),
                    });
                    // Handle response
                    const responseData = yield response.json();
                    if (response.ok) {
                        // console.log(`users: ${responseData.users}`);
                        users = responseData.users;
                        apiResponse = true;
                        return responseData;
                    }
                    else {
                        // console.log(`Error: ${responseData.error || "An error occurred"}`);
                        apiResponse = false;
                    }
                }
                catch (error) {
                    // console.log(`Network Error: ${error.message}`);
                    apiResponse = false;
                }
            });
        }
        yield GetAllUsers(sender);
        let friendsList = document.querySelector("main .container > .left .friends");
        // console.log(apiResponse)
        if (apiResponse) {
            friendsList.innerHTML = "";
            for (const key in users) {
                let friend = document.createElement("div");
                friend.className = "friend";
                friend.setAttribute("id", key);
                let userPhoto = document.createElement("img");
                userPhoto.className = "user_photo";
                userPhoto.src = "assets/imgs/user.png";
                let cont = document.createElement("div");
                cont.className = "cont";
                let h1 = document.createElement("h1");
                h1.className = "name";
                h1.innerHTML = users[key].user_name;
                // let h2 = document.createElement("h2")
                // h2.classList = "last-message"
                cont.appendChild(h1);
                friend.appendChild(userPhoto);
                friend.appendChild(cont);
                friendsList.appendChild(friend);
            }
        }
        else {
            let errorH1 = document.createElement("h1");
            errorH1.classList.add("friends_list_error");
            errorH1.innerText = "Server Error";
            friendsList.appendChild(errorH1);
        }
        localStorage.setItem("addedFriends", JSON.stringify(users));
        handleChat();
    });
}
/********************* handle friends list *********************/
/********************* handle chat *********************/
// handle open chat
function handleChat() {
    let chatBox = document.querySelector("main .container > .right");
    let friendsList = document.querySelectorAll("main .container > .left .friends .friend");
    chatBox.innerHTML = "";
    friendsList.forEach((element) => {
        element.addEventListener("click", function () {
            let chat_id = Number(localStorage.getItem('opened_chat'));
            stopListeningToChat(chat_id);
            if (windowWidth < 600) {
                chatBox.style.cssText = "display: flex;";
                element.parentElement.parentElement.style.cssText = "display: none;";
            }
            let receiverName = element.querySelector(".name");
            const receiverId = element.getAttribute("id");
            const senderId = localStorage.getItem("sender_id");
            const receiverLastFourNums = receiverId.slice(-2);
            const senderLastFourNums = senderId.slice(-2);
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
            userName.innerHTML = element.querySelector(".name").innerHTML;
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
            getNewOpenChatMessages(chatId);
            if (width <= 600) {
                // handle close chat
                let exitButton = document.querySelector("main > .container > .right header .right img");
                exitButton.addEventListener("click", function () {
                    chatBox.style.cssText = "display: none;";
                    element.parentElement.parentElement.style.cssText =
                        "display: flex;";
                });
            }
            // CHeckIfAnyChangesInChatsListener();
        });
    });
    // handle send message
    function sendMessage() {
        let input = document.querySelector("main .container > .right .send_message input");
        let img = document.querySelector('main .container > .right .send_message input[type="image"]');
        let form = document.querySelector("main .container > .right .send_message form");
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
            }
            else {
                // Handle cases where one of the values might be null or undefined
                console.error("Error: One or more required values are missing.");
            }
        });
    }
}
// handle view messages
function viewMessages(messageKey, newMessageData) {
    return __awaiter(this, void 0, void 0, function* () {
        let sender = localStorage.getItem("sender");
        let receiver = localStorage.getItem("receiver");
        let rightDiv = document.querySelector("main .container > .right");
        let chatDiv = document.querySelector("main .container > .right .chat");
        if (chatDiv == null) {
            chatDiv = document.createElement("div");
            chatDiv.className = "chat";
        }
        if (newMessageData && typeof newMessageData === "object") {
            let key = messageKey;
            let dateObj = new Date(+key);
            let options = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            let formattedDate = dateObj.toLocaleString("en-US", options);
            // console.log(chatDiv)
            if (newMessageData.receiver === sender) {
                const friendMessageDiv = document.createElement("div");
                friendMessageDiv.className = "friend_message";
                const friendCont = document.createElement("div");
                friendCont.className = "cont";
                const friendContent = document.createElement("h3");
                friendContent.className = "content";
                friendContent.textContent = newMessageData.msg;
                const friendDate = document.createElement("h4");
                friendDate.className = "date";
                friendDate.innerText = formattedDate;
                friendCont.appendChild(friendContent);
                friendCont.appendChild(friendDate);
                friendMessageDiv.appendChild(friendCont);
                chatDiv.appendChild(friendMessageDiv);
            }
            if (sender === newMessageData.sender) {
                const myMessageDiv = document.createElement("div");
                myMessageDiv.className = "my_message";
                const myCont = document.createElement("div");
                myCont.className = "cont";
                const myContent = document.createElement("h3");
                myContent.className = "content";
                myContent.textContent = newMessageData.msg;
                const myDate = document.createElement("h4");
                myDate.className = "date";
                myDate.textContent = formattedDate;
                myCont.appendChild(myContent);
                myCont.appendChild(myDate);
                myMessageDiv.appendChild(myCont);
                chatDiv.appendChild(myMessageDiv);
            }
            if (rightDiv.children.length == 2) {
                rightDiv.insertBefore(chatDiv, rightDiv.querySelector(".send_message"));
            }
        }
        else {
            console.error("Failed to fetch or process chat messages.");
        }
        chatDiv.scrollTop = chatDiv.scrollHeight;
    });
}
