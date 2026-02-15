import { Container } from "@/components";
import Navbar from "@/components/shared/Navbar";

export default function StudentProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="lg:hidden">
        <Navbar />
      </div>
      <div className="max-w-7xl w-full mx-auto flex items-start gap-3 px-0 flex-col h-screen overflow-hidden">
        <Container className="py-3 flex items-start gap-3 flex-col h-screen overflow-hidden">
          {/* h-screen overflow-hidden */}
          <div className="flex-1 h-main-height w-full">{children}</div>
        </Container>
      </div>
    </>
  );
}
