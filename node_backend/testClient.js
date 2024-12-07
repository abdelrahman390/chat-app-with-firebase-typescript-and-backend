import { io } from "socket.io-client";

const socket = io("http://localhost:3002"); // Connect to your server

socket.on("connect", () => {
  console.log("Connected to the server:", socket.id);

  // Emit a test event (optional, if server expects specific events)
  // socket.emit("testEvent", { data: "Test Data" });
});

socket.on("newMessage", (message) => {
  console.log("New message received:", message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
