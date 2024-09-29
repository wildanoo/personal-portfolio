import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import MarkdownEditor from "../../_components/MarkdownEditor";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface ArticleContentProps {
  form: UseFormReturn<any>;
}

export default function ArticleContent({ form }: ArticleContentProps) {
  const { control, setValue, setError, clearErrors } = form;
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
    setValue("content", text);
  };

  return (
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
  );
}
