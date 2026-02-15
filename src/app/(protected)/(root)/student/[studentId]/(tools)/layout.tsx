import MessageBox from "@/components/shared/MessageBox";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MessageBox />
      <div className="h-main-height w-full">{children}</div>
    </>
  );
}
