import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function BalanceCard() {
  return (
    <Card  className="mx-auto w-full max-w-xs">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardTitle className="text-center text-2xl">1000</CardTitle>
      </CardHeader>
      <CardFooter>
        <Field orientation="horizontal">
            <Input type="number" placeholder="Add Balance..." />
            <Button>Add</Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
