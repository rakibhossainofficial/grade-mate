import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-background px-6">
      <div className="text-center space-y-6">
        <img src="https://i.ibb.co/3m7sqTFd/error-page.png" width={500} alt="error image" />
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
