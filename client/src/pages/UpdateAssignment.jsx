import UpdateAssignmentForm from "@/components/UpdateAssignmentForm/UpdateAssignmentForm";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function UpdateAssignment() {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["singleAssignment", id],
    queryFn: async () => {
      return await axiosInstance(`/assignment/${id}`);
    },
  });
  const assignmentData = data?.data;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative max-w-3xl mx-auto mb-10">
      <div className="lg:relative top-10 -left-20">
        <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>
      <UpdateAssignmentForm data={assignmentData} />
    </div>
  );
}
