import { getUser } from "@/shared/helpers/getUser";
import { Header } from "@/shared/ui/Header";
import { Sidebar } from "@/shared/ui/Sidebar";

export default async function PrivateLayout() {
  const user = await getUser();

  return (
    <div className="h-dvh bg-background-1 md:relative md:py-3">
      <Header userData={user} />
      <Sidebar />
    </div>
  );
}
