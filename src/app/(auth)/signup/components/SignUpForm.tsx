"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key, Loader2, Mail, User, School } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { signUpUser } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/signUpSchema";

const SignUpForm = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "teacher",
    },
  });

  const selectedRole = form.watch("role");

  const onFormSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const responseData = await signUpUser(data);

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("email", data.email);
        router.replace("/verify");
      } else {
        toast.error(responseData.message);
      }
    } catch (error: any) {
      toast.error("Error registering user.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  icon1={<User className="w-5 h-5 opacity-70" />}
                  className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  icon1={<Mail className="w-5 h-5 opacity-70" />}
                  className="focus-visible:ring-0 text-lg focus:ring-offset-0"
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
                  icon1={<Key className="w-5 h-5 opacity-70" />}
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="teacher" />
                    </FormControl>
                    <Label className="font-normal text-lg cursor-pointer">
                      Teacher
                    </Label>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentor" />
                    </FormControl>
                    <Label className="font-normal text-lg cursor-pointer">
                      Mentor
                    </Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedRole === "teacher" && (
          <FormField
            control={form.control}
            name="instituteCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Institute Code"
                    icon1={<School className="w-5 h-5 opacity-70" />}
                    className="focus-visible:ring-0 text-lg focus:ring-offset-0 uppercase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full text-[17px] bg-[#9652f4] hover:bg-[#9652f4]/80 text-white md:text-xl lg:h-12 py-[6px] rounded-[10px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Signing Up
            </span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
