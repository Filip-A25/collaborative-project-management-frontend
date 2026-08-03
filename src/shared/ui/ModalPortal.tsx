import { PropsWithChildren } from "react";
import clsx from "clsx";

interface Props extends PropsWithChildren {
  wrapperStyling?: string;
}

export const ModalPortal = ({ wrapperStyling, children }: Props) => {
  return (
    <div className="w-full h-full flex overflow-y-scroll justify-center items-center fixed z-50 bg-black/10 left-0 top-0 backdrop-blur-sm backdrop-brightness-50">
      <div className={clsx("bg-white rounded-lg ", wrapperStyling)}>
        {children}
      </div>
    </div>
  );
};
