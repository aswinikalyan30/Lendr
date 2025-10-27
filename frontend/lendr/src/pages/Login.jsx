"use client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { useGoogleLogin } from '@react-oauth/google';
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { userlogin } from "../service/users";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log('Login Success:', codeResponse);
            setFormData(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await userlogin(formData);

      if (!data) {
        throw new Error("Login failed");
      }

      // Store token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate based on role
      const role = data.user.role.toLowerCase();
      navigate(`/${role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex rows-auto mb-4 mt-8 justify-center">
    <img
      src="/src/assets/image.png"
      alt="Login Illustration"
      style={{ width: '50%'}}
    />
        <div
        className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Welcome to Lendr
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Login to Lendr to borrow equipment easily.
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              placeholder="projectmayhem@fc.com" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              placeholder="••••••••" 
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            </LabelInputContainer>

            <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
            type="submit"
            disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
            <BottomGradient />
            </button>

            <div
            className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

            <div className="flex flex-col space-y-4">
            <button
                className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-100 px-4 font-medium text-black dark:bg-white-900"
                type="button"
                onClick={() => login()}>
                <IconBrandGoogle className="h-4 w-4 " />
                <span className="text-sm">
                Sign in with Google
                </span>
                <BottomGradient />
            </button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup">
                Sign up
              </Link>
            </p>
            </div>
        </form>
        </div>
    </div>
    </>

  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
