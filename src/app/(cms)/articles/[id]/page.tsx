'use client'

import { useParams } from "next/navigation";
import ArticleDetail from "./ArticleDetail";
import ArticleForm from "./edit/page";

export default function ArticlePage() {
  const params = useParams();

  if (
    params.id === "create" ||
    (typeof params.id === "string" && params.id.endsWith("/edit"))
  ) {
    return <ArticleForm />;
  }

  return <ArticleDetail />;
}
