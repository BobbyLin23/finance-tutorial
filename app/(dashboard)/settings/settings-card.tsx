'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const SettingsCard = () => {
  const connectedBank = null

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col items-center gap-y-2 py-4 lg:flex-row">
          <p className="w-full text-sm font-medium lg:w-[16.5rem]">
            Bank account
          </p>
          <div className="flex w-full items-center justify-between">
            <div
              className={cn(
                'flex items-center truncate text-sm',
                !connectedBank && 'text-muted-foreground',
              )}
            >
              {connectedBank
                ? 'Bank account connected'
                : 'No bank account connected'}
            </div>
            <Button size="sm" variant="ghost">
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
