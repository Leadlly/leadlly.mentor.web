import { getUser, mentorPersonalInfo } from "@/actions/user_actions";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const GMeetLinkFormSchema = z.object({
  gmeet: z
    .string({ required_error: "Please enter a valid google meet link!" })
    .url({ message: "Invalid google meet link" }),
});

const GMeetInputLinkModal = ({
  setOpenGMeetLinkInputModal,
}: {
  setOpenGMeetLinkInputModal: (openGMeetLinkInputModal: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof GMeetLinkFormSchema>>({
    resolver: zodResolver(GMeetLinkFormSchema),
  });

  const onLinkSubmit = async (data: z.infer<typeof GMeetLinkFormSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await mentorPersonalInfo(data);

      if (res.success && res.success === false) {
        return toast.error("Saving gmeet link failed!", {
          description: res.message,
        });
      }
      const userInfo = await getUser();

      dispatch(userData(userInfo.user));
      toast.success(res.message);
      setOpenGMeetLinkInputModal(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal setOpenDialogBox={setOpenGMeetLinkInputModal} className="max-w-lg">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl leading-tight font-medium">
          Submit your google meet link
        </h3>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => setOpenGMeetLinkInputModal(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onLinkSubmit)}>
          <FormField
            control={form.control}
            name="gmeet"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between w-full">
                  <FormLabel>Google Meet Link</FormLabel>
                  <Link
                    href={"https://meet.google.com/landing"}
                    target="_blank"
                    className="underline text-primary text-base font-medium leading-tight"
                  >
                    Create Meeting Link
                  </Link>
                </div>
                <Input placeholder="Enter the google meet link" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Submit Link"
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default GMeetInputLinkModal;
