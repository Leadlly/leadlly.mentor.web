"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { forgotPassword } from "@/actions/user_actions";
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

const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Invalid email address!" }),
});

const ForgotPasswordForm = () => {
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setIsSending(true);

    try {
      const res = await forgotPassword(data);
      toast.success(res.message);

      router.replace("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
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
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-base lg:text-lg font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="example@mail.com"
                  className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                  inputWrapperClassName="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-base lg:text-lg"
          disabled={isSending}
        >
          {isSending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending
            </span>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
