import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const formSchema = z.object({
  notes: z.string().optional(),
  submissionUrl: z
    .string()
    .url("Please enter a valid URL (e.g. https://...)")
    .min(1, { message: "Submission URL is required" }),
});

export default function TakeAssignmentForm({ assignmentData }) {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      submissionUrl: "",
    },
  });

  const onSubmit = async (data) => {
    const submitAssignment = {
      ...data,
      assignmentId: assignmentData?._id,
      studentName: user?.displayName || "User",
      studentEmail: user?.email,
      assignmentCreator: assignmentData?.creator,
    };

    // 👉 You can call your submit mutation or API here
    try {
      await axiosInstance.post("/submitted-assignment", submitAssignment);
      toast.success("Assignment submitted successfully.");
      navigate("/pending-assignments");
    } catch (error) {
      console.log(error);
      toast.error("Failed submitting assignment");
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Take Assignment</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="submissionUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignment URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="e.g. https://github.com/user/project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any comments or explanation..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit Assignment</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
