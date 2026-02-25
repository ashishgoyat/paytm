import { createServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function POST(req: NextRequest) {
    const supabase = await createServer();

    const add_balance_details = z.object({
            amount: z.coerce.number().min(1,"Amount should be at least 1")
        })

    const { data: user, error: userError} = await supabase.auth.getUser();
    if(!user?.user || userError) {
        return NextResponse.json({message: "User not logged in"}, {status: 401});
    }

    const json = await req.json();
    const result = add_balance_details.safeParse(json)
    if(!result.success){
        return NextResponse.json({message: "Enter the details carefully"}, {status: 400})
    }

    const userId = user.user.id;

    const { data, error: walletError } = await supabase.from("wallets").select("*").eq("user_id", userId).single();
    if(!data || walletError) {
        return NextResponse.json({message: "Could not find wallet try again"}, {status: 500});
    }

    const new_balance = Number(result.data.amount) + data.balance
    const { error } = await supabase.rpc('update_wallet_balance', {
        wallet_id: data.id,
        new_balance: new_balance
    })
    if(error) {
        return NextResponse.json({message: "Error in updating balance try again"}, {status: 500});
    }
    return NextResponse.json({user: userId, data, new_balance});
}