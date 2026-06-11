import { redirect } from 'next/navigation'

// The landing design is now the site home (rendered at `/`). Preserve this
// previously-shared URL by redirecting it to the home route.
export default function LandingPageRedirect() {
  redirect('/')
}
