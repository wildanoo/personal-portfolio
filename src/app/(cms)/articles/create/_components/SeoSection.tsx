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
import { UseFormReturn } from "react-hook-form";

interface SeoSectionProps {
  form: UseFormReturn<any>;
}

export default function SeoSection({ form }: SeoSectionProps) {
  const { control } = form;

  return (
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
  );
}
