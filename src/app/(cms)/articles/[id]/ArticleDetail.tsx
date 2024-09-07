"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calendar, User, Tag, Edit, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Article {
  id: string;
  title: string;
  content: string;
  categoryName: string;
  authorName: string;
  createdAt: string;
  tags: string[];
}

export default function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchArticle();
  }, [params.id]);

  const fetchArticle = async () => {
    try {
      const data = await api.get(`/posts/${params.id}`);
      setArticle(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil detail artikel",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!article) {
    return <div>Artikel tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="outline"
        onClick={() => router.push("/articles")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Artikel
      </Button>
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle className="text-3xl font-bold">{article.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm mt-2">
            <span className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {article.authorName}
            </span>
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <Badge variant="secondary">{article.categoryName}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg font-medium mt-3 mb-2" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-base font-medium mt-2 mb-1" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-sm font-medium mt-2 mb-1" {...props} />,
                p: ({ node, ...props }) => <p className="mt-2 mb-4" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mt-2 mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mt-2 mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="mt-1" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                ),
                code: ({ node, inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <pre className="bg-gray-100 rounded p-2 my-2 overflow-auto">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-gray-100 rounded px-1" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <Tag className="h-4 w-4" />
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" onClick={() => router.push(`/articles/${article.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Artikel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}