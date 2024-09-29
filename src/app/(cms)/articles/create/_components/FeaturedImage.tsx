import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface FeaturedImageProps {
  form: UseFormReturn<any>;
}

export default function FeaturedImage({ form }: FeaturedImageProps) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("featuredImage", acceptedFiles[0]);
        form.clearErrors("featuredImage");
      } catch (error) {
        setPreview(null);
        form.resetField("featuredImage");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const removeImage = () => {
    setPreview("");
    form.resetField("featuredImage");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="featuredImage"
            render={() => (
              <FormItem className="relative mx-auto md:w-3/4">
                <FormControl>
                  <>
                    {preview && (
                      <div
                        className="absolute right-1 top-1 z-10 cursor-pointer"
                        onClick={removeImage}
                      >
                        <IoIosCloseCircleOutline size={40} color="gray" />
                      </div>
                    )}
                    <div
                      {...getRootProps()}
                      className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-full visually-hidden-focusable h-full"
                    >
                      {preview && (
                        <Image
                          className="max-h-[400px] rounded-lg"
                          alt="Uploaded image"
                          src={preview as string}
                          width={400}
                          height={300}
                        />
                      )}
                      <div className="border p-2 rounded-md max-w-min mx-auto">
                        <IoCloudUploadOutline
                          className={`1.6em ${preview ? "hidden" : "block"}`}
                        />
                      </div>
                      <Input {...getInputProps()} type="file" />
                      {isDragActive ? (
                        <p>Drop the image!</p>
                      ) : (
                        <p>Click here or drag an image to upload it</p>
                      )}
                    </div>
                  </>
                </FormControl>
                <FormMessage>
                  {fileRejections.length !== 0 && (
                    <p>
                      Image must be less than 1MB and of type png, jpg, or jpeg
                    </p>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
