import { Studentinfo } from "@/actions/user_actions";
import { formatStandardLabel } from "@/helpers/constants/academic";

import ProfileComponent from "./components/Profilecomponent";

type Params = {
  params: Promise<{ studentId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ params, searchParams }: Params) => {
  const { studentId } = await params;
  const resolvedSearchParams = await searchParams;

  const data = await Studentinfo(studentId);

  const structuredData = [
    {
      title: "Basic Information",
      items: [
        { label: "First Name", value: data.student.firstname },
        { label: "Last Name", value: data.student.lastname },
        { label: "Date of Birth", value: data.student.about.dateOfBirth },
        { label: "Email", value: data.student.email },
        { label: "Class", value: formatStandardLabel(data.student.academic.standard) },
        { label: "Gender", value: data.student.about.gender },
        { label: "Phone", value: data.student.phone.personal },
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

  return (
    <div>
      <ProfileComponent
        studentId={studentId}
        sections={structuredData}
        activeTab={(resolvedSearchParams["info"] as string) ?? "personal info"}
      />
    </div>
  );
};

export default Page;
