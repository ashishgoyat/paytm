import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransferForm } from "@/components/dashboard/TransferForm";
import { headers } from "next/headers";

export default async function Dashboard() {
  const headerlist = await headers();
    const email = headerlist.get("user-email");
  return (
    <div className=" flex justify-end space-x-8">
      <div className="px-8 ml-8 mt-8">
        <TransferForm />
      </div>
      <div className="py-8 space-y-10">
      <BalanceCard />
      <TransactionTable email={email} />
      </div>
    </div>
  );
}