"use client";

import { sidebarItems } from "@/modules/projects/const/sidebarItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex bg-white fixed bottom-0 py-3 border-t border-t-muted-1/20 md:hidden">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isRouteActive = pathname === item.url;

        return (
          <Link
            key={item.name}
            href={item.url}
            className="w-1/2 flex flex-col items-center"
          >
            <Icon
              className={clsx(
                "text-muted-1",
                isRouteActive && "text-primary-1",
              )}
            />
            <p
              className={clsx(
                "text-sm text-muted-1",
                isRouteActive && "text-primary-1",
              )}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};
