import { categoryType } from "@/app/(cms)/categories/_hooks/useGetAllCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Tag, TagInput } from "emblor";
import { useState } from "react";


interface CategorySectionProps {
  form: UseFormReturn<any>;
  categories: categoryType;
}

export default function CategorySection({ form, categories }: CategorySectionProps) {
  const { control, setValue, setError, clearErrors } = form;
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
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
                        <SelectItem key={category.id} value={category.id}>
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
  );
}
