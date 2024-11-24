
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {  getDatabase, ref, set,  onChildAdded , onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// import { initializeApp } from "firebase/app";
// import { query, equalTo, get, child , getDatabase, ref, set, remove, onChildAdded, onChildRemoved , onChildChanged, onValue } from "firebase/database";


// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZTDHJyKOpPtc6QV4mISVS8JDzYg7W5nA",
    authDomain: "chat-app-7742a.firebaseapp.com",
    projectId: "chat-app-7742a",
    storageBucket: "chat-app-7742a.appspot.com",
    messagingSenderId: "812879044915",
    appId: "1:812879044915:web:e61340195cb8523ec65e46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// variables
let msgTxt = document.querySelector('main .container > .right .send_message input'),
    sendButton = document.querySelector('main .container > .right .send_message img'),
    sender: string | null = localStorage.getItem("sender"),
    ChangeLoginPageButton: HTMLElement = document.querySelector(".container > .Register")! || document.querySelector(".container > .Register"),
    registerLogin = document.querySelector(".logIn form"),
    registerForm = document.querySelector(".register form"),
    user = sessionStorage.getItem("sender"),
    allUsers = [],
    allMessages = [],
    allowed = false,
    loginInput = document.querySelectorAll("main .container .before_login .container .box .cont input"),
    friendsList = document.querySelector("main .container > .left .friends"),
    logoutButton: HTMLElement = document.querySelector("main .container .logout")! || document.querySelector("main .container .logout"),
    windowWidth = window.innerWidth;

if(sessionStorage.getItem('sender') !== null){
    sender = sessionStorage.getItem('sender');
} else {
    sessionStorage.setItem('sender', "null")
}
if(sessionStorage.getItem('loggedIn') == null){
    sessionStorage.setItem("loggedIn", String(false))
} 


    // if(sendButton != null){
    //     sendButton.addEventListener("click", function() {
    //         // TO SEND MESSAGES
    //         module.sendUsers()
    //     })
    // }

interface Module {
    sendMsg: (chatId: number, message: string, receiver: string) => void;
    sendUsers: (userName: string, password: string | number) => void;
    chatsContainer: (chatId: string | number, message: string, receiver: string) => void;
    // chatId, message, receiver
}
const module: Partial<Module> = {};  // Declare module with 

// send users to database
module.sendUsers = function sendUsers(userName, password){
    // console.log(password)
    var timestamp = new Date().getTime();
    var BigDate = new Date()
    var date = BigDate.toLocaleString()
    set(ref(db,"users/"+timestamp),{
        user_name : userName,
        password : password,
        date: date
    })
}

// send message to database
module.sendMsg = function chatsContainer(chatId, message, receiver){
    var msg = message;
    sender = sessionStorage.getItem('sender');
    var BigDate = new Date()
    var date = BigDate.toLocaleString()
    var timestamp = new Date().getTime();
    set(ref(db,`chats/${+chatId}/` + timestamp),{
        msg : msg,
        sender : sender,
        receiver : receiver,
        date : date
    })
}

// get users
onValue(ref(db, 'users'), (snapshot: any) => {
    // console.log(snapshot.val())
    sessionStorage.setItem("all_users", JSON.stringify(snapshot.val()))
    loginAndRegister() 
}, {
    onlyOnce: true
});


// get every chat messages
function getChatsMessages() {
    onValue(ref(db, 'chats'), (snapshot: any) => {
        let sender = sessionStorage.getItem('sender')
        let allChats: any = {};
        for (const key in snapshot.val()) {
            let messageData: any = Object.values(snapshot.val()[key])[0]
            if (sender === String(messageData.sender) || sender === String(messageData.receiver)){
                allChats[key] = snapshot.val()[key]
            }
        }
        // console.log("allChats", allChats)
        sessionStorage.setItem("chats", JSON.stringify(allChats))
        if (allowed){
            viewMessages()
        }
    }, {
        onlyOnce: true
    });
}


async function CHeckIfAnyChangesInChatsListener(messageDate?: number) {
    let openedChat = sessionStorage.getItem("opened_chat")
    await onChildAdded(ref(db, `chats/${openedChat}`), (snapshot: any) => {
        const newMessage = snapshot.val();
        // console.log('New message:', newMessage);
        // console.log(`${newMessage.sender} >>>>>> ${newMessage.msg}`);
        // alert(`${newMessage.sender} >>>>>> ${newMessage.msg}`);
        getChatsMessages();
    });
}



let newUserAddedTime: number | string; 
function CHeckIfAnyUserRegistered(){
    onChildAdded(ref(db, 'users/'), (snapshot: any) => {
        // const newUser = snapshot.val();
        if (newUserAddedTime <= snapshot.key) {
            sessionStorage.setItem("sender_id", snapshot.key);
        }
    });
}

/************** GET NEW USERS WHEN SIGH UP *************/ 
function waitForNewUser() {
    return new Promise((resolve, reject) => {
        onChildAdded(ref(db, `users`), (snapshot: any) => {
            const newUserKey = snapshot.key; // Get the key of the new user
            const newUserData = snapshot.val(); // Get the data of the new user
            // console.log(newUserKey)
            // console.log(newUserData)

            // Resolve the Promise with an object containing both the key and the data
            resolve({ key: newUserKey, data: newUserData });
        }, (error: Error) => {
            reject(error);  // Handle any errors that occur
        });
    });
}

async function handleNewUser() {
    try {
        const newUser: any = await waitForNewUser();  // Wait for the Promise to resolve
        // console.log('New user key:', newUser.key); // 1725300481565
        // console.log('New user data:', newUser.data); //{"date": "9/2/2024, 9:08:01 PM","password": "","user_name": "ttrttevfggf" }

        let newUserKey: number | string = newUser.key
        let newUserData: object = newUser.data
        let newUserUserName: string = newUser.data.user_name
        let ullUsersAfterUpdate = JSON.parse(sessionStorage.getItem("all_users") ?? "[]");

        ullUsersAfterUpdate[newUserKey] = newUserData
        
        sessionStorage.setItem("sender_id", String(newUserKey))
        sessionStorage.setItem("sender", newUserUserName)
        sessionStorage.setItem("all_users", JSON.stringify(ullUsersAfterUpdate))

        handleFriendsList(ullUsersAfterUpdate)
    } catch (error) {
        console.error('Error waiting for new user:', error);
    }
}
/************** GET NEW USERS WHEN SIGH UP *************/ 


/********************* login and register page and logout handle *********************/ 
//  check if loggedIn
function checkIfLogged(check: null | string) {
    let before_login: HTMLElement | null = document.querySelector('.before_login')! || document.querySelector('.before_login');
    // if not logged in
    if(String(check) == "null" || String(check) == "false"){
        sessionStorage.setItem("loggedIn", String(false))
        before_login.style.cssText = "display: flex"
        logoutButton.style.display = "none"
    // if logged in
    } else if(String(check) == "true" || String(check) != "null") {
        // console.log("login")
        sender = sessionStorage.getItem('sender')
        sessionStorage.setItem("loggedIn", String(true))
        before_login.style.cssText = "display: none"
        logoutButton.style.display = "unset"
        handleFriendsList(JSON.parse(sessionStorage.getItem("all_users")  ?? "[]"))
        handleChat()
        getChatsMessages() 
        CHeckIfAnyChangesInChatsListener()
    }
}
checkIfLogged(sender)

// login and register handle
function loginAndRegister() {
    let all_users = JSON.parse(sessionStorage.getItem('all_users') ?? "[]")
    // console.log(all_users)

    // handle hide and show password
    let hidePassword = document.querySelectorAll("main > .container .before_login > .container .box form .cont .container img")
    hidePassword.forEach(element => {
            element.addEventListener("click", function() {
                const parent = element.parentElement;

                if (parent) {  // Check if parentElement is not null
                    let input = parent.querySelector("input");
                    
                    if (input && input.type === "text") {  // Check if input is not null
                        input.type = "password";
                    } else if (input) {
                        input.type = "text";
                    }
                } else {
                    console.error("Parent element not found.");
                }
            })
    });

    function register() {
            /************** register **************/ 
    let registerCard: HTMLElement = document.querySelector("main .container .before_login .container .register")!;
    let registerForm: HTMLFormElement = document.querySelector(".register form")!;
    let userName:  HTMLInputElement | null  = registerCard.querySelector(".container .before_login .container .box .cont  .name")!
    let password: HTMLInputElement | null = registerCard.querySelector(".container .before_login .container .box .cont  .password")!
    let registerButton = document.querySelector("main .container .before_login .container .box  .register_button")!;
    let confirmPassword: HTMLInputElement | null  = document.querySelector(".container .before_login .container .box .cont  .confirm_password")!
    let registrationPasswordAlarm: HTMLElement = document.querySelector(".container .before_login .container .box.register .cont .alarm.password")!
    let registrationUserNameAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.userName")!
    let passwordCheck = false;

    // check password
    confirmPassword.addEventListener("input", function() {
        if(password.value.length <= confirmPassword.value.length && confirmPassword.value !== password.value){
            registrationPasswordAlarm.style.cssText = 'display: block; background: #f29999;'
            confirmPassword.style.cssText = "background-color: #f29999;"
            passwordCheck = false
        } else if(confirmPassword.value == password.value){
            registrationPasswordAlarm.style.display = 'none'
            confirmPassword.style.cssText = "background-color: #1296d1;"
            passwordCheck = true
        }
    })
    // send new user
    registerButton.addEventListener("click", function() {
        let allCheck = userName.value.length > 2 && passwordCheck && registerForm.checkValidity(); // return boolean 
        let userExists = false;
        let key: number | string;
        for (const key in all_users) {
            // Check if the username matches
            if (userName.value === all_users[key].user_name) {
                userExists = true;  // Set flag if the user exists
                registrationUserNameAlarm.classList.add("open")
                break;  // Stop the loop if a match is found
            } else {
                registrationUserNameAlarm.classList.remove("open")
            }
        }
        if (!userExists && allCheck) {
            if (module.sendUsers){
                let date = new Date().getTime()
                newUserAddedTime = date
                module.sendUsers(userName.value, password.value);
            }
            handleNewUser();
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("sender", userName.value);
            CHeckIfAnyUserRegistered()
            checkIfLogged('true');
            userName.value = "";
            password.value = "";
            confirmPassword.value = "";
            ChangeLoginPageButton.click();
        } 
    })
    }
    register()

    function login() {
            /************** login **************/ 
    let userNameInput: HTMLInputElement = document.querySelector(".before_login .container .box form .cont .name")!
    let passwordInput: HTMLInputElement = document.querySelector(".before_login .container .box form .cont .password")!
    let loginAlarm = document.querySelector(".container .before_login .container .box.logIn .cont .alarm")!
    let loginButton = document.querySelector("main .container .before_login .container .box  .login_button")!

    loginButton.addEventListener("click", function() {                                                                                                                                                                                                                                                                                                                                                                                                                                    
        for (const key in all_users) {
            if(userNameInput.value == all_users[key].user_name && passwordInput.value == all_users[key].password){
                loginAlarm.classList.remove("open")
                sessionStorage.setItem("loggedIn", 'true')
                sessionStorage.setItem("sender", userNameInput.value)
                sessionStorage.setItem("sender_id", key)
                checkIfLogged('true')
                userNameInput.value = ""
                passwordInput.value = ""
                return
            } else if(userNameInput.value.length > 0 && passwordInput.value.length > 0){
                // error
                loginAlarm.classList.add("open")
            }
        }
    })
    }
    login() 

}

// register button handle
ChangeLoginPageButton.addEventListener("click", function() {
    let loginBox: HTMLElement = document.querySelector(".logIn")!;
    let registerBox: HTMLElement = document.querySelector(".register")!;
    if(loginBox.style.display == "none"){
        loginBox.style.cssText = 'display: flex'
        registerBox.style.cssText = 'display: none'
        ChangeLoginPageButton.innerHTML = 'Register'
    } else {
        loginBox.style.cssText = 'display: none'
        registerBox.style.cssText = 'display: flex'
        ChangeLoginPageButton.innerHTML = 'Login'
    }
})

// logout button handle
logoutButton.addEventListener("click", function() {
    sessionStorage.setItem("loggedIn", "false")
    sessionStorage.setItem("sender", 'null')
    sessionStorage.setItem("sender_id", 'null')
    sessionStorage.setItem("receiver", 'null')
    checkIfLogged('false')
})
/********************* login and register page handle *********************/ 


/********************* handle friends list *********************/ 
interface User {
    user_name: string;
    password?: string; // Optional properties can be marked with ?
    date?: string;
}
function handleFriendsList(users: { [key: string]: User }) {

    let addedFriends: string[] = [];
    let friendsList: HTMLElement = document.querySelector("main .container > .left .friends")!;
    sender = sessionStorage.getItem("sender")
    // console.log(sender)
    friendsList.innerHTML = ""
    for  (const key in users) {
        if(users[key].user_name != sessionStorage.getItem("sender") && sessionStorage.getItem("sender") !== (null || "null")){

            addedFriends.push(users[key].user_name)

            let friend: HTMLElement = document.createElement("div")
            friend.className = "friend"
            friend.setAttribute("id", key)
        
            let userPhoto = document.createElement("img")
            userPhoto.className = "user_photo"
            userPhoto.src = "assets/imgs/user.png"
            
            let cont = document.createElement("div")
            cont.className = "cont"
        
            let h1 = document.createElement("h1")
            h1.className = "name"
            h1.innerHTML = users[key].user_name
    
            // let h2 = document.createElement("h2")
            // h2.classList = "last-message"
        
            cont.appendChild(h1)
            friend.appendChild(userPhoto)
            friend.appendChild(cont)
            friendsList.appendChild(friend)

        }
    }

    sessionStorage.setItem("addedFriends" , JSON.stringify(addedFriends))
}
/********************* handle friends list *********************/ 


/********************* handle chat *********************/ 
// handle open chat
function handleChat() {
    let chatBox: HTMLElement = document.querySelector("main .container > .right")!;
    let friendsList = document.querySelectorAll("main .container > .left .friends .friend");
    chatBox.innerHTML = ""

    friendsList.forEach(element => {
        element.addEventListener("click", function() {

            if (windowWidth < 600) {
                chatBox.style.cssText = "display: flex;"
                element.parentElement!.parentElement!.style.cssText = "display: none;"
            } 

            let receiverName = element.querySelector(".name")!;
            const receiverId = element.getAttribute("id");
            const senderId = sessionStorage.getItem("sender_id");

            sessionStorage.setItem("receiver", receiverName.innerHTML)

            if (receiverId && senderId) {
                const receiverLastFourNums = receiverId.slice(-2);
                const senderLastFourNums = senderId.slice(-2);
                const chatId = +receiverLastFourNums + +senderLastFourNums;
                sessionStorage.setItem("opened_chat", chatId.toString());
            }
            chatBox.innerHTML = ""

            // Creating the header
            const header = document.createElement('header');

            // Left part of the header
            const leftDiv = document.createElement('div');
            leftDiv.className = 'left';
            
            const userImg = document.createElement('img');
            userImg.src = 'assets/imgs/user.png';
            userImg.alt = 'user-photo';
            
            const userCont = document.createElement('div');
            userCont.className = 'cont';

            const userName = document.createElement('h1');
            userName.className = 'name';
            userName.innerHTML = element.querySelector(".name")!.innerHTML;
            
            
            userCont.appendChild(userName);
            leftDiv.appendChild(userImg);
            leftDiv.appendChild(userCont);
            
            // Right part of the header
            const rightDiv = document.createElement('div');
            rightDiv.className = 'right';
            
            const searchImg = document.createElement('img');
            searchImg.src = 'assets/imgs/cross.png';
            searchImg.alt = 'exit-chat';
            
            rightDiv.appendChild(searchImg);
            
            // Append left and right parts to the header
            header.appendChild(leftDiv);
            header.appendChild(rightDiv);
            
            // Create the send message section
            const sendMessageDiv = document.createElement('div');
            sendMessageDiv.className = 'send_message';

            const formSendMessageDiv = document.createElement('form');
            formSendMessageDiv.onsubmit = () => false;
            
            const messageInput = document.createElement('input');
            messageInput.type = 'text';
            messageInput.placeholder = 'send message';
            messageInput.required = true
            
            // <input type="image" src="path/to/your/image.png" alt="Submit" />
            const sendImg = document.createElement('input');
            sendImg.type = 'image';
            sendImg.src = 'assets/imgs/send.png';
            sendImg.alt = 'Submit';
            
            formSendMessageDiv.appendChild(messageInput);
            formSendMessageDiv.appendChild(sendImg);
            sendMessageDiv.appendChild(formSendMessageDiv);
            
            // Append all sections to the body (or any container)
            chatBox.appendChild(header);
            chatBox.appendChild(sendMessageDiv);
            allowed = true
            sendMessage()
            viewMessages()

            // handle close chat
            let exitButton: HTMLElement = document.querySelector("main > .container > .right header .right img")!
            exitButton.addEventListener("click", function() {
                chatBox.style.cssText = "display: none;"
                element.parentElement!.parentElement!.style.cssText = "display: flex;"
            });
        })
    });
}

// handle send message
function sendMessage() {
    let input: HTMLInputElement = document.querySelector("main .container > .right .send_message input")!;
    let img = document.querySelector('main .container > .right .send_message input[type="image"]')!;
    let form = document.querySelector('main .container > .right .send_message form')!;
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting
    });

    img.addEventListener("click", function() {
        let receiver = sessionStorage.getItem("receiver")
        const openedChat = sessionStorage.getItem("opened_chat");
        const message = input.value;

        if (openedChat && message && receiver && module.sendMsg) {
            // Call the function with the correct parameters
            module.sendMsg(Number(openedChat), message, receiver);
            input.value = "";
        } else {
            // Handle cases where one of the values might be null or undefined
            console.error("Error: One or more required values are missing.");
        }
    })
}

// handle view messages
function viewMessages() {
    let sender = sessionStorage.getItem("sender")
    let receiver = sessionStorage.getItem("receiver")
    let rightDiv = document.querySelector("main .container > .right")!
    let existChatDiv = document.querySelector("main .container > .right .chat")

    if (existChatDiv !== null) {
        existChatDiv.remove()
    }

    // Create the chat section
    const chatDiv = document.createElement('div');
    chatDiv.className = 'chat';

    let chatId = JSON.parse(sessionStorage.getItem("opened_chat")  ?? "[]")

    let allChats = JSON.parse(sessionStorage.getItem("chats")  ?? "[]")
    // console.log(chatId)
    // console.log(allChats)

    if(allChats[chatId] !== undefined){
        for (const key in allChats[chatId]) {
            // console.log(allChats[chatId])
    
            if (allChats[chatId][key].receiver == sender){
                let dateObj = new Date(+key);
                // Format the date to remove the seconds
                let options: Intl.DateTimeFormatOptions = { 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                };
                let formattedDate = dateObj.toLocaleString('en-US', options);

                // Friend's message
                const friendMessageDiv = document.createElement('div');
                friendMessageDiv.className = 'friend_message';
            
                var friendCont = document.createElement('div');
                friendCont.className = 'cont';
            
                var friendContent = document.createElement('h3');
                friendContent.className = 'content';
                friendContent.textContent = allChats[chatId][key].msg;

                const friendDate = document.createElement('h4');
                friendDate.className = 'date';
                friendDate.innerText = formattedDate;

                friendCont.appendChild(friendContent);
                friendCont.appendChild(friendDate);
                friendMessageDiv.appendChild(friendCont);
                chatDiv.appendChild(friendMessageDiv);
            }
    
            if (sender == allChats[chatId][key].sender) {
                let dateObj = new Date(+key);
                // Format the date to remove the seconds
                let options: Intl.DateTimeFormatOptions = { 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric', 
                    hour12: true 
                };
                let formattedDate = dateObj.toLocaleString('en-US', options);

                // My message
                const myMessageDiv = document.createElement('div');
                myMessageDiv.className = 'my_message';
                
                const myCont = document.createElement('div');
                myCont.className = 'cont';
                
                const myContent = document.createElement('h3');
                myContent.className = 'content';
                myContent.textContent = allChats[chatId][key].msg;
                
                const myDate = document.createElement('h4');
                myDate.className = 'date';
                myDate.textContent = formattedDate;
                
                myCont.appendChild(myContent);
                myCont.appendChild(myDate);
                myMessageDiv.appendChild(myCont);
                
                // Append messages to chat
                chatDiv.appendChild(myMessageDiv);

            }
    
                rightDiv.insertBefore(chatDiv, rightDiv.querySelector(".send_message"));
    
        }
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
}


// if (!("Notification" in window)) {
//     console.log("This browser does not support desktop notifications");
//   }

// Notification.requestPermission().then(permission => {
//     if (permission === "granted") {
//     console.log("User granted permission to send notifications");
//     } else {
//     console.log("User denied permission to send notifications");
//     }
// });


// if (Notification.permission === "granted") {
//     const notification = new Notification("Hello!", {
//     // body: `new message from ${} : ${}`,
//     // icon: "https://example.com/icon.png" // Optional, to include an icon
//     });

//     // Optional: handle click event
//     notification.onclick = function() {
//     window.open("https://yourwebsite.com"); // Redirects when the user clicks the notification
//     };
// }
