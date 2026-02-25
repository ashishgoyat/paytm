import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const supabase = await createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
    if(!user || userError) {
        return NextResponse.json({message: "User not logged in"}, {status: 401});
    }

    const userId = user.user.id;

    const { data, error } = await supabase.from("wallets").select("*").eq("user_id", userId).single();
    if(!data || error) {
        return NextResponse.json({message: "Could not reach server try again"}, {status: 500});
    }
    return NextResponse.json({balance: data.balance});
}