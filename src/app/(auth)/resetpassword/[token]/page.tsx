import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import ResetPasswordForm from "./_components/ResetPasswordForm";

const ResetPasswordPage = () => {
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
          Reset Password
        </h2>
        <p className="text-center font-medium leading-tight -mt-2">
          Choose a new password for your account
        </p>

        <ResetPasswordForm />

        <Link href="/login" className="w-full mt-2">
          <Button variant="outline" className="w-full h-12 text-base">
            Back to Log in
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
