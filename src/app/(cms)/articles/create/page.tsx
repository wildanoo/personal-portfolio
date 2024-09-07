"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Tag, TagInput } from "emblor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { parseCookies } from "nookies";

import { STATUS_POST, VISIBILITY_POST } from "../_constants";

const formSchema = z.object({
  title: z.string().min(2).max(255),
  content: z.string().min(2),
  excerpt: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
  metaTitle: z.string().max(255),
  metaDescription: z.string().max(255),
  metaKeywords: z.string().max(255),
  featuredImage: z.string().max(255),
  authorId: z.string().min(2).max(255),
  categoryId: z.string().min(2).max(255),
  status: z.enum(["PUBLISHED", "DRAFT", "PENDING"]),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  publishedOn: z.date(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
});

import { cn } from "@/lib/utils";
import MarkdownEditor from "../components/MarkdownEditor";
import slugify from "@sindresorhus/slugify";

interface Category {
  id: string;
  name: string;
}

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  email?: string;
  exp?: number;
  iat?: number;
  firstName?: string;
  lastName?: string;
}

export default function CreateArticle() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    setAuthorIdFromToken();
  }, []);

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
      featuredImage: "",
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
    getValues,
  } = form;

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
    setValue("content", text); 
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const body = {
        ...values,
        tags: tags.map((tag) => tag.text.trim()),
      };
      await api.post("/posts", body);
      toast({
        title: "Sukses",
        description: "Artikel baru berhasil dibuat",
      });
      router.push("/articles");
    } catch (error) {
      console.error("Error creating article:", error);
      toast({
        title: "Error",
        description: "Gagal membuat artikel baru",
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

  const setAuthorIdFromToken = () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        if (decodedToken && decodedToken.userId) {
          setValue("authorId", decodedToken.userId);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast({
          title: "Error",
          description: "Gagal mengatur ID penulis",
          variant: "destructive",
        });
      }
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = slugify(e.target.value);
    setValue("title", e.target.value);
    setValue("slug", slug);
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
          <Card>
            <CardHeader>
              <CardTitle>Buat Artikel Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex flex-col flex-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Judul</FormLabel>
                          <FormControl>
                            <Input
                              id="title"
                              {...field}
                              placeholder="Input title here"
                              onChange={handleChangeTitle}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input
                              id="slug"
                              {...field}
                              placeholder="article-title-slug"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              id="excerpt"
                              {...field}
                              placeholder="Input short description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {STATUS_POST.map((val, i) => (
                                <SelectItem value={val.value} key={i}>
                                  {val.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Visibility</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {VISIBILITY_POST.map((val, i) => (
                                <SelectItem value={val.value} key={i}>
                                  {val.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="publishedOn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Published On</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date.getTime() <
                                  new Date().setHours(0, 0, 0, 0)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Konten</FormLabel>
                      <FormControl>
                        <MarkdownEditor
                          content={content}
                          onChange={handleEditorChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col flex-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input
                              id="metaTitle"
                              {...field}
                              placeholder="Input meta title here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input
                              id="metaKeywords"
                              {...field}
                              placeholder="Input keywords separated by comma"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="metaDescription"
                              {...field}
                              placeholder="Input description here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col flex-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kategori</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag (pisahkan dengan koma)</FormLabel>
                          <FormControl>
                            <TagInput
                              {...field}
                              placeholder="Enter a topic"
                              styleClasses={{
                                input: "shadow-none",
                              }}
                              tags={tags}
                              setTags={(newTags) => {
                                setTags(newTags);
                                setValue("tags", newTags as [Tag, ...Tag[]]);
                              }}
                              activeTagIndex={activeTagIndex}
                              setActiveTagIndex={setActiveTagIndex}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
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
