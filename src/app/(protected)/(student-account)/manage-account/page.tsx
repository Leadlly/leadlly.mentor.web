import { ArrowLeft } from "lucide-react";
import AccountPersonalInfo from "./_components/AccountPersonalInfo";
import Link from "next/link";
import LogoutButton from "@/components/shared/LogoutButton";
import AccountUserProfile from "./_components/AccountUserProfile";
import AccountTabs from "./_components/AccountTabs";

const ManageAccount = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeManageAccountTab = searchParams["tab"] ?? "personal-info";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-6 px-4 pt-2">
        <Link
          href={"/"}
          className="border rounded-md w-8 h-8 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h3 className="text-2xl font-semibold">Manage Account</h3>
      </div>

      <section className="my-6 bg-primary/15 text-center lg:text-left lg:px-16 py-4 lg:py-8 flex flex-col lg:flex-row items-center justify-between">
        <AccountUserProfile />

        <div className="flex items-center gap-10 mt-5">
          <LogoutButton />
        </div>
      </section>

      <div className="border-b-2 px-2 lg:px-16">
        <AccountTabs activeManageAccountTab={activeManageAccountTab} />
      </div>

      <div className="flex-1 px-2 lg:px-16 py-6">
        {activeManageAccountTab === "personal-info" && (
          <>
            <AccountPersonalInfo />
          </>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
