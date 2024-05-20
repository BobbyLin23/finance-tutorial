'use client'

import { Button } from '@/components/ui/button'
import { useNewAccounts } from '@/features/accounts/hooks/use-new-accounts'

export default function Home() {
  const { onOpen } = useNewAccounts()

  return (
    <main>
      <Button onClick={onOpen}>Click</Button>
    </main>
  )
}
