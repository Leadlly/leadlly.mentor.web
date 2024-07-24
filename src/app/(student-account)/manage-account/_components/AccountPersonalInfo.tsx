"use client";
import { mentorPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import { CalendarDatePicker } from "@/components/ui/calendar_date_picker";
import { userData } from "@/redux/slices";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Globe, Loader2, MailOpen, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useAppDispatch,useAppSelector } from "@/redux/hooks";

const AccountPersonalInfoSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email(),
  address: z.string().nullable(),
  pinCode: z.string().nullable(),
  schoolOrCollegeName: z.string().nullable(),
  schoolOrCollegeAddress: z.string().nullable(),
  coachingName: z.string().nullable(),
  coachingAddress: z.string().nullable(),
  gender: z.string().nullable(),
  class: z.string().nullable(),
  studentSchedule: z.string().nullable(),
  country: z.string().nullable(),
  dateOfBirth: z.object({
    from: z.string().nullable(),
  }).nullable(),
});

const AccountPersonalInfo = () => {
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  console.log(user,"this is user")
  const form = useForm();

  const onSubmit = async (data: any) => {

    const formattedPersonalData = {
      class: Number(data.class),
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

    const combinedData = {
      ...data,
      ...formattedPersonalData,
    };
  
    setIsSaving(true);
  
    try {

      const res = await mentorPersonalInfo(combinedData);
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
                          defaultValue={user?.firstName}
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
                          defaultValue={user?.lastName}
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Class:
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
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="11">11th</SelectItem>
                          <SelectItem value="12">12th</SelectItem>
                          <SelectItem value="13">Dropper</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

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
                          defaultValue={user?.phone?.personal}
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
                          defaultValue={user?.email}
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
                        defaultValue={user?.about?.gender}
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
                            user?.about?.dateOfBirth
                              ? { from: new Date(user.about.dateOfBirth) }
                              : field.value
                          }
                          onDateSelect={({ from, to }) => {
                            form.setValue("dateOfBirth", { from, to });
                          }}
                          variant="outline"
                          numberOfMonths={1}
                          className="text-base lg:text-lg font-medium"
                          defaultValue={user?.about?.dateOfBirth}
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
                        defaultValue={user?.address?.country}
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
                          defaultValue={user?.address?.addressLine}
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
                          defaultValue={user?.address?.pincode}
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
                          defaultValue={user?.academic?.schoolOrCollegeName}
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
                          defaultValue={user?.academic?.schoolOrCollegeAddress}
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
