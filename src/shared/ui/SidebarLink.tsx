import Link from "next/link";

import { SvgIconComponent } from "@mui/icons-material";
import clsx from "clsx";

interface Props {
  name: string;
  url: string;
  icon: SvgIconComponent;
  isRouteActive?: boolean;
}

export const SidebarLink = ({
  name,
  url,
  icon: Icon,
  isRouteActive,
}: Props) => {
  return (
    <li
      key={name}
      className={clsx("group rounded-md", isRouteActive && "bg-primary-2/10 ")}
    >
      <Link href={url} className="flex items-center gap-2 md:px-3 md:py-2">
        <Icon
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
          {name}
        </p>
      </Link>
    </li>
  );
};
