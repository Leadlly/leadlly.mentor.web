"use client";

import { mentorPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const InitialInfoSchema = z.object({
  class: z.array(z.string({ required_error: "Please select your class!" })).nonempty(),
  gender: z.string({ required_error: "Please select your gender!" }),
  competitiveExams: z.array(z.string({ required_error: "Please select your competitive exams!" })).nonempty(),
});

const StudentInitialInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof InitialInfoSchema>>({
    resolver: zodResolver(InitialInfoSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof InitialInfoSchema>) => {
    setIsSubmitting(true);

    const formattedData = { class: data.class, competitiveExams: data.competitiveExams };
    try {
      const res = await mentorPersonalInfo({ ...data, ...formattedData });
      dispatch(userData(res.user));

      toast.success(res.message);
      router.replace("/Status");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
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
                    Select your class preference:
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={classOptions}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      defaultValue={field.value}
                      variant={"inverted"}
                      animation={2}
                      placeholder="Select your competitive exams preference"
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
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-5"
                    >
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="male"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="female"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Female
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="other"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Other
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
                    <Loader className="mr-2 w-5 h-5 animate-spin" />
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
