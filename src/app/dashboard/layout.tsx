import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers()
  const token = headersList.get('cookie')?.split('token=')[1]

  if (!token) {
    redirect('/login')
  }

  return (<>{children}</>)
}
