import { PropsWithChildren } from "react";
import clsx from "clsx";
import { Close } from "@mui/icons-material";

interface Props extends PropsWithChildren {
  closeFn: VoidFunction;
  wrapperStyling?: string;
  headingText?: string;
}

export const ModalPortal = ({
  closeFn,
  wrapperStyling,
  headingText,
  children,
}: Props) => {
  return (
    <div className="w-full h-full flex overflow-y-scroll justify-center items-center fixed z-50 bg-black/10 left-0 top-0 backdrop-blur-sm backdrop-brightness-50">
      <div className={clsx("bg-white rounded-lg ", wrapperStyling)}>
        <div
          className={clsx(
            "flex mb-4 ",
            headingText ? "justify-between" : "justify-end",
          )}
        >
          <h2 className="text-muted-1">{headingText}</h2>
          <button onClick={closeFn} className="cursor-pointer">
            <Close className="text-muted-1" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
