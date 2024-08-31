export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="h-dvh flex items-center">{children}</section>
  }