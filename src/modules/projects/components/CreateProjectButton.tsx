"use client";

import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { usePathname } from "next/navigation";

export const CreateProjectButton = () => {
  const pathname = usePathname();

  if (pathname !== PRIVATE_ROUTES.Projects) return;

  return (
    <Link
      href={PRIVATE_ROUTES.CreateProject}
      className="fixed flex justify-center items-center w-12 h-12 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full text-4xl md:text-3xl 2xl:text-4xl bg-primary-1 text-white right-4 md:right-10 bottom-20 md:bottom-10 transition-all duration-150 ease-in-out hover:cursor-pointer hover:bg-primary-2"
    >
      <p>+</p>
    </Link>
  );
};
