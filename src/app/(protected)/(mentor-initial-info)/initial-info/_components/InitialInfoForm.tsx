"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader } from "lucide-react";
import { toast } from "sonner";

import { joinInstitute } from "@/actions/user_actions";
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
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices";

const InstituteCodeSchema = z.object({
  instituteCode: z
    .string({ message: "Please enter your institute code!" })
    .min(1, "Please enter your institute code!")
    .trim(),
});

const InitialInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof InstituteCodeSchema>>({
    resolver: zodResolver(InstituteCodeSchema),
    defaultValues: {
      instituteCode: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof InstituteCodeSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await joinInstitute(data.instituteCode);
      dispatch(userData(res.user));

      toast.success(res.message);
      router.replace("/Status");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-y-5 items-center justify-center h-full w-full px-3">
      <div className="max-w-lg w-full">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly Logo"
          width={130}
          height={60}
        />
      </div>
      <div className="max-w-lg w-full rounded-xl shadow-2xl py-10 px-5 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl md:text-3xl font-semibold capitalize">
            Join Your Institute
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter the institute code provided by your admin to get started
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="instituteCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Institute Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your institute code"
                      className="h-12 text-base uppercase tracking-widest font-mono"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center w-full pt-2">
              <Button
                type="submit"
                className="w-full text-base md:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader className="mr-2 w-5 h-5 animate-spin" />
                    Joining...
                  </span>
                ) : (
                  "Join Institute"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default InitialInfoForm;
