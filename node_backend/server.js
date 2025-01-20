import express from "express";
import http from "http";
import { Server } from "socket.io";
import { firebaseAdmin, db } from "./firebase.js";

const app = express();
const port = process.env.PORT || 3002;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to the Firebase Chat API with Socket.IO!");
});

io.use((socket, next) => {
	const authData = socket.handshake.auth;
	let { token, userId } = authData;
	// console.log(token, userId);
	async function checkForCredentials() {
		const usersRef = db.ref(`tokens/${userId}`);
		const usersSnapshot = await usersRef.once("value");
		const storedToken = usersSnapshot.val();
		if (storedToken === token) {
			return next(); // Credentials are valid, proceed
		} else {
			return next(new Error("Invalid credentials")); // Invalid credentials
		}
	}
	checkForCredentials();
});

let requiredChats = [];
io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected`);
	const listenToChat = (chatId) => {
		try {
			const chatRef = db.ref(`chats/${chatId}`);
			let isFirstMessage = true;
			chatRef
				.orderByKey()
				.limitToLast(1)
				.on("child_added", (snapshot) => {
					try {
						const message = snapshot.val(); // The message object

						// Skip the first message
						if (isFirstMessage) {
							// console.log(`Skipping initial message in chat ${chatId}:`,	message );
							isFirstMessage = false; // Flip the flag after the first message
							return; // Do not emit this message
						}

						// console.log(`New message in chat ${chatId}:`, message);
						io.to(chatId).emit("newMessage", { chatId, message }); // Emit new messages
						// console.log("#########################");
					} catch (err) {
						console.error(
							`Error processing new message for chat ${chatId}:`,
							err
						);
					}
				});
		} catch (err) {
			console.error(`Error setting up listener for chat ${chatId}:`, err);
		}
	};

	socket.on("getChats", async (userId, callback) => {
		console.log("Received getChats request for userId:", userId);

		try {
			if (!userId || typeof userId !== "string") {
				throw new Error("Invalid userId");
			}

			const usersRef = db.ref("users");
			const usersSnapshot = await usersRef.once("value");
			const allUsers = usersSnapshot.val();

			if (allUsers) {
				for (const key in allUsers) {
					if (key !== userId) {
						const chatId = +userId.slice(-2) + +key.slice(-2);
						requiredChats.push(chatId);
					}
				}

				let allChats = {};
				const getEveryChatData = async (chatId) => {
					try {
						const chatRef = db.ref(`chats/${chatId}`);
						const chatSnapshot = await chatRef.once("value");
						allChats[chatId] = Object.values(chatSnapshot.val() || {});
					} catch (err) {
						console.error(`Error fetching chat data for chat ${chatId}:`, err);
					}
				};

				const fetchAllChats = async () => {
					for (const chatId of requiredChats) {
						await getEveryChatData(chatId);
						socket.join(chatId);
						listenToChat(chatId);
					}
					callback({ success: true, allChats });
				};

				fetchAllChats();
			} else {
				console.warn(`No users found for userId: ${userId}`);
				callback({ success: false, message: "No chats found" });
			}
		} catch (err) {
			console.error("Error handling getChats request:", err);
			callback({
				success: false,
				message: "Error fetching chats",
				error: err.message,
			});
		}
	});

	socket.on("disconnect", () => {
		console.log(`User ${socket.id} disconnected`);
		requiredChats.forEach((chatId) => {
			const chatRef = db.ref(`chats/${chatId}`);
			chatRef.off("child_added");
			console.log(`Listener for chat ${chatId} removed`);
		});
		requiredChats = [];
	});

	process.on("SIGINT", () => {
		requiredChats.forEach((chatId) => {
			const chatRef = db.ref(`chats/${chatId}`);
			chatRef.off("child_added");
		});
		console.log("Server shutting down. Removed all listeners.");
		process.exit();
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
