import { getUser } from "@/shared/helpers/getUser";
import { Sidebar } from "@/shared/ui/Sidebar";
import { ReactNode } from "react";
import { MobileBar } from "@/shared/ui/MobileBar";
import { MobileNav } from "@/shared/ui/MobileNav";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="relative h-dvh bg-background-1 md:py-3 md:pl-5 md:gap-8 md:flex">
      <Sidebar userData={user} />
      <MobileBar />
      <div className="flex flex-col md:w-[75%]">{children}</div>
      <MobileNav />
    </div>
  );
}
