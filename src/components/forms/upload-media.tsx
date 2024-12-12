"use client";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
import { Input } from "../ui/input";
import FileUpload from "../global/file-upload";
import { Button } from "../ui/button";

type Props = {
  subaccountId: string;
};

const formSchema = z.object({
  link: z.string().min(1, { message: "Media File is required" }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const UploadMediaForm = ({ subaccountId }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      link: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createMedia(subaccountId, values);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Uploaded a Media File | ${response.name}`,
        subaccountId,
      });
      toast({
        title: "Media Uploaded Successfully",
        description: "Your File is Uploaded to the Media Bucket",
      });
      router.refresh(); // Refresh the page
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to Upload the Media",
        description: "Could not Upload the file in Media Bucket",
      });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media Information</CardTitle>
        <CardDescription>Please enter the details for the file</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your file Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Media File</FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="subaccountLogo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4">
              Upload Media
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UploadMediaForm;
