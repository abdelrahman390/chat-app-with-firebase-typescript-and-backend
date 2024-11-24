"use strict";

var _firebaseApp = require("https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js");
var _firebaseDatabase = require("https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { query, equalTo, get, child , getDatabase, ref, set, remove, onChildAdded, onChildRemoved , onChildChanged, onValue } from "firebase/database";

// // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCZTDHJyKOpPtc6QV4mISVS8JDzYg7W5nA",
  authDomain: "chat-app-7742a.firebaseapp.com",
  projectId: "chat-app-7742a",
  storageBucket: "chat-app-7742a.appspot.com",
  messagingSenderId: "812879044915",
  appId: "1:812879044915:web:e61340195cb8523ec65e46"
};

// Initialize Firebase
var app = (0, _firebaseApp.initializeApp)(firebaseConfig);
var db = (0, _firebaseDatabase.getDatabase)(app);

// variables
var msgTxt = document.querySelector('main .container > .right .send_message input'),
  sendButton = document.querySelector('main .container > .right .send_message img'),
  sender = localStorage.getItem("sender"),
  ChangeLoginPageButton = document.querySelector(".container > .Register") || document.querySelector(".container > .Register"),
  registerLogin = document.querySelector(".logIn form"),
  registerForm = document.querySelector(".register form"),
  user = sessionStorage.getItem("sender"),
  allUsers = [],
  allMessages = [],
  allowed = false,
  loginInput = document.querySelectorAll("main .container .before_login .container .box .cont input"),
  friendsList = document.querySelector("main .container > .left .friends"),
  logoutButton = document.querySelector("main .container .logout") || document.querySelector("main .container .logout"),
  windowWidth = window.innerWidth;
if (sessionStorage.getItem('sender') !== null) {
  sender = sessionStorage.getItem('sender');
} else {
  sessionStorage.setItem('sender', "null");
}
if (sessionStorage.getItem('loggedIn') == null) {
  sessionStorage.setItem("loggedIn", String(false));
}

// if(sendButton != null){
//     sendButton.addEventListener("click", function() {
//         // TO SEND MESSAGES
//         module.sendUsers()
//     })
// }

var _module = {}; // Declare module with 

// send users to database
_module.sendUsers = function sendUsers(userName, password) {
  // console.log(password)
  var timestamp = new Date().getTime();
  var BigDate = new Date();
  var date = BigDate.toLocaleString();
  (0, _firebaseDatabase.set)((0, _firebaseDatabase.ref)(db, "users/" + timestamp), {
    user_name: userName,
    password: password,
    date: date
  });
};

// send message to database
_module.sendMsg = function chatsContainer(chatId, message, receiver) {
  var msg = message;
  sender = sessionStorage.getItem('sender');
  var BigDate = new Date();
  var date = BigDate.toLocaleString();
  var timestamp = new Date().getTime();
  (0, _firebaseDatabase.set)((0, _firebaseDatabase.ref)(db, "chats/".concat(+chatId, "/") + timestamp), {
    msg: msg,
    sender: sender,
    receiver: receiver,
    date: date
  });
};

// get users
(0, _firebaseDatabase.onValue)((0, _firebaseDatabase.ref)(db, 'users'), function (snapshot) {
  // console.log(snapshot.val())
  sessionStorage.setItem("all_users", JSON.stringify(snapshot.val()));
  loginAndRegister();
}, {
  onlyOnce: true
});

// get every chat messages
function getChatsMessages() {
  (0, _firebaseDatabase.onValue)((0, _firebaseDatabase.ref)(db, 'chats'), function (snapshot) {
    var sender = sessionStorage.getItem('sender');
    var allChats = {};
    for (var key in snapshot.val()) {
      var messageData = Object.values(snapshot.val()[key])[0];
      if (sender === String(messageData.sender) || sender === String(messageData.receiver)) {
        allChats[key] = snapshot.val()[key];
      }
    }
    console.log("allChats", allChats);
    sessionStorage.setItem("chats", JSON.stringify(allChats));
    if (allowed) {
      viewMessages();
    }
  }, {
    onlyOnce: true
  });
}
function CHeckIfAnyChangesInChatsListener(_x) {
  return _CHeckIfAnyChangesInChatsListener.apply(this, arguments);
}
function _CHeckIfAnyChangesInChatsListener() {
  _CHeckIfAnyChangesInChatsListener = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(messageDate) {
    var openedChat;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          openedChat = sessionStorage.getItem("opened_chat");
          _context.next = 3;
          return (0, _firebaseDatabase.onChildAdded)((0, _firebaseDatabase.ref)(db, "chats/".concat(openedChat)), function (snapshot) {
            var newMessage = snapshot.val();
            console.log('New message:', newMessage);
            // console.log(`${newMessage.sender} >>>>>> ${newMessage.msg}`);
            // alert(`${newMessage.sender} >>>>>> ${newMessage.msg}`);
            getChatsMessages();
          });
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _CHeckIfAnyChangesInChatsListener.apply(this, arguments);
}
var newUserAddedTime;
function CHeckIfAnyUserRegistered() {
  (0, _firebaseDatabase.onChildAdded)((0, _firebaseDatabase.ref)(db, 'users/'), function (snapshot) {
    // const newUser = snapshot.val();
    if (newUserAddedTime <= snapshot.key) {
      sessionStorage.setItem("sender_id", snapshot.key);
    }
  });
}

/************** GET NEW USERS WHEN SIGH UP *************/
function waitForNewUser() {
  return new Promise(function (resolve, reject) {
    (0, _firebaseDatabase.onChildAdded)((0, _firebaseDatabase.ref)(db, "users"), function (snapshot) {
      var newUserKey = snapshot.key; // Get the key of the new user
      var newUserData = snapshot.val(); // Get the data of the new user
      // console.log(newUserKey)
      // console.log(newUserData)

      // Resolve the Promise with an object containing both the key and the data
      resolve({
        key: newUserKey,
        data: newUserData
      });
    }, function (error) {
      reject(error); // Handle any errors that occur
    });
  });
}
function handleNewUser() {
  return _handleNewUser.apply(this, arguments);
}
/************** GET NEW USERS WHEN SIGH UP *************/
/********************* login and register page and logout handle *********************/
//  check if loggedIn
function _handleNewUser() {
  _handleNewUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _sessionStorage$getIt5, newUser, newUserKey, newUserData, newUserUserName, ullUsersAfterUpdate;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return waitForNewUser();
        case 3:
          newUser = _context2.sent;
          // Wait for the Promise to resolve
          // console.log('New user key:', newUser.key); // 1725300481565
          // console.log('New user data:', newUser.data); //{"date": "9/2/2024, 9:08:01 PM","password": "","user_name": "ttrttevfggf" }
          newUserKey = newUser.key;
          newUserData = newUser.data;
          newUserUserName = newUser.data.user_name;
          ullUsersAfterUpdate = JSON.parse((_sessionStorage$getIt5 = sessionStorage.getItem("all_users")) !== null && _sessionStorage$getIt5 !== void 0 ? _sessionStorage$getIt5 : "[]");
          ullUsersAfterUpdate[newUserKey] = newUserData;
          sessionStorage.setItem("sender_id", String(newUserKey));
          sessionStorage.setItem("sender", newUserUserName);
          sessionStorage.setItem("all_users", JSON.stringify(ullUsersAfterUpdate));
          handleFriendsList(ullUsersAfterUpdate);
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error('Error waiting for new user:', _context2.t0);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _handleNewUser.apply(this, arguments);
}
function checkIfLogged(check) {
  var before_login = document.querySelector('.before_login') || document.querySelector('.before_login');
  // if not logged in
  if (String(check) == "null" || String(check) == "false") {
    sessionStorage.setItem("loggedIn", String(false));
    before_login.style.cssText = "display: flex";
    logoutButton.style.display = "none";
    // if logged in
  } else if (String(check) == "true" || String(check) != "null") {
    var _sessionStorage$getIt;
    // console.log("login")
    sender = sessionStorage.getItem('sender');
    sessionStorage.setItem("loggedIn", String(true));
    before_login.style.cssText = "display: none";
    logoutButton.style.display = "unset";
    handleFriendsList(JSON.parse((_sessionStorage$getIt = sessionStorage.getItem("all_users")) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : "[]"));
    handleChat();
    getChatsMessages();
    CHeckIfAnyChangesInChatsListener();
  }
}
checkIfLogged(sender);

// login and register handle
function loginAndRegister() {
  var _sessionStorage$getIt2;
  var all_users = JSON.parse((_sessionStorage$getIt2 = sessionStorage.getItem('all_users')) !== null && _sessionStorage$getIt2 !== void 0 ? _sessionStorage$getIt2 : "[]");
  // console.log(all_users)

  // handle hide and show password
  var hidePassword = document.querySelectorAll("main > .container .before_login > .container .box form .cont .container img");
  hidePassword.forEach(function (element) {
    element.addEventListener("click", function () {
      var parent = element.parentElement;
      if (parent) {
        // Check if parentElement is not null
        var input = parent.querySelector("input");
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
  function register() {
    var registerCard = document.querySelector("main .container .before_login .container .register");
    var registerForm = document.querySelector(".register form");
    var userName = registerCard.querySelector(".container .before_login .container .box .cont  .name");
    var password = registerCard.querySelector(".container .before_login .container .box .cont  .password");
    var registerButton = document.querySelector("main .container .before_login .container .box  .register_button");
    var confirmPassword = document.querySelector(".container .before_login .container .box .cont  .confirm_password");
    var registrationPasswordAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.password");
    var registrationUserNameAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.userName");
    var passwordCheck = false;

    // check password
    confirmPassword.addEventListener("input", function () {
      if (password.value.length <= confirmPassword.value.length && confirmPassword.value !== password.value) {
        registrationPasswordAlarm.style.cssText = 'display: block; background: #f29999;';
        confirmPassword.style.cssText = "background-color: #f29999;";
        passwordCheck = false;
      } else if (confirmPassword.value == password.value) {
        registrationPasswordAlarm.style.display = 'none';
        confirmPassword.style.cssText = "background-color: #1296d1;";
        passwordCheck = true;
      }
    });
    // send new user
    registerButton.addEventListener("click", function () {
      var allCheck = userName.value.length > 2 && passwordCheck && registerForm.checkValidity(); // return boolean 
      var userExists = false;
      var key;
      for (var _key in all_users) {
        // Check if the username matches
        if (userName.value === all_users[_key].user_name) {
          userExists = true; // Set flag if the user exists
          registrationUserNameAlarm.classList.add("open");
          break; // Stop the loop if a match is found
        } else {
          registrationUserNameAlarm.classList.remove("open");
        }
      }
      if (!userExists && allCheck) {
        if (_module.sendUsers) {
          var date = new Date().getTime();
          newUserAddedTime = date;
          _module.sendUsers(userName.value, password.value);
        }
        handleNewUser();
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("sender", userName.value);
        CHeckIfAnyUserRegistered();
        checkIfLogged('true');
        userName.value = "";
        password.value = "";
        confirmPassword.value = "";
        ChangeLoginPageButton.click();
      }
    });
  }
  register();
  function login() {
    /************** login **************/
    var userNameInput = document.querySelector(".before_login .container .box form .cont .name");
    var passwordInput = document.querySelector(".before_login .container .box form .cont .password");
    var loginAlarm = document.querySelector(".container .before_login .container .box.logIn .cont .alarm");
    var loginButton = document.querySelector("main .container .before_login .container .box  .login_button");
    loginButton.addEventListener("click", function () {
      for (var key in all_users) {
        if (userNameInput.value == all_users[key].user_name && passwordInput.value == all_users[key].password) {
          loginAlarm.classList.remove("open");
          sessionStorage.setItem("loggedIn", 'true');
          sessionStorage.setItem("sender", userNameInput.value);
          sessionStorage.setItem("sender_id", key);
          checkIfLogged('true');
          userNameInput.value = "";
          passwordInput.value = "";
          return;
        } else if (userNameInput.value.length > 0 && passwordInput.value.length > 0) {
          // error
          loginAlarm.classList.add("open");
        }
      }
    });
  }
  login();
}

// register button handle
ChangeLoginPageButton.addEventListener("click", function () {
  var loginBox = document.querySelector(".logIn");
  var registerBox = document.querySelector(".register");
  if (loginBox.style.display == "none") {
    loginBox.style.cssText = 'display: flex';
    registerBox.style.cssText = 'display: none';
    ChangeLoginPageButton.innerHTML = 'Register';
  } else {
    loginBox.style.cssText = 'display: none';
    registerBox.style.cssText = 'display: flex';
    ChangeLoginPageButton.innerHTML = 'Login';
  }
});

// logout button handle
logoutButton.addEventListener("click", function () {
  sessionStorage.setItem("loggedIn", "false");
  sessionStorage.setItem("sender", 'null');
  sessionStorage.setItem("sender_id", 'null');
  sessionStorage.setItem("receiver", 'null');
  checkIfLogged('false');
});
/********************* login and register page handle *********************/

/********************* handle friends list *********************/

function handleFriendsList(users) {
  var addedFriends = [];
  var friendsList = document.querySelector("main .container > .left .friends");
  sender = sessionStorage.getItem("sender");
  // console.log(sender)
  friendsList.innerHTML = "";
  for (var key in users) {
    if (users[key].user_name != sessionStorage.getItem("sender") && sessionStorage.getItem("sender") !== (null || "null")) {
      addedFriends.push(users[key].user_name);
      var friend = document.createElement("div");
      friend.className = "friend";
      friend.setAttribute("id", key);
      var userPhoto = document.createElement("img");
      userPhoto.className = "user_photo";
      userPhoto.src = "assets/imgs/user.png";
      var cont = document.createElement("div");
      cont.className = "cont";
      var h1 = document.createElement("h1");
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
  sessionStorage.setItem("addedFriends", JSON.stringify(addedFriends));
}
/********************* handle friends list *********************/

/********************* handle chat *********************/
// handle open chat
function handleChat() {
  var chatBox = document.querySelector("main .container > .right");
  var friendsList = document.querySelectorAll("main .container > .left .friends .friend");
  chatBox.innerHTML = "";
  friendsList.forEach(function (element) {
    element.addEventListener("click", function () {
      if (windowWidth < 600) {
        chatBox.style.cssText = "display: flex;";
        element.parentElement.parentElement.style.cssText = "display: none;";
      }
      var receiverName = element.querySelector(".name");
      var receiverId = element.getAttribute("id");
      var senderId = sessionStorage.getItem("sender_id");
      sessionStorage.setItem("receiver", receiverName.innerHTML);
      if (receiverId && senderId) {
        var receiverLastFourNums = receiverId.slice(-2);
        var senderLastFourNums = senderId.slice(-2);
        var chatId = +receiverLastFourNums + +senderLastFourNums;
        sessionStorage.setItem("opened_chat", chatId.toString());
      }
      chatBox.innerHTML = "";

      // Creating the header
      var header = document.createElement('header');

      // Left part of the header
      var leftDiv = document.createElement('div');
      leftDiv.className = 'left';
      var userImg = document.createElement('img');
      userImg.src = 'assets/imgs/user.png';
      userImg.alt = 'user-photo';
      var userCont = document.createElement('div');
      userCont.className = 'cont';
      var userName = document.createElement('h2');
      userName.className = 'name';
      userName.innerHTML = element.querySelector(".name").innerHTML;
      userCont.appendChild(userName);
      leftDiv.appendChild(userImg);
      leftDiv.appendChild(userCont);

      // Right part of the header
      var rightDiv = document.createElement('div');
      rightDiv.className = 'right';
      var searchImg = document.createElement('img');
      searchImg.src = 'assets/imgs/cross.png';
      searchImg.alt = 'exit-chat';
      rightDiv.appendChild(searchImg);

      // Append left and right parts to the header
      header.appendChild(leftDiv);
      header.appendChild(rightDiv);

      // Create the send message section
      var sendMessageDiv = document.createElement('div');
      sendMessageDiv.className = 'send_message';
      var formSendMessageDiv = document.createElement('form');
      formSendMessageDiv.onsubmit = function () {
        return false;
      };
      var messageInput = document.createElement('input');
      messageInput.type = 'text';
      messageInput.placeholder = 'send message';
      messageInput.required = true;

      // <input type="image" src="path/to/your/image.png" alt="Submit" />
      var sendImg = document.createElement('input');
      sendImg.type = 'image';
      sendImg.src = 'assets/imgs/send.png';
      sendImg.alt = 'Submit';
      formSendMessageDiv.appendChild(messageInput);
      formSendMessageDiv.appendChild(sendImg);
      sendMessageDiv.appendChild(formSendMessageDiv);

      // Append all sections to the body (or any container)
      chatBox.appendChild(header);
      chatBox.appendChild(sendMessageDiv);
      allowed = true;
      sendMessage();
      viewMessages();

      // handle close chat
      var exitButton = document.querySelector("main > .container > .right header .right img");
      exitButton.addEventListener("click", function () {
        chatBox.style.cssText = "display: none;";
        element.parentElement.parentElement.style.cssText = "display: flex;";
      });
    });
  });
}

// handle send message
function sendMessage() {
  var input = document.querySelector("main .container > .right .send_message input");
  var img = document.querySelector('main .container > .right .send_message input[type="image"]');
  var form = document.querySelector('main .container > .right .send_message form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the form from submitting
  });
  img.addEventListener("click", function () {
    var receiver = sessionStorage.getItem("receiver");
    var openedChat = sessionStorage.getItem("opened_chat");
    var message = input.value;
    if (openedChat && message && receiver && _module.sendMsg) {
      // Call the function with the correct parameters
      _module.sendMsg(Number(openedChat), message, receiver);
      input.value = "";
    } else {
      // Handle cases where one of the values might be null or undefined
      console.error("Error: One or more required values are missing.");
    }
  });
}

// handle view messages
function viewMessages() {
  var _sessionStorage$getIt3, _sessionStorage$getIt4;
  var sender = sessionStorage.getItem("sender");
  var receiver = sessionStorage.getItem("receiver");
  var rightDiv = document.querySelector("main .container > .right");
  var existChatDiv = document.querySelector("main .container > .right .chat");
  if (existChatDiv !== null) {
    existChatDiv.remove();
  }

  // Create the chat section
  var chatDiv = document.createElement('div');
  chatDiv.className = 'chat';
  var chatId = JSON.parse((_sessionStorage$getIt3 = sessionStorage.getItem("opened_chat")) !== null && _sessionStorage$getIt3 !== void 0 ? _sessionStorage$getIt3 : "[]");
  var allChats = JSON.parse((_sessionStorage$getIt4 = sessionStorage.getItem("chats")) !== null && _sessionStorage$getIt4 !== void 0 ? _sessionStorage$getIt4 : "[]");
  if (allChats[chatId] !== undefined) {
    for (var key in allChats[chatId]) {
      // console.log(allChats[chatId])

      var dateObj = new Date(+key);
      var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      var formattedDate = dateObj.toLocaleString('en-US', options);

      // Friend's message
      if (allChats[chatId][key].receiver == sender) {
        var friendMessageDiv = document.createElement('div');
        friendMessageDiv.className = 'friend_message';
        var friendCont = document.createElement('div');
        friendCont.className = 'cont';
        var friendContent = document.createElement('h3');
        friendContent.className = 'content';
        friendContent.textContent = allChats[chatId][key].msg;
        var friendDate = document.createElement('h4');
        friendDate.className = 'date';
        friendDate.innerText = formattedDate;
        friendCont.appendChild(friendContent);
        friendCont.appendChild(friendDate);
        friendMessageDiv.appendChild(friendCont);
        chatDiv.appendChild(friendMessageDiv);
      }

      // My message
      if (sender == allChats[chatId][key].sender) {
        var myMessageDiv = document.createElement('div');
        myMessageDiv.className = 'my_message';
        var myCont = document.createElement('div');
        myCont.className = 'cont';
        var myContent = document.createElement('h3');
        myContent.className = 'content';
        myContent.textContent = allChats[chatId][key].msg;
        var myDate = document.createElement('h4');
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