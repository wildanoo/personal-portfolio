import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import slugify from "@sindresorhus/slugify";
import { cn, debounce } from "@/lib/utils";
import { api } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_POST, VISIBILITY_POST } from "../../_constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ArticleBasicInfoProps {
  form: UseFormReturn<any>;
}

export default function ArticleBasicInfo({ form }: ArticleBasicInfoProps) {
  const { control, setValue, setError, clearErrors } = form;
  const [open, setOpen] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = slugify(e.target.value);
    setValue("title", e.target.value);
    setValue("slug", slug);
    debouncedSlug(slug);
  };

  const handleChangeSlug = async (slug: string) => {
    try {
      const body = { slug };
      const slugChecked = await api.post("/posts/slug", JSON.stringify(body));
      clearErrors("slug");
      if (slugChecked) {
        setError("slug", { message: "Slug has been used" });
      }
    } catch (error) {
      console.error("Error check slug:", error);
    }
  };

  const debouncedSlug = debounce(handleChangeSlug, 500);

  return (
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
                        onChange={(e) => {
                          setValue("slug", e.target.value);
                          debouncedSlug(e.target.value);
                        }}
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
                    <Popover open={open} onOpenChange={setOpen}>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            date && field.onChange(date);
                            setOpen(false);
                          }}
                          disabled={(date) =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0)
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
  );
}
