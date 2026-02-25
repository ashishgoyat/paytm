"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

export function BalanceCard() {
  const [addAmount, setAddAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, error, isLoading } = useSWR(
    "/api/check-balance",
    fetcher
  );

  async function sendAmount() {
    if (!addAmount || Number(addAmount) <= 0) return;

    try {
      setIsSubmitting(true);

      await axios.post("/api/add-balance", {
        amount: Number(addAmount),
      });

      setAddAmount("");

      await mutate("/api/check-balance");

    } catch (err: any) {
      console.error("Failed to add balance:", err.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle className="text-2xl">
          Your Balance:{" "}
          <span className="text-blue-400 font-bold">
            {isLoading
              ? "Loading..."
              : error
              ? "Error"
              : data?.balance}
          </span>
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <Field orientation="horizontal">
          <Input
            type="number"
            placeholder="Add Balance..."
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
          />

          <Button
            onClick={sendAmount}
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : "Add"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}