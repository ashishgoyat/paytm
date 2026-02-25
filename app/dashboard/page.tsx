import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TransferForm } from "@/components/dashboard/TransferForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const supabase = await createClient();
  const { data: {user}} = await supabase.auth.getUser()
  
    if(!user) {
      redirect("/signin")
    }
    const email = user.email || null;

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