import { io } from "socket.io-client";

// Replace with your server's URL and port
const SERVER_URL = "http://localhost:3002";

const socket = io(SERVER_URL, {
	reconnectionAttempts: 10, // Retry 5 times if the connection fails
	timeout: 2000, // Wait 5 seconds for a connection
});

socket.on("connect", () => {
	console.log("Connected to the server. Socket ID:", socket.id);

	socket.on("newMessage", (data) => {
		console.log("New message:", data);
	});

	// Test the 'getChats' event
	const testUserId = "1725483302639"; // Replace  with a test userId
	socket.emit("getChats", testUserId, (response) => {
		if (response.success) {
			console.log("Chats received from server:", response);
		} else {
			console.error("Failed to get chats:", response.message);
		}
	});
});

// Listen for connection errors
socket.on("connect_error", (error) => {
	console.error("Connection error:", error.message);
});

// Listen for disconnect events
socket.on("disconnect", () => {
	console.log("Disconnected from the server.");
});

// Handle SIGINT to disconnect cleanly
process.on("SIGINT", () => {
	console.log("Shutting down test client...");
	socket.disconnect();
	process.exit();
});
