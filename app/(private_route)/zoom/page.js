//Zoom meeting page with Message Popup
"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

export default function Zoom() {
    
    //Message Popup component
    const [message, setMessage] = useState("");
    const [displayedMessage, setDisplayedMessage] = useState("");
    const [isMessageVisible, setIsMessageVisible] = useState(false);

    const submitChatMessage = (e) => {
        e.preventDefault();
        setDisplayedMessage(message);
        setMessage("");
        setIsMessageVisible(true);
    };

    const closeMessagePopup = () => {
        setIsMessageVisible(false);
    };

    // Get values from URL
    const searchParams = useSearchParams();
    const meetingNumber = searchParams.get("meetingNumber");
    const role = searchParams.get("role");
    const passWord = searchParams.get("passWord");
    const userName = searchParams.get("userName");

    // Join Zoom Meeting with Api calls
    useEffect(() => {
        const joinMeeting = async () => {
            const client = ZoomMtgEmbedded.createClient();
            let meetingSDKElement =
                document.getElementById("meetingSDKElement");
            try {
                // Initilize meeting SDK and customize it's default screen
                await client.init({
                    zoomAppRoot: meetingSDKElement,
                    language: "en-US",
                    customize: {
                        video: {
                            defaultViewType: "gallery",
                        },
                        isResizable: true,
                        viewSizes: {
                            default: {
                                width: 1000,
                                height: 1000,
                            },
                            ribbon: {
                                width: 300,
                                height: 1000,
                            },
                        },
                        chat: {
                            popper: {
                                placement: "right",
                            },
                        },
                    },
                });

                // Make API call to get signature and sdkKey
                let response = null;
                try {
                    // Send API POST request to get Zoom meeting Signature
                    response = await fetch("/api/zoom", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            meetingNumber: meetingNumber,
                            role: role,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    // Parse the response data as JSON
                    response = await response.json();
                } catch (error) {
                    console.error("Error fetching data:", error);
                }

                // Joining Zoom meeting
                client.join({
                    signature: response.signature,
                    sdkKey: response.sdkKey,
                    meetingNumber: meetingNumber,
                    password: passWord,
                    userName: userName,
                });
            } catch (error) {
                console.error("Error initializing the meeting SDK:", error);
            }
        };

        joinMeeting();
    }, []);

    return (
        <div>
            {/* Displaying message popup box */}
            {isMessageVisible && (
                <div className="flex justify-center" id="messageContainer">
                    <div className="bg-green-500 text-white p-2 rounded-lg mb-2">
                        <div className="flex items-center">
                            <span className="mr-2">{displayedMessage}</span>

                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    onClick={closeMessagePopup}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Meeting display component and message input component */}
            <div className="flex">
                <div
                    className="w-70 h-4/5 flex-auto"
                    id="meetingSDKElement"
                ></div>
                <div className="w-30 flex justify-end items-end">
                    <form className="mt-2 flex" onSubmit={submitChatMessage}>
                        <input
                            className="rounded-l-lg textbox"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                        />

                        {/* <Test /> */}

                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
