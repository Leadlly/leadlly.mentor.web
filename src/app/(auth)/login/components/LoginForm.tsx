"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";

import GoogleLoginButton from "../../_components/GoogleLoginButton";

const LoginForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);

        router.replace("/Status");
      } else {
        const errorData = await response.json();
        toast.error("Login Failed", {
          description: errorData.message,
        });
      }
    } catch (error: any) {
      console.log(error);

      toast.error("Login Failed", {
        description: error.response
          ? error.response?.data.message
          : error.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="rounded-3xl px-5 sm:px-8 lg:px-12 py-10 lg:py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-2xl lg:text-[52px] font-bold leading-none">
          Welcome
        </h3>
        <p className="text-base lg:text-lg">We are glad to see you with us</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    icon1={<User className="w-5 h-5 opacity-70" />}
                    className="focus-visible:ring-0 border-none text-lg focus:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={togglePassword ? "text" : "password"}
                    placeholder="Create password"
                    icon1={<Lock className="w-5 h-5 opacity-70" />}
                    icon2={
                      <div
                        className="cursor-pointer"
                        onClick={() => setTogglePassword(!togglePassword)}
                      >
                        {togglePassword ? (
                          <EyeOff className="w-5 h-5 opacity-70" />
                        ) : (
                          <Eye className="w-5 h-5 opacity-70" />
                        )}
                      </div>
                    }
                    className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox id="remember-password" />
              <label htmlFor="remember-password" className="mt-1">
                Remember Password
              </label>
            </div>

            <div>
              <Link href={"/forgot-password"} className="text-primary">
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-lg md:text-xl h-12"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <span className="flex items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-2" /> LoggingIn
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <GoogleLoginButton />

      <div className="w-full text-center">
        <p>
          No account yet?{" "}
          <Link href={"/signup"} className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
