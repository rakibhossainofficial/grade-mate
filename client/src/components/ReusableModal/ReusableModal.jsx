import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ReusableModal({
  triggerLabel = "Open Modal",
  title = "Modal Title",
  description = "This is a reusable modal component.",
  children,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* 🔧 Custom content passed as children */}
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
