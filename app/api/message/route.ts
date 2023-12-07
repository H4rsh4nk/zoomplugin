import startDB from "@/lib/db";
import MessageModel from "@/models/messageModel";

export const POST = async (req: Request, res: Response) => {
    const body = await req.json();
    const newMessage = body.newMessage;
    const userId = body.user;
    
    await startDB();

    const message = await MessageModel.findOneAndUpdate(
            { user: userId },
            { $push: { messages: newMessage } },
            { new: true }
        );
        
    if (!message) {
        await MessageModel.create({ user: userId, messages: [newMessage] });
    }
    return new Response(
        JSON.stringify({
            message: "Message send successfully.",
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
};

export const GET = async (req: Request, res: Response) => {
    
    await startDB();
    const params = new URLSearchParams(req.url.split("?")[1]); // Extract query parameters

    const userId = params.get("id");

    const data = await MessageModel.findOne({ user: userId });
    
    return new Response(
        JSON.stringify({
            body: data.messages
        })
    );
};

export const DELETE = async (req: Request) => {
    try {
        await startDB();
        const params = new URLSearchParams(req.url.split("?")[1]);
        
        const userId = params.get("user_id");
        const messageIndexStr = params.get("message_index"); // Get the value as a string

        // Parse the message index as an integer, handling the case of NaN
        const messageIndex = Number(messageIndexStr);

        if (!userId || isNaN(messageIndex)) {
             return new Response(
                JSON.stringify({
                    error: "Invalid user ID or message index.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const userData = await MessageModel.findOne({ user: userId });

        if (!userData || !userData.messages || messageIndex >= userData.messages.length) {
            return new Response(
                JSON.stringify({
                    error: "User not found or message index out of range.",
                }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Remove the indexed message from the array
        userData.messages.splice(messageIndex, 1);

        // Update the messages array in the document
        await MessageModel.updateOne(
            { user: userId },
            { $set: { messages: userData.messages } }
        );

        return new Response(
            JSON.stringify({
                success: true,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                error: "An error occurred while processing your request.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};