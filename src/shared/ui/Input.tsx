import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import clsx from "clsx";

type InputType = "text" | "number" | "email" | "password";
type InputGroup = "auth";

interface Props<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  type: InputType;
  register: UseFormRegister<T>;
  hasError: boolean;
  errorMessage?: string;
  group?: InputGroup;
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
}: Props<T>) => {
  return (
    <div
      className={clsx(
        "flex flex-col w-full md:gap-2 mt-4",
        getCustomInputClasses(group),
      )}
    >
      <input
        type={type}
        {...register(name)}
        className="bg-gray-50 border text-sm border-gray-100 rounded-lg max-md:w-full px-4 py-2 outline-0 focus:border-gray-200 hover:border-gray-200 hover:shadow-md focus:shadow-md [--tw-shadow-color:rgb(0,0,0,0.03)] transition-all duration-150 ease-in-out"
        placeholder={placeholder}
      />
      {hasError && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};
