import MobileMenu from "@/components/shared/MobileMenu";
import Sidebar from "@/components/shared/Sidebar";

export default async function StudentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  return (
    <>
      <section>
        <div className={"flex text-black h-full relative"}>
          <div className="no-scrollbar h-[calc(100dvh-120px)] md:block hidden">
            <Sidebar id={studentId} />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </section>

      <section className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.1)] overflow-hidden">
        <MobileMenu id={studentId} />
      </section>
    </>
  );
}
