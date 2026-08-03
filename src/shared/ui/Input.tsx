"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";

type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "textarea"
  | "date"
  | "color";
type InputGroup = "auth";

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  type: InputType;
  register: UseFormRegister<T>;
  hasError: boolean;
  errorMessage?: string;
  group?: InputGroup;
  customStyling?: string;
  label?: string;
}

const getCustomInputClasses = (group?: InputGroup) => {
  if (!group) return;

  switch (group) {
    case "auth":
      return " md:w-[260px]";
    default:
      return "";
  }
};

export const Input = <T extends FieldValues>({
  name,
  placeholder,
  type,
  register,
  hasError,
  errorMessage,
  group,
  customStyling,
  label,
}: Props<T>) => {
  return (
    <div
      className={clsx(
        "flex flex-col md:gap-1 mt-4 max-md:w-full",
        getCustomInputClasses(group),
        customStyling,
      )}
    >
      {type === "textarea" ? (
        <>
          {label && (
            <label className="text-sm text-primary-dark-1">{label}</label>
          )}
          <textarea
            {...register(name)}
            cols={3}
            className="bg-gray-50 border text-sm focus:text-primary-dark-2 text-muted-1 border-gray-100 rounded-lg max-md:w-full px-4 py-2 outline-0 focus:border-gray-200 hover:border-gray-200 hover:shadow-md focus:shadow-md [--tw-shadow-color:rgb(0,0,0,0.03)] transition-all duration-150 ease-in-out"
            placeholder={placeholder}
          />
        </>
      ) : (
        <>
          {label && (
            <label className="text-sm text-primary-dark-1">{label}</label>
          )}
          <input
            type={type}
            {...register(name)}
            className={clsx(
              "bg-gray-50 border text-sm focus:text-primary-dark-2 text-muted-1 border-gray-100 rounded-lg max-md:w-full px-4 py-2 outline-0 focus:border-gray-200 hover:border-gray-200 hover:shadow-md focus:shadow-md [--tw-shadow-color:rgb(0,0,0,0.03)] transition-all duration-150 ease-in-out",
              type === "date" && "text-muted-1",
            )}
            placeholder={placeholder}
          />
        </>
      )}

      {hasError && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};
