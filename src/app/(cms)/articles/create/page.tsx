"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Tag, TagInput } from "emblor";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "./schema";
import useGetAllCategories from "@/app/(cms)/categories/_hooks/useGetAllCategories";
import ArticleBasicInfo from "./_components/ArticleBasicInfo";
import FeaturedImage from "./_components/FeaturedImage";
import ArticleContent from "./_components/ArticleContent";
import SeoContent from "./_components/SeoSection";
import CategorySection from "./_components/CategorySection";
import { CustomJwtPayload, userFromToken } from "@/lib/auth";

export default function CreateArticle() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    fetchCategories,
    data: categories,
    loading: loadingCategory,
    error: errorCategory,
  } = useGetAllCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      featuredImage: new File([""], "filename"),
      authorId: "",
      categoryId: "",
      status: undefined,
      visibility: undefined,
      publishedOn: new Date(),
      tags: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = form;

  useEffect(() => {
    fetchCategories();
    setAuthorIdFromToken();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const formatBody = {
        ...values,
        tags: tags.map((tag) => tag.text.trim()),
      };
      const formData = new FormData();

      Object.entries(formatBody).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      await api.post("/posts", formData);
      toast({
        title: "Success",
        description: "Article successfully created",
      });
      router.push("/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      toast({
        title: "Error",
        description: "Failed create new article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  const setAuthorIdFromToken = async () => {
    const userDetail = (await userFromToken()) as CustomJwtPayload;
    if (userDetail) {
      setValue("authorId", userDetail?.userId || "");
    } else {
      toast({
        title: "Error",
        description: "Failed to set author ID",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="outline"
        onClick={() => router.push("/articles")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Artikel
      </Button>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ArticleBasicInfo form={form} />
          <FeaturedImage form={form} />
          <ArticleContent form={form} />
          <div className="flex gap-4">
            <SeoContent form={form} />
            <CategorySection categories={categories} form={form} />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Buat Artikel
          </Button>
        </form>
      </Form>
    </div>
  );
}
