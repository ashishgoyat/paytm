import { createServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
    const supabase = await createServer();

    const transferDetails = z.object({
        amount: z.coerce.number().min(1,"Amount should be at least 1"),
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

    const { data: receiver, error: receiverError } = await supabase.from("profiles").select("*").eq("email", body.receiver).single();    
    if(receiverError || !receiver) {
        return NextResponse.json({message: "Receiver not found"}, {status: 404})
    }

    const { error } = await supabase.rpc("transfer_money",{
        sender: userData.user.id,
        receiver: receiver.id,
        amount: body.amount
    })
    if(error){
        return NextResponse.json({message: error.message}, {status: 400})
    }
    
    return NextResponse.json({message: `transaction done! ${body.amount} sent from ${userData.user.email} to ${body.receiver}`})
}