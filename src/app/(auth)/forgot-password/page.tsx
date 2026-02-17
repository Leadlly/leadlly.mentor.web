import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import ForgotPasswordForm from "./_components/ForgotPasswordFrom";

const ForgotPasswordPage = () => {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg w-full rounded-xl shadow-2xl flex flex-col items-center justify-center gap-y-2 p-10">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly Logo"
          width={130}
          height={130}
        />

        <h2 className="text-2xl lg:text-5xl font-bold mt-5 mb-3">
          Forgot Password
        </h2>
        <p className="text-center font-medium leading-tight">
          Enter the email you used to create your account so we can send you a
          link for resetting your password
        </p>

        <ForgotPasswordForm />

        <Link href="/login" className="w-full mt-2">
          <Button variant="outline" className="w-full h-12 text-base">
            Back to Log in
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
