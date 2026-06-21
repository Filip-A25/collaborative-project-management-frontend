import { SvgIconComponent } from "@mui/icons-material";

interface Props {
  icon: SvgIconComponent;
  title: string;
}

export const LayoutHeading = ({ icon, title }: Props) => {
  return (
    <header>
      <div>
        <h1>{title}</h1>
      </div>
    </header>
  );
};
