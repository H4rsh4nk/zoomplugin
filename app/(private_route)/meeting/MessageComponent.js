// MessageComponent.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const MessageComponent = () => {
    const { data: session } = useSession();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Fetch messages when the component mounts or the session changes
    useEffect(() => {
        if (session) {
            axios.get("/api/message?id=" + session?.user.id)
                .then((response) => {
                    setMessages(response.data.body);
                })
                .catch((error) => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [session]);

    // Handle sending a new message
    const sendMessage = async (ev) => {
        ev.preventDefault();
        if (newMessage) {
            const payload = {
                user: session?.user.id,
                newMessage: newMessage,
            };

            try {
                await axios.post("/api/message", payload);
                // Fetch the updated list of messages
                axios.get("/api/message?id=" + session?.user.id)
                    .then((response) => {
                        setMessages(response.data.body);
                        setNewMessage("");
                    });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

// Handle deleting a message
    const deleteMessage = async (index) => {
        try {
            await axios.delete(`/api/message?user_id=${session?.user.id}&message_index=${index}`);
            // Fetch the updated list of messages
            axios.get("/api/message?id=" + session?.user.id)
                .then((response) => {
                    setMessages(response.data.body);
                });
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

     return (
        <div className="mt-10 p-5 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Messages</h2>
            <div className="space-y-3">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 border border-gray-300 rounded-md"
                    >
                        <span className="text-gray-600">{message}</span>
                        <button
                            onClick={() => deleteMessage(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="mt-5">
                <div className="flex flex-col space-y-3">
                    <label className="block text-lg font-medium text-gray-700">
                        Add Message:
                    </label>
                    <input
                        type="text"
                        name="newMessage"
                        value={newMessage}
                        onChange={(ev) => setNewMessage(ev.target.value)}
                        placeholder="Enter your message here"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageComponent;