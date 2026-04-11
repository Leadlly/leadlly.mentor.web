import Image from "next/image";
import Link from "next/link";

import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen text-black flex flex-col">
      <div className="flex items-center justify-center xl:justify-normal py-2 lg:mx-20">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="flex-1 flex items-center px-4 lg:mx-20">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between lg:gap-6 w-full">
          <div className="relative w-[250px] h-[250px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/assets/icons/signuppic.png"
              alt="Login_page_photo"
              fill
              className="object-contain"
            />
          </div>
          <div className="rounded-3xl px-8 lg:px-12 py-10 lg:py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start gap-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl lg:text-4xl font-bold leading-none">
                Create an account
              </h3>
              <p className="text-base lg:text-lg">
                Unlock your potential with expert guidance sign up for
                mentorship today!
              </p>
            </div>

            <SignUpForm />

            <p className="w-full text-center text-base md:text-lg -mt-5">
              Already have an account?{" "}
              <Link href={"/login"} className="text-[#9652f4]">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
