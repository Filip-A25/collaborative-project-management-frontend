"use client";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useRouter } from "next/navigation";

export const MobileBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed py-5 px-4 bg-white w-full border-b border-b-muted-1/30 md:hidden">
      <button onClick={() => router.back()}>
        <NavigateBeforeIcon className="text-muted-1" />
      </button>
    </nav>
  );
};
