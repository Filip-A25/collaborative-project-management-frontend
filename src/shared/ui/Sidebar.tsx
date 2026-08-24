"use client";

import Link from "next/link";
import { PRIVATE_ROUTES } from "@/const/Routes";
import { sidebarItems } from "@/modules/projects/const/sidebarItems";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/modules/auth/authStore";
import { useEffect } from "react";
import { Logout } from "@mui/icons-material";
import { useAuth } from "@/modules/auth/hooks/useAuth";

interface Props {
  userData?: User;
}

export const Sidebar = ({ userData }: Props) => {
  const pathname = usePathname();

  const setUser = useAuthStore((store) => store.setUser);
  const user = useAuthStore((store) => store.user);

  const { onLogout } = useAuth();

  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    }
  }, [user, setUser, userData]);

  return (
    <aside className="bg-background-2 hidden h-[96vh] md:block md:left-4 md:w-56! md:rounded-lg border-2 border-gray-100">
      <nav className="md:flex md:flex-col md:flex-1 md:px-4 md:my-5">
        <Link href={PRIVATE_ROUTES.Projects}>
          <p className="w-full h-full text-primary-dark-1 bg-gray-50 border border-gray-100 md:px-3 md:py-1 md:rounded-md md:text-md md:font-semibold hover:bg-gray-100 transition-colors duration-150">
            CollabPM
          </p>
        </Link>
        <ul className="md:mt-10 md:flex md:flex-col md:gap-3">
          {sidebarItems.map((item) => {
            const isRouteActive = pathname === item.url;

            return (
              <li
                key={item.name}
                className={clsx(
                  "group rounded-md w-full",
                  isRouteActive && "bg-primary-2/10 ",
                )}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-2 md:px-3 md:py-2"
                >
                  <item.icon
                    className={clsx(
                      "md:w-4! md:h-4! text-primary-dark-1 group-hover:text-primary-1 transition-all! duration-200!",
                      isRouteActive && "text-primary-1!",
                    )}
                  />
                  <p
                    className={clsx(
                      "text-sm text-primary-dark-1 group-hover:text-primary-1 transition-all duration-200",
                      isRouteActive && "text-primary-1!",
                    )}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 md:px-3 md:py-2 md:ml-4 cursor-pointer group mt-auto"
      >
        <Logout
          fontSize="small"
          className="md:w-4! md:h-4! text-primary-dark-1 group-hover:text-red-600 transition-all! duration-200!"
        />
        <p className="text-sm text-primary-dark-1 group-hover:text-red-600 transition-all duration-200 ease-in-out">
          Logout
        </p>
      </button>
    </aside>
  );
};
