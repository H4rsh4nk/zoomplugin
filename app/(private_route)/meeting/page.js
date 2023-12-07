//Meeting Register/Join in Page
"use client";
// App.js
import { useSession } from "next-auth/react";
import JoinMeeting from "./JoinMeeting";
import MessageComponent from "./MessageComponent"; // Import the new component
import { SettingsSharp, PersonSharp } from "react-ionicons";

function App() {
    const { data, status } = useSession();

    return (
        <div className="p-10">
            <div className="font-bold text-2xl ">
                Welcome back {data?.user?.name}!
            </div>
            <div className="mb-4">
                Good luck in your meetings today! you're going to be amazing.
            </div>
            <div className="flex">
                <div className="w-3/5 pr-4">
                    <JoinMeeting />
                </div>
                <div className="w-2/5 flex flex-col">
                    <div className="border border-black rounded-3xl shadow-lg shadow-gray-500 p-4 flex-grow" style={{ backgroundColor: "#35377D"}}>
                        <div className="flex text-2xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                            <PersonSharp
                                color={"#FFFFFF"}
                                height="25px"
                                width="25px"
                                className="mt-1 mr-2"
                            />
                            My Profile
                        </div>
                        <div className="ml-8" style={{ color: "#FFFFFF" }}>
                            <div>
                                Access features like badge management, journal
                                viewing, insights, word bank addition, and more.
                            </div>
                            <a
                                href="/profile"
                                style={{ color: "#FEBD2F", textDecoration: "none" }}
                            >
                                Edit Profile &gt;
                            </a>
                        </div>
                    </div>
                    <div className="border border-black rounded-3xl shadow-lg shadow-gray-500 p-4 mt-4 flex-grow" style={{ backgroundColor: "#35377D"}}>
                        <div className="flex align-middle text-2xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
                            <SettingsSharp
                                color={"#FFFFFF"}
                                height="25px"
                                width="25px"
                                className="mt-1 mr-2"
                            />
                            Settings
                        </div>
                        <div className="ml-8" style={{ color: "#FFFFFF" }}>
                            <div>
                                Manage your account username, password, contact
                                information, visual and audio settings, and
                                more.
                            </div>
                            <a
                                href="/journals"
                                style={{ color: "#FEBD2F", textDecoration: "none" }}
                            >
                                Edit Settings &gt;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <MessageComponent />

        </div>
    );
}

export default App;
