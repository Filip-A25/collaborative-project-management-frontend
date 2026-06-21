import { PRIVATE_ROUTES } from "@/const/Routes";
import { SidebarItem } from "@/modules/auth/types/sidebar";
import { Layers, Person } from "@mui/icons-material";

export const sidebarItems: SidebarItem[] = [
  {
    name: "Projects",
    url: PRIVATE_ROUTES.Projects,
    icon: Layers,
  },
  {
    name: "Account Details",
    url: PRIVATE_ROUTES.AccountDetails,
    icon: Person,
  },
];
