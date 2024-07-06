import Avatar from "@/components/shared/Avatar";
import ProfileTab from "./components/Profiletab";
import Head from "./components/Head";
import PersonalInfo from "./components/PersonalInfo";

type Params = {
  params: {
    studentId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};
const infoSections = [
  {
    title: "Basic Information",
    items: [
      { label: "First Name", value: "John" },
      { label: "Last Name", value: "Reeve" },
      { label: "Date of Birth", value: "12-02-2002" },
      { label: "Email", value: "reevejohnmusk@gmail.com" },
      { label: "Class", value: "9th" },
      { label: "Gender", value: "Male" },
    ],
  },
  {
    title: "Other Information",
    items: [
      { label: "Parent Name (Or Guardian)", value: "Jane Doe" },
      { label: "Parents Phone No.", value: "123-456-7890" },
      { label: "Address", value: "123 Main St, Anytown" },
      { label: "PIN Code", value: "123456" },
      { label: "Country", value: "USA" },
    ],
  },
  {
    title: "Academic Information",
    items: [
      { label: "Competitive Exam", value: "NEET" },
      { label: "Schedule", value: "Coaching" },
      { label: "School/College Name", value: "Anytown High School" },
      { label: "School/College Address", value: "456 College St, Anytown" },
    ],
  },
  {
    title: "Basic Information",
    items: [
      { label: "First Name", value: "John" },
      { label: "Last Name", value: "Reeve" },
      { label: "Date of Birth", value: "12-02-2002" },
      { label: "Email", value: "reevejohnmusk@gmail.com" },
      { label: "Class", value: "9th" },
      { label: "Gender", value: "Male" },
    ],
  },
  {
    title: "Other Information",
    items: [
      { label: "Parent Name (Or Guardian)", value: "Jane Doe" },
      { label: "Parents Phone No.", value: "123-456-7890" },
      { label: "Address", value: "123 Main St, Anytown" },
      { label: "PIN Code", value: "123456" },
      { label: "Country", value: "USA" },
    ],
  },
  {
    title: "Academic Information",
    items: [
      { label: "Competitive Exam", value: "NEET" },
      { label: "Schedule", value: "Coaching" },
      { label: "School/College Name", value: "Anytown High School" },
      { label: "School/College Address", value: "456 College St, Anytown" },
    ],
  },
  {
    title: "Basic Information",
    items: [
      { label: "First Name", value: "John" },
      { label: "Last Name", value: "Reeve" },
      { label: "Date of Birth", value: "12-02-2002" },
      { label: "Email", value: "reevejohnmusk@gmail.com" },
      { label: "Class", value: "9th" },
      { label: "Gender", value: "Male" },
    ],
  },
  {
    title: "Other Information",
    items: [
      { label: "Parent Name (Or Guardian)", value: "Jane Doe" },
      { label: "Parents Phone No.", value: "123-456-7890" },
      { label: "Address", value: "123 Main St, Anytown" },
      { label: "PIN Code", value: "123456" },
      { label: "Country", value: "USA" },
    ],
  },
  {
    title: "Academic Information",
    items: [
      { label: "Competitive Exam", value: "NEET" },
      { label: "Schedule", value: "Coaching" },
      { label: "School/College Name", value: "Anytown High School" },
      { label: "School/College Address", value: "456 College St, Anytown" },
    ],
  },
];
const page = ({ params: { studentId }, searchParams }: Params) => {
  const activeTab = searchParams["info"] ?? "personal info";
  return (
    <main>
      <div className="bg-[#9654F426] flex items-center py-5 gap-7 px-10 lg:my-7">
      <Head />
        <div className="lg:block hidden">
          <Avatar alt="e" size={125} />
        </div>
        <div className="lg:hidden">
          <Avatar alt="e" size={56} />
        </div>
        <div>
          <h2 className="text-[#5F5F5F] text-2xl font-semibold">Mary</h2>
          <h3 className="text-[#989898] text-lg font-semibold">class: 9th</h3>
        </div>
      </div>
      <div className="border-b-2 border-b-[#F1F1F1]">
        <ProfileTab studentId={studentId} activeTab={activeTab} />
      </div>
      <div className=" mt-10 min-h-[50vh]  max-h-[calc(100vh-500px)] overflow-y-scroll custom__scrollbar pt-0 p-3 mb-16 md:mb-0">
        {activeTab == "personal info" && (
          <PersonalInfo sections={infoSections} />
        )}
      </div>
    </main>
  );
};
export default page;
