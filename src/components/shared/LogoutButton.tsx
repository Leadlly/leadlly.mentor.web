"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices";

import { Button } from "../ui/button";

const LogoutButton = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const responseData = await response.json();

      toast.success(responseData.message);
      dispatch(userData(null));
      router.push("/login");
    } catch (error: any) {
      console.log(error);

      toast.error("Logout Failed!", {
        description: error?.message,
      });
    }
  };
  return (
    <Button
      onClick={logoutHandler}
      variant={"outline"}
      className="w-full h-11 items-center gap-2 text-primary hover:text-primary hover:bg-primary/10 border-primary rounded-full xl:rounded-xl text-base md:text-lg font-normal py-3 px-2 md:px-4"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
