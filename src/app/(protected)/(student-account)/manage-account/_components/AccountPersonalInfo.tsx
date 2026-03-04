"use client";

import { mentorPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import { CalendarDatePicker } from "@/components/ui/calendar_date_picker";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Globe, Loader2, MailOpen, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AccountPersonalInfoSchema } from "./accountPersonalInfoSchema";

const AccountPersonalInfo = () => {
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const form = useForm<z.infer<typeof AccountPersonalInfoSchema>>({
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      firstName: user?.firstname ? user.firstname : "",
      lastName: user?.lastname ? user.lastname : "",
      class:
        user?.preference.standard && user.preference.standard.length
          ? user.preference.standard
          : [],
      competitiveExams:
        user?.preference.competitiveExam &&
        user.preference.competitiveExam.length
          ? user?.preference.competitiveExam
          : [],
      phone: user?.phone?.personal ? String(user.phone.personal) : "",
      email: user?.email ? user.email : "",
      address: user?.address.addressLine ? user.address.addressLine : "",
      pinCode: user?.address.pincode ? String(user.address.pincode) : "",
      gmeet: user?.gmeet.link ? String(user?.gmeet.link) : "",
      schoolOrCollegeName: user?.academic.schoolOrCollegeName
        ? user.academic.schoolOrCollegeName
        : "",
      degree: user?.academic.degree ? user.academic.degree : "",
      schoolOrCollegeAddress: user?.academic.schoolOrCollegeAddress
        ? user.academic.schoolOrCollegeAddress
        : "",
      gender: user?.about.gender ? user?.about.gender : "",
      country: user?.address.country ? user.address.country : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AccountPersonalInfoSchema>) => {
    const formattedPersonalData = {
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth.from).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "",
      phone: Number(data.phone),
      pinCode: Number(data.pinCode),
    };

    setIsSaving(true);

    try {
      const res = await mentorPersonalInfo({
        ...data,
        ...formattedPersonalData,
      });

      dispatch(userData(res.user));

      toast.success(res.message);
    } catch (error: any) {
      toast.error("Your info submission failed!", {
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const classOptions = [
    { _id: "11", name: "11" },
    { _id: "12", name: "12" },
    { _id: "13", name: "13" },
  ];

  const competitiveExamOptions = [
    { _id: "jee", name: "JEE" },
    { _id: "neet", name: "NEET" },
    { _id: "boards", name: "Boards" },
  ];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-6"
        >
          <div className="flex-1 overflow-y-auto custom__scrollbar space-y-7 px-3">
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          First Name:
                        </FormLabel>
                        <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Last Name:
                        </FormLabel>
                        <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Select your class preference:
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={classOptions}
                          onValueChange={field.onChange}
                          defaultValue={field.value!}
                          variant={"inverted"}
                          animation={2}
                          placeholder="Select your class preference"
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
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Phone No.:
                        </FormLabel>
                        {/* {user.isPhoneVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : ( */}
                        <Button
                          variant={"ghost"}
                          className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent"
                        >
                          Get OTP
                        </Button>
                        {/* )} */}
                      </div>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone no."
                          icon2={<Phone className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          countryCodeClassName="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Email:
                        </FormLabel>
                        {/* {user.isEmailVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : ( */}
                        <Button
                          variant={"ghost"}
                          className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent"
                        >
                          Get OTP
                        </Button>
                        {/* )} */}
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          icon2={<MailOpen className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Gender:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "capitalize text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex flex-col">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Date of Birth:
                      </FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          date={
                            user?.about.dateOfBirth
                              ? { from: new Date(user.about.dateOfBirth) }
                              : field.value
                          }
                          onDateSelect={({ from, to }) => {
                            form.setValue("dateOfBirth", { from, to });
                          }}
                          variant="outline"
                          numberOfMonths={1}
                          className="text-base lg:text-lg font-medium"
                          placeholder="Pick your D.O.B"
                          yearsRange={35}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Other Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Country:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectValue placeholder="Select your country name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Address:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          icon2={<Globe className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        PIN Code:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter PIN Code"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gmeet"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Gmeet:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Google Meet Link"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Academic Information
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
                <FormField
                  control={form.control}
                  name="schoolOrCollegeName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        School/College Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter School/College Name"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolOrCollegeAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        School/College Address:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter School/College Address"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Degree:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Degree"
                          defaultValue={field.value}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="competitiveExams"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Select your competitive exams preference:
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={competitiveExamOptions}
                          onValueChange={field.onChange}
                          defaultValue={field.value!}
                          variant={"inverted"}
                          animation={2}
                          placeholder="Select your competitive exams preference"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full grid place-items-center">
            <Button
              type="submit"
              className="text-base lg:text-lg font-semibold"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Saving
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AccountPersonalInfo;
