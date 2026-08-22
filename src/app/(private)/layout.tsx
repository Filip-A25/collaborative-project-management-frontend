import { getUser } from "@/modules/account/queries/getUser";
import { Sidebar } from "@/shared/ui/Sidebar";
import { ReactNode } from "react";
import { MobileBar } from "@/shared/ui/MobileBar";
import { MobileNav } from "@/shared/ui/MobileNav";
import { CreateProjectButton } from "@/modules/projects/components/CreateProjectButton";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const response = await getUser();

  return (
    <div className="min-h-dvh bg-background-1 md:pt-3 md:pb-20 md:pl-5 md:gap-4 md:flex">
      <Sidebar userData={response.data} />
      <MobileBar />
      <div className="flex flex-col md:w-[82.5%]">{children}</div>
      <MobileNav />
      <CreateProjectButton />
    </div>
  );
}
