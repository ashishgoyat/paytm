"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

type Transaction = {
id: string
amount: number
sender: {
  email: string
}
receiver: {
  email: string
}
}
export function TransactionTable({email}: {email: string | null}) {
  const {data} = useSWR<{transactions: Transaction[]}>(
    "/api/history",
    fetcher
  )


  return (<Card className="h-96">
    <div className="text-xl font-bold text-center">Transactions</div>
    <div className="flex-1 overflow-y-auto pr-2">
    <Table >
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >Type</TableHead>
          <TableHead >Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.transactions.length === 0 ? null : data?.transactions.map((transaction) => {
          const isSent = email === transaction.sender.email;
          return <TableRow key={transaction.id}>
            <TableCell>{isSent ? "Sent to" : "Received from"}</TableCell>
            <TableCell>{isSent ? transaction.receiver.email : transaction.sender.email}</TableCell>
            <TableCell className={isSent ? "text-right text-red-500" : "text-right text-green-500"}>{ isSent ? "-" : "+"}{transaction.amount}</TableCell>
          </TableRow>
})}
      </TableBody>
    </Table>
    </div>
    </Card>
  )
}