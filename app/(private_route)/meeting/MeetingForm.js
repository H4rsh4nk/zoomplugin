// MeetingForm.js
import { LaptopOutline } from "react-ionicons";


function MeetingForm({ formData, handleMeetingInfo, joinMeeting }) {
    return (
        <div className="border border-black rounded-3xl shadow-lg shadow-gray-500 p-4  ">
            <div className="flex text-2xl font-bold mb-4">
                <LaptopOutline
                    color={"#00000"}
                    height="25px"
                    width="25px"
                    className="mt-1 mr-4 ml-2"
                />
                Join your meeting
            </div>
            <form onSubmit={joinMeeting} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">
                        <div className="font-bold mb-2">Meeting ID</div>
                        <input
                            type="text"
                            name="meetingNumber"
                            value={formData.meetingNumber}
                            onChange={handleMeetingInfo}
                            placeholder="Enter Meeting ID"
                            className="textbox"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        <div className="font-bold mb-2">Meeting Password</div>

                        <input
                            type="password"
                            name="passWord"
                            value={formData.passWord}
                            onChange={handleMeetingInfo}
                            placeholder="Enter Password"
                            className="textbox"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        <div className="font-bold mb-2">User Name</div>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleMeetingInfo}
                            placeholder="Enter the name you wish to display"
                            className="textbox"
                        />
                    </label>
                </div>
                <div className="flex justify-end">
                    <button className="button w-2/5" type="submit">
                        Join
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MeetingForm;
