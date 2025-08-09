import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { toast } from "sonner";

export default function AssignmentCard({ assignment, refetch }) {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  const {
    _id,
    title,
    description,
    marks,
    difficulty,
    thumbnail,
    creator,
    dueDate,
  } = assignment;

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/assignment/${id}`);
      refetch();
      toast.success("Assignment deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Deleting assignment failed!");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <img
          src={thumbnail}
          alt={title}
          className="h-40 w-full object-cover rounded-md"
        />
        <div className="mt-4 space-y-1">
          <CardTitle>{title}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex justify-between text-sm">
        <Badge variant="secondary">{difficulty}</Badge>
        <span>Marks: {marks}</span>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          <span>By: {creator?.name}</span>
          <br />
          <span>Due: {new Date(dueDate).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2">
          <Link to={`/assignment/${_id}`}>
            <Button size="sm" variant="outline">
              View
            </Button>
          </Link>
          {user?.email === creator?.email && (
            <>
              <Button size="sm" variant="outline">
                <Link to={`/update-assignment/${_id}`}>Update</Link>
              </Button>
              <Button
                onClick={() => handleDelete(_id)}
                size="sm"
                variant="destructive"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
