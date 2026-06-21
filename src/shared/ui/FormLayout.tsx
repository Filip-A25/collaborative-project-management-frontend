import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const FormLayout = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col w-full md:w-fit px-8 md:px-12 md:py-8 gap-4">
      <h2 className="text-xl Md:text-2xl font-semibold text-center text-primary-dark-2">
        {title}
      </h2>
      {children}
    </div>
  );
};
