"use client";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Signup() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const {error} = await supabase.auth.signUp({
      email,
      password
    })

    if(error) {
      alert(error.message);
      return;
    }

    alert("Signup successful");
    router.push("/login");
  }

  return <div>
    <form onSubmit={handleSignup}>
      <input type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  </div>
}
