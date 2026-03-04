"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { resetPassword } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ResetPasswordSchema = z.object({
  password: z.string({ error: "Please enter your new password." }),
  confirmPassword: z.string({
    error: "Please confirm your password!",
  }),
});

const ResetPasswordForm = () => {
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const params = useParams<{ token: string }>();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const onFormSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsResettingPassword(true);

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      setIsResettingPassword(false);
      return;
    }

    try {
      const res = await resetPassword(
        { password: data.password },
        params.token
      );
      toast.success(res.message);

      router.replace("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsResettingPassword(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="w-full space-y-4 mt-5"
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base lg:text-lg font-medium">
                New Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                  inputWrapperClassName="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base lg:text-lg font-medium">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                  inputWrapperClassName="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {passwordError ? (
          <p className="text-sm text-red-500 font-medium leading-tight -mt-1">
            {passwordError}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full h-12 text-base lg:text-lg"
          disabled={isResettingPassword}
        >
          {isResettingPassword ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
