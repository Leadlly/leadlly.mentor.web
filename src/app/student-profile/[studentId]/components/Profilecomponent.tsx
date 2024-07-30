"use client";

import Avatar from "@/components/shared/Avatar";
import ProfileTab from "./Profiletab";
import Head from "./Head";
import PersonalInfo from "./PersonalInfo";
import { Studentinfo } from "@/actions/user_actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Params = {
  params: {
    studentId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ProfileComponent = ({ params: { studentId }, searchParams }: Params) => {
  const [studentdata, setStudentData] = useState<any[]>([]);
  const [nameStd, setnamestd] = useState<any[]>([]);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await Studentinfo(studentId);

        const structuredData = [
          {
            title: "Basic Information",
            items: [
              { label: "First Name", value: data.student.firstname },
              { label: "Last Name", value: data.student.lastname },
              { label: "Date of Birth", value: data.student.about.dateOfBirth },
              { label: "Email", value: data.student.email },
              { label: "Class", value: data.student.academic.standard },
              { label: "Gender", value: data.student.about.gender },
            ],
          },
          {
            title: "Other Information",
            items: [
              {
                label: "Parent Name (Or Guardian)",
                value: data.student.parent.name,
              },
              { label: "Parents Phone No.", value: data.student.parent.phone },
              { label: "Address", value: data.student.address.addressLine },
              { label: "PIN Code", value: data.student.address.pincode },
              { label: "Country", value: data.student.address.country },
            ],
          },
          {
            title: "Academic Information",
            items: [
              {
                label: "Competitive Exam",
                value: data.student.academic.competitiveExam,
              },
              { label: "Schedule", value: data.student.academic.schedule },
              {
                label: "School/College Name",
                value: data.student.academic.schoolOrCollegeName,
              },
              {
                label: "School/College Address",
                value: data.student.academic.schoolOrCollegeAddress,
              },
            ],
          },
        ];

        setStudentData(structuredData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getStudentData();
  }, [studentId]);

  const activeTab = searchParams["info"] ?? "personal info";

  return (
    <main>
      <div className="">
        <Head />
      </div>
      <div className="bg-[#9654F426] flex items-center py-5 lg:gap-7 px-10 lg:my-7">
        <div className="lg:block hidden">
          <Avatar alt="e" size={100} />
        </div>
        <div className="lg:hidden flex justify-start gap-[7px]">
          <Avatar alt="e" size={65} />
          <div>
            {studentdata.map((section, index) => (
              <div key={index}>
                {section.items.map((item: any, itemIndex: any) =>
                  item.label === "First Name" ? (
                    <h2
                      key={itemIndex}
                      className="text-[#5F5F5F] text-2xl font-semibold"
                    >
                      {item.value}
                    </h2>
                  ) : item.label === "Class" ? (
                    <h3
                      key={itemIndex}
                      className="text-[#989898] text-lg font-semibold"
                    >{`Class: ${item.value}`}</h3>
                  ) : null
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:block hidden">
          {studentdata.map((section, index) => (
            <div key={index}>
              {section.items.map((item: any, itemIndex: any) =>
                item.label === "First Name" ? (
                  <h2
                    key={itemIndex}
                    className="text-[#5F5F5F] text-2xl font-semibold"
                  >
                    {item.value}
                  </h2>
                ) : item.label === "Class" ? (
                  <h3
                    key={itemIndex}
                    className="text-[#989898] text-lg font-semibold"
                  >{`Class: ${item.value}`}</h3>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-b-2 mt-[14px] lg:mt-0 border-b-[#F1F1F1]">
        <ProfileTab studentId={studentId} activeTab={activeTab} />
      </div>
      <div className="mt-10 min-h-[50vh] max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-500px)] overflow-y-scroll custom__scrollbar pt-0 p-3 mb-16 md:mb-0">
        {activeTab === "personal info" && (
          <PersonalInfo sections={studentdata} />
        )}
      </div>
    </main>
  );
};

export default ProfileComponent;
