import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosInstance from "@/hooks/useAxiosInstance";

const assignmentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  marks: z.coerce
    .number()
    .min(1, "Marks must be at least 1")
    .max(100, "Marks cannot be more than 100"),
  thumbnail: z.string().url("Must be a valid image URL"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({ message: "Select a difficulty level" }),
  }),
  dueDate: z.date({ required_error: "Please select a due date" }),
});

export default function CreateAssignmentForm() {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: { difficulty: "medium", marks: 100 },
  });

  const onSubmit = async (data) => {
    const assignment = {
      ...data,
      creator: {
        name: user.displayName || "User",
        email: user.email,
      },
    };

    console.log("✅ Assignment Data:", assignment);
    // Connect with backend mutation here...
    try {
      await axiosInstance.post("/assignment", assignment);
      toast.success("Assignment Created");
      navigate("/assignments");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-center">Create Assignment</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="marks">Marks</Label>
            <Input id="marks" disabled type="number" {...register("marks")} />
            {errors.marks && (
              <p className="text-xs text-red-500">{errors.marks.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input id="thumbnail" type="url" {...register("thumbnail")} />
            {errors.thumbnail && (
              <p className="text-xs text-red-500">{errors.thumbnail.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center gap-10">
            <div className="w-1/2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Controller
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty && (
                <p className="text-xs text-red-500">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Controller
                control={control}
                name="dueDate"
                className="w-full"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Pick a due date"
                    className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
                  />
                )}
              />
              {errors.dueDate && (
                <p className="text-xs text-red-500">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Assignment
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-center text-muted-foreground">
        Assignments are public. Create with clarity ✍️
      </CardFooter>
    </Card>
  );
}
