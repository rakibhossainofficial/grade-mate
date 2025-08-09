import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GoogleLoginButton from "@/components/GoogleLogin/GoogleLogin";
import { useAuth } from "@/hooks/useAuth";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  photoURL: z.string().url("Must be a valid URL"),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[!@#$%^&*]/, "Must include one special character"),
});

export default function RegisterForm() {
  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    console.log("✅ Registration data:", data);
    // Handle actual registration logic here (e.g. Firebase/JWT)
    try {
      await createUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input id="photoURL" type="url" {...register("photoURL")} />
            {errors.photoURL && (
              <p className="text-sm text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <GoogleLoginButton />
      </CardContent>
      <CardFooter className="text-sm text-center flex justify-center">
        Already registered?
        <a href="/login" className="ml-2 text-primary underline">
          Login
        </a>
      </CardFooter>
    </Card>
  );
}
