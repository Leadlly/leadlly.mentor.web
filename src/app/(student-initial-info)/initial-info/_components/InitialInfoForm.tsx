"use client";
import { studentPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const InitialInfoSchema = z.object({
  class: z.string({ required_error: "Please select your class!" }),
  gender: z.string({ required_error: "Please select your gender!" }),
  competitiveExam: z.enum(["NEET", "JEE", "Board", "Other"], {
    message: "Please select your type of exam!",
  }),
  studentSchedule: z.string({ required_error: "Please select your schedule!" }),
  coachingType: z.enum(["online", "offline"], {
    message: "Please select your coaching type!",
  }),
});

const StudentInitialInfoForm = () => {
  const [selectedClasses, setSelectedClasses] = useState<(string | number)[]>([]);
  const [selectedExam, setSelectedExam] = useState<(string)[]>([]);

  const handleSelectChange = (value: string | number) => {
    setSelectedClasses((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleSelectExam = (value: string) => {
    setSelectedExam((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const form = useForm(
    {
      resolver: zodResolver(InitialInfoSchema),
      defaultValues: {
        class: [],
        gender: "",
        competitiveExam: "",
        studentSchedule: "",
        coachingType: "",
      },
    }
  );

  const onFormSubmit = async (data:any) => {
    setIsSubmitting(true);
    console.log(data,"this is data")
    const formattedData = { class: Number(data.class) };
    try {
      const res = await studentPersonalInfo({ ...data, ...formattedData });
      dispatch(userData(res.user));

      toast.success(res.message);

      router.replace("/verify");
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
      <div className="max-w-lg w-full rounded-xl shadow-2xl py-10 px-5 space-y-4">
        <h3 className="text-xl md:text-3xl font-semibold text-center capitalize">
          Let us know about you
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Class:
                  </FormLabel>

                  <Select
                    onValueChange={handleSelectChange}
                    defaultValue="Class"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "text-base lg:text-lg font-medium",
                          selectedClasses.length === 0 && "text-muted-foreground"
                        )}
                      >
                        <SelectValue>
                          {selectedClasses.length === 0
                            ? "Select your class"
                            : `${selectedClasses}`}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="11">11th</SelectItem>
                      <SelectItem value="12">12th</SelectItem>
                      <SelectItem value="Dropout">Dropout</SelectItem>
                    </SelectContent>
                  </Select>
                  
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
              name="competitiveExam"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Select the Preferance
                  </FormLabel>

                  <Select
                    onValueChange={handleSelectExam}
                    defaultValue="Select Prefernce"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "text-base lg:text-lg font-medium",
                          selectedExam.length === 0 && "text-muted-foreground"
                        )}
                      >
                        <SelectValue>
                          {selectedExam.length === 0
                            ? "Select your Prefernce"
                            : `${selectedExam}`}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="neet">NEET</SelectItem>
                      <SelectItem value="jee">JEE</SelectItem>
                      <SelectItem value="boards">Boards</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                className="w-full text-base md:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default StudentInitialInfoForm;
