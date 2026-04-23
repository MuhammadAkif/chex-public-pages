import type { Route } from 'next'
import { redirect } from 'next/navigation'

export default function SitePage() {
  redirect('/home' as Route)
}
