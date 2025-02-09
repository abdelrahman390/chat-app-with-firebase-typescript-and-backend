"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// variables
var msgTxt = document.querySelector("main .container > .right .send_message input"),
  sendButton = document.querySelector("main .container > .right .send_message img"),
  sender = localStorage.getItem("sender"),
  ChangeLoginPageButton = document.querySelector(".container > .Register") || document.querySelector(".container > .Register"),
  registerLogin = document.querySelector(".logIn form"),
  registerForm = document.querySelector(".register form"),
  user = localStorage.getItem("sender"),
  allUsers = [],
  allMessages = [],
  allowed = false,
  loginInput = document.querySelectorAll("main .container .before_login .container .box .cont input"),
  friendsList = document.querySelector("main .container > .left .friends"),
  account = document.querySelector("header .account"),
  windowWidth = window.innerWidth,
  // ipv4: string = "192.168.1.102";
  ipv4 = "127.0.0.1";
if (localStorage.getItem("sender") !== null) {
  sender = localStorage.getItem("sender");
} else {
  localStorage.setItem("sender", "null");
}
if (localStorage.getItem("loggedIn") == null) {
  localStorage.setItem("loggedIn", String(false));
}
var _module = {}; // Declare module with

// Send message Django api
function sendMsg(_x, _x2, _x3) {
  return _sendMsg.apply(this, arguments);
} // Send message Django api
function _sendMsg() {
  _sendMsg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(chatId, message, receiver) {
    var apiUrl, sender, userId, token, BigDate, date, timestamp, response, responseData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // API URL
          apiUrl = "http://".concat(ipv4, ":8000/api/chat/save-message/");
          sender = localStorage.getItem("sender");
          userId = localStorage.getItem("sender_id");
          token = localStorage.getItem("token");
          BigDate = new Date();
          date = BigDate.toLocaleString();
          timestamp = new Date().getTime(); // console.log(chatId, message, receiver)
          _context5.prev = 7;
          _context5.next = 10;
          return fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(token)
            },
            body: JSON.stringify({
              message: {
                sender: sender,
                msg: message,
                receiver: receiver,
                date: date,
                messageId: timestamp,
                chatId: chatId
              },
              user: {
                userId: userId
              }
            })
          });
        case 10:
          response = _context5.sent;
          _context5.next = 13;
          return response.json();
        case 13:
          responseData = _context5.sent;
          if (response.ok) {
            console.log("Success: ".concat(responseData.message));
          } else {
            console.log("Error: ".concat(responseData.error || "An error occurred"));
          }
          _context5.next = 20;
          break;
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](7);
          console.log("Network Error: ".concat(_context5.t0.message));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[7, 17]]);
  }));
  return _sendMsg.apply(this, arguments);
}
function getOpenChatMessageApi(_x4) {
  return _getOpenChatMessageApi.apply(this, arguments);
} // let socket: any;
// function SocketIo() {
function _getOpenChatMessageApi() {
  _getOpenChatMessageApi = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(chatId) {
    var userId, token, apiUrl, response, responseData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = localStorage.getItem("sender_id");
          token = localStorage.getItem("token"); // API URL
          // console.log(userId);
          apiUrl = "http://".concat(ipv4, ":8000/api/chat/OpenedChatMessages/?chatId=").concat(chatId, "&userId=").concat(userId);
          _context6.prev = 3;
          _context6.next = 6;
          return fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "".concat(token)
            }
          });
        case 6:
          response = _context6.sent;
          _context6.next = 9;
          return response.json();
        case 9:
          responseData = _context6.sent;
          if (!response.ok) {
            _context6.next = 15;
            break;
          }
          // console.log("Success", responseData.chat);
          viewMessages(null, responseData.chat);
          return _context6.abrupt("return", responseData.chat);
        case 15:
          console.log("Error: ".concat(responseData.error || "An error occurred"));
        case 16:
          _context6.next = 21;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](3);
          console.log("Network Error: ".concat(_context6.t0.message));
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 18]]);
  }));
  return _getOpenChatMessageApi.apply(this, arguments);
}
var userId = localStorage.getItem("sender_id");
var token = localStorage.getItem("token");
var socket = io("http://".concat(ipv4, ":3002"), {
  reconnectionAttempts: 3,
  // Retry 10 times if the connection fails
  timeout: 30000,
  // Wait 30 seconds for a connection
  transports: ["websocket", "polling"],
  auth: {
    token: token,
    userId: userId
  }
});
console.log("Connecting to Socket.IO...");
socket.on("connect", function () {
  console.log("Connected to server with ID:", socket.id);
  socket.on("newMessage", function (data) {
    console.log("New message:", data);
  });
});
socket.on("connect_error", function (error) {
  console.log("server can`t connect", error);
});

// Handle disconnection
socket.on("disconnect", function () {
  console.log("Disconnected from server");
});
var unsubscribeFromChat = function unsubscribeFromChat(chatId) {
  console.log("Unsubscribing from chat: ".concat(chatId));
  socket.emit("unsubscribeFromChat", chatId);
};
function setupListeners(chatId) {
  // Unsubscribe from previous chat to avoid duplication
  socket.emit("unsubscribeFromChat", chatId.toString());

  // Subscribe to the new chat
  socket.emit("subscribeToChat", chatId.toString());
  console.log("Subscribed to chat: ".concat(chatId));

  // Remove previous listeners to avoid duplication
  socket.off("newMessage");
  socket.on("newMessage", function (data) {
    console.log("New message received:", data, data.message);
    viewMessages(data.message, null); // Call your message handling function
  });
}
function stopListeningToChat(chatId) {
  console.log("Unsubscribing from chat: ".concat(chatId));
  socket.emit("unsubscribeFromChat", chatId.toString());
}

/********************* login and register page and logout handle *********************/
//  check if loggedIn
function checkIfLogged(_x5) {
  return _checkIfLogged.apply(this, arguments);
}
function _checkIfLogged() {
  _checkIfLogged = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(check) {
    var before_login;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          before_login = document.querySelector(".before_login"); // if not logged in
          if (!(String(check) == "null" || String(check) == "false")) {
            _context7.next = 10;
            break;
          }
          console.log("not login");
          localStorage.setItem("loggedIn", String(false));
          before_login.style.cssText = "display: flex";
          account.querySelector(".main_header .account .userName").innerHTML = "";
          account.style.display = "none";
          loginAndRegister();
          // if logged in
          _context7.next = 19;
          break;
        case 10:
          if (!(String(check) == "true" || String(check) != "null")) {
            _context7.next = 19;
            break;
          }
          console.log("login");
          localStorage.setItem("loggedIn", String(true));
          sender = localStorage.getItem("sender");
          before_login.style.cssText = "display: none";
          account.querySelector(".main_header .account .userName").innerHTML = sender;
          account.style.display = "flex";
          _context7.next = 19;
          return handleFriendsList();
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _checkIfLogged.apply(this, arguments);
}
checkIfLogged(sender);

// Login handle
function loginHandle(_x6, _x7) {
  return _loginHandle.apply(this, arguments);
} // Login handle
function _loginHandle() {
  _loginHandle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user_name, password) {
    var apiUrl, response, responseData;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          // API URL
          apiUrl = "http://".concat(ipv4, ":8000/api/chat/login/");
          _context8.prev = 1;
          _context8.next = 4;
          return fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_name: user_name,
              password: password,
              platform: "web"
            })
            // credentials: "include",
          });
        case 4:
          response = _context8.sent;
          _context8.next = 7;
          return response.json();
        case 7:
          responseData = _context8.sent;
          // console.log(responseData);
          console.log("Cookies sent:", document.cookie);
          if (!response.ok) {
            _context8.next = 14;
            break;
          }
          console.log("Success: ".concat(JSON.stringify(responseData)));
          return _context8.abrupt("return", responseData);
        case 14:
          console.log("Error: ".concat(responseData.error || "An error occurred"));
        case 15:
          _context8.next = 20;
          break;
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](1);
          console.log("Network Error: ".concat(_context8.t0.message));
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 17]]);
  }));
  return _loginHandle.apply(this, arguments);
}
function registerHandle(_x8, _x9, _x10) {
  return _registerHandle.apply(this, arguments);
} // login and register handle
// Define types for the input elements and other elements you are interacting with
function _registerHandle() {
  _registerHandle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(user_name, password, gender) {
    var apiUrl, response, responseData;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          // API URL
          apiUrl = "http://".concat(ipv4, ":8000/api/chat/Signup/");
          _context9.prev = 1;
          _context9.next = 4;
          return fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_name: user_name,
              password: password,
              gender: gender,
              Platform: "web"
            })
          });
        case 4:
          response = _context9.sent;
          _context9.next = 7;
          return response.json();
        case 7:
          responseData = _context9.sent;
          if (!response.ok) {
            _context9.next = 13;
            break;
          }
          console.log("Success: ".concat(JSON.stringify(responseData)));
          return _context9.abrupt("return", responseData);
        case 13:
          console.log("Error: ".concat(responseData.error || "An error occurred"));
        case 14:
          _context9.next = 19;
          break;
        case 16:
          _context9.prev = 16;
          _context9.t0 = _context9["catch"](1);
          console.log("Network Error: ".concat(_context9.t0.message));
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 16]]);
  }));
  return _registerHandle.apply(this, arguments);
}
function loginAndRegister() {
  // Handle hide and show password
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
    return _register.apply(this, arguments);
  }
  function _register() {
    _register = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var registerCard, registerForm, userName, password, registerButton, gender, confirmPassword, registrationPasswordAlarm, registrationUserNameAlarm, passwordCheck;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            registerCard = document.querySelector("main .container .before_login .container .register");
            registerForm = document.querySelector(".register form");
            userName = registerCard.querySelector(".container .before_login .container .box .cont  .name");
            password = registerCard.querySelector(".container .before_login .container .box .cont  .password");
            registerButton = document.querySelector("main .container .before_login .container .box  .register_button");
            gender = document.querySelector("main .container .before_login .container .box  .gender");
            confirmPassword = document.querySelector(".container .before_login .container .box .cont  .confirm_password");
            registrationPasswordAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.password");
            registrationUserNameAlarm = document.querySelector(".container .before_login .container .box.register .cont .alarm.userName");
            passwordCheck = false; // check password
            confirmPassword.addEventListener("input", function () {
              if (password.value.length <= confirmPassword.value.length && confirmPassword.value !== password.value) {
                registrationPasswordAlarm.style.cssText = "display: block; background: #f29999;";
                confirmPassword.style.cssText = "background-color: #f29999;";
                passwordCheck = false;
              } else if (confirmPassword.value == password.value) {
                registrationPasswordAlarm.style.display = "none";
                confirmPassword.style.cssText = "background-color: #1296d1;";
                passwordCheck = true;
              }
            });

            // send new user
            registerButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var allCheck, result;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    allCheck =
                    // userName.value.length >= 2 &&
                    passwordCheck && gender.value && registerForm.checkValidity(); // return boolean
                    // let key: number | string;
                    _context.prev = 1;
                    if (!allCheck) {
                      _context.next = 8;
                      break;
                    }
                    _context.next = 5;
                    return registerHandle(userName.value, password.value, gender.value);
                  case 5:
                    result = _context.sent;
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
                  case 8:
                    _context.next = 13;
                    break;
                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](1);
                    console.error("Login error: ", _context.t0);
                  case 13:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 10]]);
            })));
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _register.apply(this, arguments);
  }
  register();

  /************** login **************/
  function login() {
    return _login.apply(this, arguments);
  }
  function _login() {
    _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var userNameInput, passwordInput, loginAlarm, loginButton;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            userNameInput = document.querySelector(".before_login .container .box form .cont .name"); // Type assertion
            passwordInput = document.querySelector(".before_login .container .box form .cont .password"); // Type assertion
            loginAlarm = document.querySelector(".container .before_login .container .box.logIn .cont .alarm"); // Type assertion
            loginButton = document.querySelector("main .container .before_login .container .box  .login_button"); // Type assertion
            loginButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var result;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(userNameInput.value.length > 0 && passwordInput.value.length > 0)) {
                      _context3.next = 13;
                      break;
                    }
                    _context3.prev = 1;
                    _context3.next = 4;
                    return loginHandle(userNameInput.value, passwordInput.value);
                  case 4:
                    result = _context3.sent;
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
                    _context3.next = 11;
                    break;
                  case 8:
                    _context3.prev = 8;
                    _context3.t0 = _context3["catch"](1);
                    console.error("Login error: ", _context3.t0);
                  case 11:
                    _context3.next = 14;
                    break;
                  case 13:
                    loginAlarm.classList.add("open");
                  case 14:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[1, 8]]);
            })));
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return _login.apply(this, arguments);
  }
  login();
}

// change between register and login button
ChangeLoginPageButton.addEventListener("click", function () {
  var loginBox = document.querySelector(".logIn");
  var registerBox = document.querySelector(".register");
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
account.querySelector(".main_header .account .logout").addEventListener("click", function () {
  localStorage.setItem("loggedIn", "false");
  localStorage.setItem("sender", "null");
  localStorage.setItem("sender_id", "null");
  localStorage.setItem("receiver", "null");
  localStorage.setItem("opened_chat", "null");
  localStorage.setItem("addedFriends", "null");
  localStorage.removeItem("token");
  checkIfLogged("false");
  account.querySelector(".main_header .account .userName").innerHTML = "";
});
/********************* login and register page and logout handle *********************/

/********************* handle friends list *********************/
function handleFriendsList() {
  return _handleFriendsList.apply(this, arguments);
}
/********************* handle friends list *********************/
/********************* handle chat *********************/
// handle open chat
function _handleFriendsList() {
  _handleFriendsList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var userId, token, GetAllUsers, _GetAllUsers, putFriendsToPage;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          putFriendsToPage = function _putFriendsToPage(users) {
            var friendsList = document.querySelector("main .container > .left .friends");
            if (users) {
              friendsList.innerHTML = "";
              var _iterator = _createForOfIteratorHelper(users),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var chat = _step.value;
                  var friend = document.createElement("div");
                  friend.className = "friend";
                  friend.setAttribute("id", chat.id);
                  var userPhoto = document.createElement("img");
                  userPhoto.className = "user_photo";
                  userPhoto.src = "assets/imgs/user.png";
                  var cont = document.createElement("div");
                  cont.className = "cont";
                  var h1 = document.createElement("h1");
                  h1.className = "name";
                  h1.innerHTML = chat.user_name;

                  // let h2 = document.createElement("h2")
                  // h2.classList = "last-message"

                  cont.appendChild(h1);
                  friend.appendChild(userPhoto);
                  friend.appendChild(cont);
                  friendsList.appendChild(friend);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } else {
              var errorH1 = document.createElement("h1");
              errorH1.classList.add("friends_list_error");
              errorH1.innerText = "Server Error";
              friendsList.appendChild(errorH1);
            }
          };
          _GetAllUsers = function _GetAllUsers3() {
            _GetAllUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
              var apiUrl, response, responseData;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    // console.log(userId, token);
                    apiUrl = "http://".concat(ipv4, ":8000/api/chat/getFriendsList/?userId=").concat(userId);
                    _context10.prev = 1;
                    _context10.next = 4;
                    return fetch(apiUrl, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "".concat(token)
                      }
                      // credentials: "include",
                    });
                  case 4:
                    response = _context10.sent;
                    _context10.next = 7;
                    return response.json();
                  case 7:
                    responseData = _context10.sent;
                    console.log("users: ".concat(JSON.stringify(responseData)));
                    if (!response.ok) {
                      _context10.next = 15;
                      break;
                    }
                    putFriendsToPage(responseData.users);
                    localStorage.setItem("addedFriends", JSON.stringify(responseData.users));
                    return _context10.abrupt("return", responseData);
                  case 15:
                    console.log("Error: ".concat(responseData.error || "An error occurred"));
                    putFriendsToPage(false);
                  case 17:
                    _context10.next = 23;
                    break;
                  case 19:
                    _context10.prev = 19;
                    _context10.t0 = _context10["catch"](1);
                    console.log("Network Error: ".concat(_context10.t0.message));
                    putFriendsToPage(false);
                  case 23:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, null, [[1, 19]]);
            }));
            return _GetAllUsers.apply(this, arguments);
          };
          GetAllUsers = function _GetAllUsers2() {
            return _GetAllUsers.apply(this, arguments);
          };
          userId = localStorage.getItem("sender_id");
          token = localStorage.getItem("token");
          _context11.next = 7;
          return GetAllUsers();
        case 7:
          handleChat();
        case 8:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _handleFriendsList.apply(this, arguments);
}
function handleChat() {
  var chatBox = document.querySelector("main .container > .right");
  var friendsList = document.querySelectorAll("main .container > .left .friends .friend");
  chatBox.innerHTML = "";
  friendsList.forEach(function (element) {
    element.addEventListener("click", function () {
      var chat_id = Number(localStorage.getItem("opened_chat"));
      // stopListeningToChat(chat_id);
      if (windowWidth < 600) {
        chatBox.style.cssText = "display: flex;";
        element.parentElement.parentElement.style.cssText = "display: none;";
      }
      var receiverName = element.querySelector(".name");
      var receiverId = element.getAttribute("id");
      var senderId = localStorage.getItem("sender_id");
      var receiverLastFourNums = receiverId.slice(-2);
      var senderLastFourNums = senderId.slice(-2);
      console.log(receiverId, senderId);
      var chatId = +receiverLastFourNums + +senderLastFourNums;
      localStorage.setItem("opened_chat", chatId.toString());
      localStorage.setItem("receiver", receiverName.innerHTML);
      chatBox.innerHTML = "";

      // Creating the header
      var header = document.createElement("header");

      // Left part of the header
      var leftDiv = document.createElement("div");
      leftDiv.className = "left";
      var userImg = document.createElement("img");
      userImg.src = "assets/imgs/user.png";
      userImg.alt = "user-photo";
      var userCont = document.createElement("div");
      userCont.className = "cont";
      var userName = document.createElement("h2");
      userName.className = "name";
      userName.innerHTML = element.querySelector(".name").innerHTML;
      userCont.appendChild(userName);
      leftDiv.appendChild(userImg);
      leftDiv.appendChild(userCont);

      // Right part of the header
      var rightDiv = document.createElement("div");
      rightDiv.className = "right";
      var width = screen.width;
      if (width <= 600) {
        var searchImg = document.createElement("img");
        searchImg.src = "assets/imgs/cross.png";
        searchImg.alt = "exit-chat";
        rightDiv.appendChild(searchImg);
      }

      // Append left and right parts to the header
      header.appendChild(leftDiv);
      header.appendChild(rightDiv);

      // Create the send message section
      var sendMessageDiv = document.createElement("div");
      sendMessageDiv.className = "send_message";
      var formSendMessageDiv = document.createElement("form");
      formSendMessageDiv.onsubmit = function () {
        return false;
      };
      var messageInput = document.createElement("input");
      messageInput.type = "text";
      messageInput.placeholder = "send message";
      messageInput.required = true;

      // <input type="image" src="path/to/your/image.png" alt="Submit" />
      var sendImg = document.createElement("input");
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
        var exitButton = document.querySelector("main > .container > .right header .right img");
        exitButton.addEventListener("click", function () {
          chatBox.style.cssText = "display: none;";
          element.parentElement.parentElement.style.cssText = "display: flex;";
        });
      }

      // CHeckIfAnyChangesInChatsListener();
    });
  });

  // handle send message
  function sendMessage() {
    var input = document.querySelector("main .container > .right .send_message input");
    var img = document.querySelector('main .container > .right .send_message input[type="image"]');
    var form = document.querySelector("main .container > .right .send_message form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents the form from submitting
    });
    img.addEventListener("click", function () {
      var receiver = localStorage.getItem("receiver");
      var openedChat = localStorage.getItem("opened_chat");
      var message = input.value;
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
function viewMessages(_x11, _x12) {
  return _viewMessages.apply(this, arguments);
}
function _viewMessages() {
  _viewMessages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(newMessageData, messagesData) {
    var sender, receiver, rightDiv, chatDiv, _i, _Object$entries, _Object$entries$_i, key, data, putMessagesInThePage;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          putMessagesInThePage = function _putMessagesInThePage(
          // messageKey: number,
          messageData) {
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
              var friendMessageDiv = document.createElement("div");
              friendMessageDiv.className = "friend_message";
              var friendCont = document.createElement("div");
              friendCont.className = "cont";
              var friendContent = document.createElement("h3");
              friendContent.className = "content";
              friendContent.textContent = messageData.msg;
              var friendDate = document.createElement("h4");
              friendDate.className = "date";
              friendDate.innerText = messageData.date;
              friendCont.appendChild(friendContent);
              friendCont.appendChild(friendDate);
              friendMessageDiv.appendChild(friendCont);
              chatDiv.appendChild(friendMessageDiv);
            }
            if (sender === messageData.sender) {
              var myMessageDiv = document.createElement("div");
              myMessageDiv.className = "my_message";
              var myCont = document.createElement("div");
              myCont.className = "cont";
              var myContent = document.createElement("h3");
              myContent.className = "content";
              myContent.textContent = messageData.msg;
              var myDate = document.createElement("h4");
              myDate.className = "date";
              myDate.textContent = messageData.date;
              myCont.appendChild(myContent);
              myCont.appendChild(myDate);
              myMessageDiv.appendChild(myCont);
              chatDiv.appendChild(myMessageDiv);
            }
          };
          // console.log("up #####", newMessageData, messagesData);
          sender = localStorage.getItem("sender");
          receiver = localStorage.getItem("receiver");
          rightDiv = document.querySelector("main .container > .right");
          chatDiv = document.querySelector("main .container > .right .chat");
          if (chatDiv == null) {
            chatDiv = document.createElement("div");
            chatDiv.className = "chat";
          }
          if (messagesData != null) {
            for (_i = 0, _Object$entries = Object.entries(messagesData); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], data = _Object$entries$_i[1];
              putMessagesInThePage(data);
            }
          } else {
            // console.log("new-message", newMessageData);
            putMessagesInThePage(newMessageData);
          }
          if (rightDiv.children.length == 2) {
            rightDiv.insertBefore(chatDiv, rightDiv.querySelector(".send_message"));
          }
          chatDiv.scrollTop = chatDiv.scrollHeight;
        case 9:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _viewMessages.apply(this, arguments);
}