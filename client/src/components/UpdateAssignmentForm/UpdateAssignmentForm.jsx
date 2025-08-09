import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// ✅ Validation Schema
const assignmentSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  marks: z.coerce.number().min(1).max(100),
  thumbnail: z.string().url(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  dueDate: z.date(),
});

export default function UpdateAssignmentForm({ data: assignmentData }) {
  const { title, description, marks, thumbnail, difficulty, dueDate, _id } =
    assignmentData;
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  console.log("assignmentID", _id);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title,
      description,
      marks,
      thumbnail,
      difficulty,
      dueDate: new Date(dueDate),
    },
  });

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.put(`/assignment/${_id}`, data);
      console.log("🔄 Updated Assignment:", data);
      toast.success("Assignment updated successfully.");
      navigate("/assignments");
    } catch (error) {
      console.log(data);
      console.log(error);
      toast.error("Failed to update the assignment.");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Update Assignment</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
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
            <Input id="thumbnail" {...register("thumbnail")} />
            {errors.thumbnail && (
              <p className="text-xs text-red-500">{errors.thumbnail.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
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
                    <SelectTrigger className="w-full">
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
                className="w-full"
                control={control}
                name="dueDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
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
            Update Assignment
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-sm text-center text-muted-foreground">
        Your changes will reflect instantly. Make it count ✍️
      </CardFooter>
    </Card>
  );
}
