"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader2 } from "lucide-react";
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
import { IInstituteMembership } from "@/helpers/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices";

const JoinInstituteSchema = z.object({
  instituteCode: z
    .string({ message: "Please enter an institute code" })
    .min(1, "Please enter an institute code")
    .trim(),
});

const JoinAnotherInstitute = () => {
  const [isJoining, setIsJoining] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const memberships: IInstituteMembership[] = user?.institutes?.length
    ? user.institutes
    : user?.institute?._id
      ? [
          {
            _id: user.institute._id,
            name: user.institute.name,
            status: "active",
          },
        ]
      : [];

  const form = useForm<z.infer<typeof JoinInstituteSchema>>({
    resolver: zodResolver(JoinInstituteSchema),
    defaultValues: {
      instituteCode: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof JoinInstituteSchema>) => {
    setIsJoining(true);

    try {
      const res = await joinInstitute(data.instituteCode);
      if (res.user) {
        dispatch(userData(user ? { ...user, ...res.user } : res.user));
      }
      toast.success(res.message || "Joined institute successfully");
      form.reset({ instituteCode: "" });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to join institute"
      );
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-900">Institutes</h3>
        <p className="text-sm text-gray-500">
          You can teach at more than one institute. Enter another code to join.
        </p>
      </div>

      {memberships.length > 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white divide-y divide-gray-100">
          {memberships.map((membership) => (
            <div
              key={membership._id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {membership.name || "Institute"}
                </p>
                {membership.instituteCode ? (
                  <p className="text-xs text-gray-400 font-mono tracking-wide">
                    {membership.instituteCode}
                  </p>
                ) : null}
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  membership.status === "blocked"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {membership.status === "blocked" ? "Blocked" : "Active"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">No institutes joined yet.</p>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="instituteCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Join another institute
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter institute code"
                      icon2={<Building2 className="w-4 h-4 text-gray-400" />}
                      className="text-sm font-medium uppercase tracking-widest"
                      inputWrapperClassName="h-12 rounded-lg"
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
            <Button
              type="submit"
              className="w-full h-11 rounded-lg text-sm font-semibold"
              disabled={isJoining}
            >
              {isJoining ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Joining...
                </span>
              ) : (
                "Join institute"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JoinAnotherInstitute;
