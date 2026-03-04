import { redirect } from "next/navigation";

export default async function ClassRootPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  // Redirect to the default report tab
  redirect(`/class/${classId}/report`);
}
