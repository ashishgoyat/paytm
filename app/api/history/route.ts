import { createServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createServer();

    const { data: user,error: userError} = await supabase.auth.getUser();
    if(userError || !user){
        return NextResponse.json({message: "User not logged in"}, {status: 401})
    }

    const userId = user.user.id;

    const {data, error } = await supabase.from("transactions")
    .select(`
        *,
        sender: profiles!sender_id (email),
        receiver: profiles!receiver_id (email)
        `)
    .or(`sender_id.eq.${userId}, receiver_id.eq.${userId}`)
    .order("created_at", {ascending: false});

    if(error){
        return NextResponse.json({message: "Error in finding the transactions try again"}, {status: 500});
    }
    return NextResponse.json({transactions: data})
}