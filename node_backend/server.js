import express from "express";
import http from "http";
import { Server } from "socket.io";
import { firebaseAdmin, db } from "./firebase.js";
// import firebase_admin from firebase_admin import credentials

const app = express();
const port = process.env.PORT || 3002;

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://127.0.0.1:5500", // Allow your HTML client's origin
    origin: '*',
    methods: ["GET", "POST"],
  },
});

// Middleware to parse JSON
app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Firebase Chat API with Socket.IO!");
});

// Store active listeners for each chat
const activeListeners = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for subscription
  socket.on("subscribeToChat", (chatId) => {
    console.log(`User ${socket.id} subscribed to chat: ${chatId}`);

    if (!activeListeners[chatId]) {
      activeListeners[chatId] = {};
    }

    // If this socket already has a listener, do nothing
    if (activeListeners[chatId][socket.id]) return;

    // Firebase listener for real-time updates
    const chatRef = db.ref(`chats/${chatId}`);
    const listener = (snapshot) => {
      const newMessage = snapshot.val();
      const messageKey = snapshot.key;
      console.log("New message added:", newMessage);

      // Emit the new message to the specific socket
      socket.emit("newMessage", { id: messageKey, Data: { ...newMessage } });
    };

    // Add Firebase listener
    chatRef.on("child_added", listener);
    activeListeners[chatId][socket.id] = { ref: chatRef, listener };

    // Handle disconnection cleanup
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
      if (activeListeners[chatId][socket.id]) {
        chatRef.off("child_added", listener);
        delete activeListeners[chatId][socket.id];
      }
    });
  });

  // Listen for unsubscription
  socket.on("unsubscribeFromChat", (chatId) => {
    console.log(`User ${socket.id} unsubscribed from chat: ${chatId}`);

    if (activeListeners[chatId] && activeListeners[chatId][socket.id]) {
      const { ref, listener } = activeListeners[chatId][socket.id];
      ref.off("child_added", listener);
      delete activeListeners[chatId][socket.id];
      console.log(`Listener removed for chat: ${chatId}, socket: ${socket.id}`);
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
