"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { marked } from "marked";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

import "react-markdown-editor-lite/lib/index.css";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  name: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
}

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const isEditMode = params.id !== "create";

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchArticle();
    } else {
      setIsLoading(false);
    }
  }, [isEditMode]);

  const fetchArticle = async () => {
    try {
      const data = await api.get(`/posts/${params.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategoryId(data.categoryId);
      setTags(data.tags.join(", "));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil data artikel",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil daftar kategori",
        variant: "destructive",
      });
    }
  };

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const articleData = {
        title,
        content,
        categoryId,
        tags: tags.split(",").map((tag) => tag.trim()),
      };

      if (isEditMode) {
        await api.put(`/posts/${params.id}`, articleData);
        toast({
          title: "Sukses",
          description: "Artikel berhasil diperbarui",
        });
      } else {
        await api.post("/posts", articleData);
        toast({
          title: "Sukses",
          description: "Artikel baru berhasil dibuat",
        });
      }
      router.push("/articles");
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: `Gagal ${isEditMode ? "memperbarui" : "membuat"} artikel`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
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
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Artikel" : "Buat Artikel Baru"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Konten</Label>
              <MdEditor
                value={content}
                style={{ height: "500px" }}
                renderHTML={(text) => marked(text)}
                onChange={handleEditorChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={categoryId}
                onValueChange={(value) => setCategoryId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isEditMode ? "Perbarui Artikel" : "Buat Artikel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}