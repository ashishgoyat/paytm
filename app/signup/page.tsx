"use client";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/themetoggle";


export default function Signup() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup successful");
    router.push("/login");
  }

  return <div>
    <div className="p-3">
        <ModeToggle />
        </div>
    <div className="text-center font-bold text-5xl my-10">Sign Up</div>
  <Card className="mx-auto w-full max-w-md p-10">
    <form onSubmit={handleSignup}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">Signup</Button>
        </Field>
      </FieldGroup>
    </form>
  </Card>
  </div>
}
