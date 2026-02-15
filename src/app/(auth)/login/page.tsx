import Image from "next/image";

import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="h-main-height text-black relative">
      <div className="flex items-center justify-center xl:justify-normal py-2 lg:mx-24">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="h-[calc(100%-56px)] flex items-center px-4 lg:mx-20">
        <div className="flex flex-col xl:flex-row items-center justify-between lg:gap-6 w-full">
          <LoginForm />

          <div className="relative w-56 h-56 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px]">
            <Image
              src="/assets/icons/Loginpic.png"
              alt="Login_page_photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <span className="absolute bottom-0 xl:right-0 -z-20 w-full xl:w-80 h-32 sm:h-64 xl:h-full rounded-tl-[40px] rounded-tr-[40px] xl:rounded-tr-none xl:rounded-bl-[40px] bg-[#FCF3FF]"></span>
    </div>
  );
};

export default Login;
