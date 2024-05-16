'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { insertAccountSchema } from '@/db/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValue?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export const AccountForm = ({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  })

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values)
  })

  const handleDelete = () => {
    console.log('delete')
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Cash, Bank, Credit Card"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
          name="name"
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Save changes' : 'Create account'}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  )
}
