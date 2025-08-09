import AssignmentDetails from "@/components/AssignementDetails/AssignementDetails";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function AssignmentDetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="lg:relative top-10 -left-20 pb-6">
        <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>
      <AssignmentDetails />
    </div>
  );
}
