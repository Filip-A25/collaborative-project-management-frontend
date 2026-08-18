import { SvgIconComponent } from "@mui/icons-material";

interface Props {
  baseRouteName: string;
  iconSvg: SvgIconComponent;
  subRouteName?: string;
}

export const LayoutHeading = ({
  baseRouteName,
  iconSvg,
  subRouteName,
}: Props) => {
  const Icon = iconSvg;

  return (
    <header className="hidden md:flex md:items-center md:h-fit md:w-fit md:mt-7 md:gap-2">
      <Icon className="text-muted-1 w-4! h-4!" />
      <h1 className="text-sm font-semibold text-muted-1">
        {baseRouteName}
        {subRouteName && (
          <span>
            &nbsp;&nbsp;/&nbsp;&nbsp;
            {subRouteName}
          </span>
        )}
      </h1>
    </header>
  );
};
