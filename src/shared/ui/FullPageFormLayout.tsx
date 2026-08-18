import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const FullPageFormLayout = ({ title, children }: Props) => {
  return (
    <section className="min-h-full bg-white pt-20 pb-24 px-4 md:py-5 md:px-8">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </section>
  );
};
