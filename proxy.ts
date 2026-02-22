import { NextRequest, NextResponse } from "next/server";
import { createServer } from "./lib/supabaseServer";


export async function proxy(req: NextRequest) {
    const supabase = createServer();

    const { data } = await (await supabase).auth.getUser();

    if(!data.user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard"],
}