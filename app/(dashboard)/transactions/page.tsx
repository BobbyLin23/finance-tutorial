'use client'

import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { columns } from '@/app/(dashboard)/transactions/columns'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions'
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account'

import { transactions as transactionSchema } from '@/db/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { UploadButton } from '@/components/upload-button'
import { ImportCard } from '@/app/(dashboard)/transactions/import-card'

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
}

export default function TransactionPage() {
  const [AccountDialog, confirm] = useSelectAccount()
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState<
    typeof INITIAL_IMPORT_RESULTS
  >(INITIAL_IMPORT_RESULTS)

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT)
    setImportResults(results)
  }

  const onCancelImport = () => {
    setVariant(VARIANTS.LIST)
    setImportResults(INITIAL_IMPORT_RESULTS)
  }

  const newTransaction = useNewTransaction()
  const bulkCreateMutation = useBulkCreateTransactions()
  const deleteTransactions = useBulkDeleteTransactions()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

  const onSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[],
  ) => {
    const accountId = await confirm()

    if (!accountId) {
      return toast.error('Please select an account to continue')
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }))

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport()
      },
    })
  }

  if (transactionsQuery.isLoading)
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    )

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    )
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pt-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Transaction History
          </CardTitle>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <Button
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full lg:w-auto"
            >
              <Plus className="mr-2 size-4" />
              Add New
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="payee"
            onDelete={(rows) => {
              const ids = rows.map((row) => row.original.id)
              deleteTransactions.mutate({ ids })
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  )
}
