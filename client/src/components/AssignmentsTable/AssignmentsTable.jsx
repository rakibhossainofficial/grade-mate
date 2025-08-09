import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { toast } from "sonner";

export default function AssignmentsTable() {
  const { user } = useAuth();

  const axiosInstance = useAxiosInstance();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      return await axiosInstance("/assignments");
    },
  });

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
    <Card className="my-10 max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          All Assignments ({data?.data.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-10" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.data?.map((a, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{a?.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          a?.difficulty === "easy"
                            ? "secondary"
                            : a?.difficulty === "medium"
                            ? "outline"
                            : "default"
                        }
                      >
                        {a?.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{a?.marks}</TableCell>
                    <TableCell>
                      {new Date(a?.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{a?.creator?.name}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Link to={`/assignment/${a?._id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      {user?.email === a?.creator?.email && (
                        <>
                          <Link to={`/update-assignment/${a?._id}`}>
                            <Button variant="secondary" size="sm">
                              Update
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleDelete(a?._id)}
                            variant="destructive"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
