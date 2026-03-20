import StudentLayoutClient from "./components/StudentLayoutClient";

export default async function StudentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  return (
    <StudentLayoutClient studentId={studentId}>
      {children}
    </StudentLayoutClient>
  );
}
