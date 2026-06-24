import { getUser } from "@/shared/helpers/getUser";
import { Sidebar } from "@/shared/ui/Sidebar";
import { ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="h-dvh bg-background-1 md:py-3 md:pl-5 md:gap-8 md:flex">
      <Sidebar userData={user} />
      <div className="flex flex-col md:w-[75%]">{children}</div>
    </div>
  );
}
