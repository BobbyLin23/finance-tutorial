'use client'

import { Plus } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts'
import { columns, Payment } from '@/app/(dashboard)/accounts/column'
import { DataTable } from '@/components/data-table'

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed522',
    amount: 50,
    status: 'success',
    email: 'm@example.com',
  },
]

export default function AccountsPage() {
  const newAccount = useNewAccounts()

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pt-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">Accounts Page</CardTitle>
          <Button onClick={newAccount.onOpen} size="sm">
            <Plus className="mr-2 size-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  )
}
