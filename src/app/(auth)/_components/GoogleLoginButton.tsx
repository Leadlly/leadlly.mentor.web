import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import apiClient from "@/apiClient/apiClient";

const GoogleLoginButton = () => {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await apiClient.post("/api/google/auth", {
          access_token: credentialResponse.access_token,
        });

        toast.success("Login success", {
          description: res.data.message,
        });

        router.replace("/");
      } catch (error: any) {
        console.error("Axios error:", error);
        toast.error("Google login failed!", {
          description: error.response?.data?.message || error.message,
        });
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      toast.error("Google login failed!", {
        description: error.message,
      });
    },
  });

  return (
    <Button
      type="button"
      variant={"outline"}
      onClick={() => login()}
      className="w-full font-medium hover:bg-[#e2e8f0] border-[#e2e8f0] rounded-[7px] text-[14px] md:text-[20px] lg:text-xl md:h-12 gap-2">
      <Image
        src="/assets/icons/google-icon.svg"
        alt="Sign in with Google"
        width={17}
        height={17}
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
