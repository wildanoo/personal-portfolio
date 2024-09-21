import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import DashboardLayoutClient from "./_components/DashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = cookies().get("session")?.value;
  if (!session) {
    redirect("/login");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
