import { getUser } from "@/shared/helpers/getUser";
import { Header } from "@/shared/ui/Header";
import { Sidebar } from "@/shared/ui/Sidebar";

export default async function PrivateLayout() {
  const user = await getUser();

  return (
    <>
      <Header userData={user} />
      <Sidebar />
    </>
  );
}
