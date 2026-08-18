import clsx from "clsx";

interface Props {
  title: string;
  onClick?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  customStyling?: string;
}

export const FormButton = ({ title, onClick, customStyling }: Props) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={clsx(
        "bg-primary-dark-2 hover:bg-primary-dark-1 text-white mx-auto max-md:w-full md:px-20 py-2 rounded-full mt-8 cursor-pointer transition-colors duration-150 ease-in-out",
        customStyling,
      )}
    >
      {title}
    </button>
  );
};
