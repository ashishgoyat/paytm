import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransferForm } from "@/components/dashboard/TransferForm";

export default function Dashboard() {
  return (
    <div className="p-8 w flex justify-end ">
      <div>
        <TransferForm />
      </div>
      <div className="p-8 space-y-10">
      <BalanceCard />
      <TransactionTable />
      </div>
    </div>
  );
}