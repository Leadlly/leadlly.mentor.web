"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import LeadllyIcon from "@/components/icons/LeadllyIcon";
import GoogleLoginButton from "../_components/GoogleLoginButton";

import { cn } from "@/lib/utils";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onFormSubmit = (data: z.infer<typeof signInSchema>) => {

    console.log(data);
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="h-main-height text-black relative">
      <div className="lg:mx-20 flex items-center justify-center py-5">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="h-[calc(100%-40px)] flex items-center mx-5 lg:mx-20">
        <div className="lg:flex items-center justify-between gap-6 w-full">
          <div className="rounded-3xl px-12 py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start gap-10">
            <div className="text-center">
            <h3 className="md:text-[52px] text-[24px] font-bold leading-none">Welcome</h3>
              <p className="md:text-lg text-[16px]">We are glad to see you with us</p>
            </div>

            <form
              className="flex flex-col justify-start gap-3"
              onSubmit={handleSubmit(onFormSubmit)}>
              <div>
                <div
                  className={cn(
                    "flex items-center justify-start gap-4 border text-[#7F7F7F] h-12 px-4 rounded-lg",
                    errors.email
                      ? "border-red-500 bg-red-50/40"
                      : "border-[#D9D8D8]"
                  )}>
                  <User />
                  <input
                    className="focus:outline-none h-full w-full bg-transparent"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                </div>
                {errors.email && (
                  <small className="text-xs text-red-500">
                    {errors.email.message}
                  </small>
                )}
              </div>

              <div>
                <div
                  className={cn(
                    "flex items-center justify-start gap-4 border border-[#D9D8D8] text-[#7F7F7F] h-12 px-4 rounded-lg",
                    errors.password
                      ? "border-red-500 bg-red-50/40"
                      : "border-[#D9D8D8]"
                  )}>
                  <Lock />
                  <input
                    className="focus:outline-none h-full w-full bg-transparent"
                    type={togglePassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setTogglePassword(!togglePassword)}>
                    {togglePassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
                {errors.password && (
                  <small className="text-xs text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox className="w-4 h-4 border border-[#9652f4] rounded-[3px] shrink-0" />
                  <label htmlFor="remember-password" className="mt-1 text-[14px] md:text-[20px]">
                    Remember Password
                  </label>
                </div>

                <div>
                  <Link href={"#"} className="text-primar text-[14px] md:text-[20px]">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button type="submit" className="w-full text-[17px] bg-[#9652f4] text-white md:text-xl lg:h-12 py-[6px] rounded-[10px]">
                Login
              </button>

              <div className="w-full">
                <GoogleLoginButton/>
              </div>
              <div className="w-full text-center">
                <p>
                  No account yet?{" "}
                  <Link href={"/signup"} className="text-[#9652f4]">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div>
            <Image
              src="/assets/icons/Loginpic.png"
              alt="Login_page_photo"
              width={500}
              height={500}
              className="object-contain w-46 h-46 md:w-[500px] md:h-[500px]"
            />
          </div>
        </div>
      </div>

      <span className="absolute md:hidden bottom-0 xl:right-0 -z-20 w-full xl:w-80 h-32 sm:h-64 xl:h-full rounded-tl-[40px] rounded-tr-[40px] xl:rounded-tr-none xl:rounded-bl-[40px] bg-[#FCF3FF]"></span>
    </div>
  );
};

export default Login;
