"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Loader2, Phone, User } from "lucide-react";
import { toast } from "sonner";

import { updateTeacherProfile } from "@/actions/user_actions";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { SUBJECT_OPTIONS } from "@/helpers/constants/academic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices";

import JoinAnotherInstitute from "./join-another-institute";

const subjectSelectOptions = SUBJECT_OPTIONS.map((subject) => ({
  _id: subject,
  name: subject,
}));

const TeacherProfileSchema = z.object({
  name: z.string().trim().optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(10, "Phone number must be at most 10 digits")
    .regex(/^\d*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subjects: z.array(z.string()).optional(),
  teacherCode: z.string().trim().optional().or(z.literal("")),
});

const getPhoneValue = (phone?: { personal?: string | number | null }) =>
  phone?.personal != null && phone.personal !== ""
    ? String(phone.personal)
    : "";

const TeacherProfileForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.user.user);
  const isSetup = searchParams.get("setup") === "1";

  const existingName = [user?.firstname, user?.lastname]
    .filter(Boolean)
    .join(" ");

  const form = useForm<z.infer<typeof TeacherProfileSchema>>({
    resolver: zodResolver(TeacherProfileSchema),
    defaultValues: {
      name: existingName,
      phone: getPhoneValue(user?.phone),
      subjects: user?.subjects ?? [],
      teacherCode: user?.teacherCode ?? "",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      name: [user.firstname, user.lastname].filter(Boolean).join(" "),
      phone: getPhoneValue(user.phone),
      subjects: user.subjects ?? [],
      teacherCode: user.teacherCode ?? "",
    });
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof TeacherProfileSchema>) => {
    setIsSaving(true);

    try {
      const payload: {
        name?: string;
        phone?: string;
        subjects?: string[];
        teacherCode?: string;
      } = {};

      if (data.name?.trim()) payload.name = data.name.trim();
      payload.phone = data.phone?.trim() ?? "";
      payload.subjects = data.subjects ?? [];
      if (data.teacherCode !== undefined) {
        payload.teacherCode = data.teacherCode.trim();
      }

      const res = await updateTeacherProfile(payload);

      if (res.user && user) {
        dispatch(
          userData({
            ...user,
            firstname: res.user.firstname ?? user.firstname,
            lastname:
              res.user.lastname !== undefined
                ? res.user.lastname
                : user.lastname,
            phone: res.user.phone ?? user.phone,
            subjects: res.user.subjects ?? user.subjects,
            teacherCode:
              res.user.teacherCode !== undefined
                ? res.user.teacherCode
                : user.teacherCode,
          })
        );
      }

      toast.success(res.message || "Profile updated successfully");

      if (isSetup) {
        router.replace("/teacher");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-6 space-y-1">
        {isSetup ? (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Add your profile info
            </h2>
            <p className="text-sm text-gray-500">
              These fields are optional. You can skip now and update them later
              from your profile.
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Update your name, phone number, subjects, and teacher code. All
            fields are optional.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Name
                    <span className="ml-1.5 font-normal text-gray-400">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      icon2={<User className="w-4 h-4 text-gray-400" />}
                      className="text-sm font-medium"
                      inputWrapperClassName="h-12 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Phone number
                    <span className="ml-1.5 font-normal text-gray-400">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Enter your phone number"
                      icon2={<Phone className="w-4 h-4 text-gray-400" />}
                      className="text-sm font-medium"
                      inputWrapperClassName="h-12 rounded-lg"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Subjects
                    <span className="ml-1.5 font-normal text-gray-400">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={subjectSelectOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? []}
                      placeholder="Select subjects"
                      variant="inverted"
                      animation={0}
                      maxCount={3}
                      className="min-h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacherCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Teacher code
                    <span className="ml-1.5 font-normal text-gray-400">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your teacher code"
                      icon2={<Hash className="w-4 h-4 text-gray-400" />}
                      className="text-sm font-medium uppercase tracking-wider"
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

            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 pt-2">
              {isSetup && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto h-11 px-6 rounded-lg"
                  onClick={() => router.replace("/teacher")}
                  disabled={isSaving}
                >
                  Skip for now
                </Button>
              )}
              <Button
                type="submit"
                className="w-full sm:flex-1 h-11 rounded-lg text-sm font-semibold"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </span>
                ) : isSetup ? (
                  "Save and continue"
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {!isSetup ? <JoinAnotherInstitute /> : null}
    </div>
  );
};

export default TeacherProfileForm;
