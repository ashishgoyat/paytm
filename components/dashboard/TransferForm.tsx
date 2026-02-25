"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios";
import { mutate } from "swr";


export function TransferForm() {
  const [amount, setAmount] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSend() {
    setIsSubmitting(true);
    if(!amount || Number(amount) <= 0 || !receiver){
      setIsSubmitting(false);
      setAmount("");
      return;
    }
    try {
    await axios.post("/api/transfer", {amount: Number(amount), receiver: receiver});
    setAmount("");
    setReceiver("");
    await mutate("/api/check-balance");
    await mutate("/api/history")
  } catch (err: any) {
    alert(err.response.data.message);
  }
  setIsSubmitting(false);
  }

  return (<div>
    <div className="text-center text-6xl font-semibold">Paytm</div>
  <Card className="w-2xl h-90 p-10 my-30">
    <div className="text-center mb-10 text-2xl font-semibold">Send Money to others</div>
    <div className="grid w-full max-w-sm gap-6 mx-auto">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>₹</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
        <InputGroupAddon align="inline-end">
          <InputGroupText>INR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="example@gmail.com" className="pl-0.5!" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Receiver' Email</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <Button onClick={handleSend} disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send"}</Button>
    </div>
    </Card>
    </div>
  )
}