import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";

export const CreateProjectButton = () => {
  return (
    <Link
      href={PRIVATE_ROUTES.CreateProject}
      className="fixed w-10 h-10 rounded-full text-3xl bg-primary-1 text-white right-10 bottom-10 transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-primary-2 after::content-[''] after:: "
    >
      +
    </Link>
  );
};
