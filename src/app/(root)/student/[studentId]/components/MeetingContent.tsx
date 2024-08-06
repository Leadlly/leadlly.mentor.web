import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import ScheduleMeeting from "./ScheduleMeeting";
import { toast } from "sonner";
import { acceptMeeting } from "@/actions/meeting_actions";
import { MeetingDataProps } from "@/helpers/types";
import RescheduleDialogBox from "./RescheduleDialogBox";
import { convertDateString } from "@/helpers/utils";

const MeetingContent = ({
  meetings,
  doneMeetings,
  studentId,
  mentorMeetings
}: {
  meetings: MeetingDataProps[];
  doneMeetings: MeetingDataProps[];
  studentId: string;
  mentorMeetings:MeetingDataProps[]
}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "schedule" | "done">(
    "upcoming"
  );
  const [upcomingSubTab, setUpcomingSubTab] = useState<"Request" | "Your Meetings">("Request");
  const [isAcceptingMeeting, setIsAcceptingMeeting] = useState<string | null>(
    null
  );
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);

  const handleAccept = async (meetingId: string) => {
    setIsAcceptingMeeting(meetingId);
    try {
      const res = await acceptMeeting(meetingId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAcceptingMeeting(null);
    }
  };

  const handleReschedule = (meetingId: string) => {
    setMeetingId(meetingId);
    setOpenRescheduleDialog(true);
  };

  return (
    <div className="p-3">
      <div className="tabs mb-4 flex justify-between">
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "upcoming"
              ? "text-[#56249E]"
              : "text-black hover:border-b-[1px] hover:border-[#56249E]"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Meetings
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "schedule"
              ? "text-[#56249E]"
              : "text-black hover:border-b-[1px] hover:border-[#56249E]"
          }`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule Meeting
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-colors duration-300 ${
            activeTab === "done"
              ? "text-[#56249E]"
              : "text-black hover:border-b-[1px] hover:border-[#56249E]"
          }`}
          onClick={() => setActiveTab("done")}
        >
          Done
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "upcoming" && (
          <>
            <div className="mb-4 justify-center flex space-x-4">
              <button
                className={`px-3 py-2 font-medium transition-colors duration-300 ${
                  upcomingSubTab === "Request"
                    ? "text-[#56249E]"
                    : "text-black hover:text-[#56249E] hover:border-b-[1px] hover:border-[#56249E]"
                }`}
                onClick={() => setUpcomingSubTab("Request")}
              >
                Request
              </button>
              <button
                className={`px-3 py-2 font-medium transition-colors duration-300 ${
                  upcomingSubTab === "Your Meetings"
                    ? "text-[#56249E]"
                    : "text-black hover:text-[#56249E] hover:border-b-[1px] hover:border-[#56249E]"
                }`}
                onClick={() => setUpcomingSubTab("Your Meetings")}
              >
                Your Meetings
              </button>
            </div>

            {upcomingSubTab === "Request" && (
              <div>
                {meetings && meetings.length ? (
                  meetings.map((meeting) => (
                    <MeetingCard
                      key={meeting._id}
                      data={meeting}
                      isAcceptingMeeting={isAcceptingMeeting}
                      onAccept={() => handleAccept(meeting._id)}
                      onReschedule={() => handleReschedule(meeting._id)}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground font-semibold">
                      No Request yet!
                    </p>
                  </div>
                )}
              </div>
            )}

            {upcomingSubTab === "Your Meetings" && (
              <div>
                {mentorMeetings && mentorMeetings.length ? (
                  mentorMeetings.map((meeting) => (
                    <MeetingCard
                      key={meeting._id}
                      data={meeting}
                      isAcceptingMeeting={isAcceptingMeeting}
                      onAccept={() => handleAccept(meeting._id)}
                      onReschedule={() => handleReschedule(meeting._id)}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground font-semibold">
                      No Meetings yet!
                    </p>
                  </div>
                )}
              </div>
            )}

            {openRescheduleDialog && (
              <RescheduleDialogBox
                setOpenRescheduleDialog={setOpenRescheduleDialog}
                meetingId={meetingId}
              />
            )}
          </>
        )}

        {activeTab === "schedule" && <ScheduleMeeting studentId={studentId} />}

        {activeTab === "done" && (
          <div style={{ display: activeTab === "done" ? "block" : "none" }}>
            {doneMeetings && doneMeetings.length ? (
              doneMeetings.map((meeting) => (
                <div key={meeting._id} className="mb-4 mx-4">
                  <h3 className="text-lg font-semibold">{meeting.message}</h3>
                  <p className="text-gray-600">
                    Date:{" "}
                    {meeting.rescheduled && meeting.rescheduled.isRescheduled
                      ? convertDateString(new Date(meeting.rescheduled.date))
                      : convertDateString(new Date(meeting.date))}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-lg text-muted-foreground font-medium">
                <p>No meetings done yet!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingContent;
