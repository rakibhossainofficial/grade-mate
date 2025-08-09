import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import ReusableModal from "@/components/ReusableModal/ReusableModal";
import TakeAssignmentForm from "@/components/TakeAssignmentForm/TakeAssignmentForm";
import { useAuth } from "@/hooks/useAuth";

export default function AssignmentDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();

  const { data: assignment, isLoading } = useQuery({
    queryKey: ["singleAssignment", id],
    queryFn: async () => {
      return (await axiosInstance(`/assignment/${id}`)).data;
    },
  });

  if (isLoading) {
    return (
      <Card className="max-w-3xl mx-auto my-10 p-6 space-y-4">
        <Skeleton className="h-48 w-full rounded-md" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-40" />
      </Card>
    );
  }
  const {
    _id,
    title,
    description,
    marks,
    thumbnail,
    difficulty,
    dueDate,
    creator: { name, email },
  } = assignment;
  return (
    <Card className="max-w-3xl mx-auto my-10 p-6 space-y-6">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <Badge
          variant={
            difficulty === "easy"
              ? "secondary"
              : difficulty === "medium"
              ? "outline"
              : "default"
          }
        >
          {difficulty}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />

        <p className="text-muted-foreground">{description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-sm text-muted-foreground">
              Marks
            </span>
            <p>{marks}</p>
          </div>

          <div>
            <span className="font-medium text-sm text-muted-foreground">
              Due Date
            </span>
            <p>{new Date(dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <span className="font-medium text-sm text-muted-foreground">
            Creator
          </span>
          <p>
            {name} ({email})
          </p>
        </div>
        {user?.email !== email && (
          <div className="flex justify-end pt-4">
            <ReusableModal
              triggerLabel="Take Assignment"
              title="Ready to Submit?"
              description="Once submitted, you won't be able to edit this assignment."
            >
              <TakeAssignmentForm assignmentData={assignment} />
            </ReusableModal>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
