import { createServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import z from "zod";

export async function POST(req: NextRequest) {
    const supabase = await createServer();

    const transferDetails = z.object({
        amount: z.number().min(1,"Amount should be at least 1"),
        receiver: z.string().email("Enter the correct format for the email")
    })

    const { data: userData, error: userError} = await supabase.auth.getUser();

    if(!userData.user || userError) {
        return NextResponse.json({message: "User not logged in"}, {status: 401})
    }

    const json = await req.json();
    const result = transferDetails.safeParse(json)
    if(!result.success){
        return NextResponse.json({message: "Enter the details carefully"}, {status: 400})
    }

    const body = result.data;
    if(body.receiver == userData.user?.email){
        return NextResponse.json({message: "You can't send it to yourself"}, {status: 400});
    }

    const { data: receiver, error: receiverError } = await supabase.from("profiles").select("*").eq("email", body.receiver).single();    
    if(receiverError || !receiver) {
        return NextResponse.json({message: "Receiver not found"}, {status: 404})
    }

    const { data: userWallet, error: userWalletError} = await supabase.from("wallets").select("*").eq("user_id", userData.user.id).single();
    if(!userWallet || userWalletError){
        return NextResponse.json({message: "Your wallet not found"}, {status: 404})
    }

    const { data: receiverWallet, error: receiverWalletError} = await supabase.from("wallets").select("*").eq("user_id", receiver.id).single();
    if(!receiverWallet || receiverWalletError){
        return NextResponse.json({message: "Receiver's wallet not found"}, {status: 404})
    }

    if(userWallet.balance < body.amount){
        return NextResponse.json({message: "Insufficient balance"}, {status: 400})
    }
    
    return NextResponse.json({messgae: "transaction done!", body, sendermail: userData.user?.email, name: "ashish"})
}