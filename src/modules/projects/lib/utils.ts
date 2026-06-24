import { Status } from "../types/project";

export const getStatusTextStyling = (status: Status) => {
  switch (status) {
    case "OnHold":
      return "text-slate-500 border-slate-500";
    case "Planning":
      return "text-purple-700 border-purple-700";
    case "Active":
      return "text-emerald-600 border-emerald-600";
    case "Completed":
      return "text-amber-500 border-amber-500";
  }
};
