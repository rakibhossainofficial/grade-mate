import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import GradeAssignmentForm from "@/components/GradeAssignmentForm/GradeAssignmentForm";
import ReusableModal from "@/components/ReusableModal/ReusableModal";

export default function PendingAssignments() {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pendingAssignments"],
    queryFn: async () => {
      return (await axiosInstance(`/pending-assignments?email=${user?.email}`))
        .data;
    },
  });

  return (
    <Card className="max-w-6xl mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Pending Assignments ({data?.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assignment Name</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Action</TableHead>
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
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-36" />
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
                    <TableCell>{submission.studentName}</TableCell>
                    <TableCell>
                      <a
                        href={submission.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Submission
                      </a>
                    </TableCell>
                    <TableCell>{submission.notes || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{submission.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.submittedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {submission.studentEmail === user?.email ? (
                        <Link
                          to={`/assignment/${submission.assignmentData._id}`}
                        >
                          <Button variant="outline" size="sm">
                            View Assignment
                          </Button>
                        </Link>
                      ) : (
                        <ReusableModal
                          triggerLabel="Give Marks"
                          title="Grade Submission"
                          description="Provide marks and feedback. Once submitted, this cannot be changed."
                        >
                          <GradeAssignmentForm
                            submissionData={submission}
                            refetch={refetch}
                          />
                        </ReusableModal>
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
