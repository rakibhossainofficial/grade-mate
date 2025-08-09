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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import GoogleLoginButton from "@/components/GoogleLogin/GoogleLogin";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter"),
});

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login data", data);
    try {
      const { user } = await login(data.email, data.password);
      console.log(user);
      await axiosInstance.post("/login", {
        userUID: user.uid,
        userEmail: user.email,
      });
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(
        error.message === "Firebase: Error (auth/invalid-credential)."
          ? "Invalid Credential"
          : "Something went wrong."
      );
      console.log(error.message);
    }
    // Handle your login logic here...
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <GoogleLoginButton />
      </CardContent>
      <CardFooter className="text-sm text-center flex justify-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-primary ml-1 underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
