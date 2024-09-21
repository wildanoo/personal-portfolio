import { getSession } from "@/lib/auth";
import ArticleClient from "./_components/ArticleClient";
import { notFound } from "next/navigation";

export default async function Page() {
  const userDetail = await getSession();
  if(!userDetail) return notFound();
  return <ArticleClient user={userDetail} />;
}
