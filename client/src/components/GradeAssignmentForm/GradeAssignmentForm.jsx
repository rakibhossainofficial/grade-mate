import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "sonner";

const formSchema = z.object({
  grades: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Please enter a valid number between 0 and 100",
    }),
  feedback: z.string().optional(),
});

export default function GradeAssignmentForm({ submissionData, refetch }) {
  const axiosInstance = useAxiosInstance();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grades: 0,
      feedback: "",
    },
  });

  const onSubmit = async (data) => {
    const grade = {
      ...data,
    };
    console.log(grade);
    try {
      await axiosInstance.put(
        `/submitted-assignment/check/${submissionData._id}`,
        grade
      );
      toast.success("Marks submitted successfully.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit marks.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Grade Assignment</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="grades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grades</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 80" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide feedback or suggestions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit Marks</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
