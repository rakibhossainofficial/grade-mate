import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useAuth } from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttemptedAssignments() {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["attemptedAssignments"],
    queryFn: async () => {
      const res = await axiosInstance(
        `/attempted-assignments?email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <Card className="max-w-6xl mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Attempted Assignments
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment Name</TableHead>
              <TableHead>Grades</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Checked At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.map((submission, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{submission.assignmentData.title}</TableCell>
                    <TableCell>{submission.grades}</TableCell>
                    <TableCell>{submission.feedback || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="default">{submission.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.submittedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(submission.checkedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
