import CreateAssignmentForm from "@/components/CreateAssignmentForm/CreateAssignmentForm";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function CreateAssignment() {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-3xl mx-auto mb-10">
      <div className="lg:relative top-10 -left-20">
        <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>
      <CreateAssignmentForm />
    </div>
  );
}
