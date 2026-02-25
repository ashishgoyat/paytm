import { NextRequest, NextResponse } from "next/server";
import { createServer } from "./lib/supabaseServer";


export async function proxy(req: NextRequest) {
    const supabase = createServer();

    const { data } = await (await supabase).auth.getUser();

    if(!data.user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const response = NextResponse.next();

    response.headers.set("user-email", data.user.email || "");

    return response;
}

export const config = {
    matcher: ["/dashboard",],
}