import { getServerSession } from "next-auth";
import { authOPtions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request:Request){
    await dbConnect()

    const session=await getServerSession(authOPtions)
    const user:User=session?.user as User
    
    if(!session ||!session.user){
        return Response.json({
            success:false,
            message:"User not Authenticated"
        },
        {status:401})
    }

    const userId=user._id
    const{acceptMessage}=await request.json()


    try {

        const updatedUser=await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage:acceptMessage},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"Failed to update user status to accept messages."
            },
            {status:401})
        }
        return Response.json({
            success:true,
            message:"Message acceptance status Updated successfully.",updatedUser
        },
        {status:200})
        
    } catch (error) {
        console.log("Failed to update user status to accept messages.")
        return Response.json({
            success:false,
            message:"Failed to update user status to accept messages."
        },
        {status:500})
    }

}

export async function GET(request:Request) {
    await dbConnect()

    const session=await getServerSession(authOPtions);
    const user:User=session?.user as User

    try {
        if(!session||!session.user){
            return Response.json(
                {
                    success:false,
                    message:"Not Authenticated"
                },
                {status:401}
            
            )
        }
        const userId=user._id
        const foundUser= await UserModel.findById(userId);
        if(!foundUser){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {status:404}
            
            )
        }
    
        return Response.json(
            {
                success:true,
                isAcceptingMessages:foundUser.isAcceptingMessage
            },
            {status:200}
        
        )
    } catch (error) {
        console.log("Failed to update user status to accept messages.")
        return Response.json({
            success:false,
            message:"Error in getting messages acceptance status."
        },
        {status:500})
    }
    
}