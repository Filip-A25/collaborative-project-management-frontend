interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

export const roleColorOptions: ColorOption[] = [
  {
    name: "Blue",
    value: "blue",
    hex: "#113AD4",
  },
  {
    name: "Purple",
    value: "purple",
    hex: "#880DBF",
  },
  {
    name: "Green",
    value: "green",
    hex: "#1EA65F",
  },
  {
    name: "Cyan",
    value: "cyan",
    hex: "#08BFC2",
  },
  {
    name: "Yellow",
    value: "yellow",
    hex: "#E4E80C",
  },
  {
    name: "Red",
    value: "red",
    hex: "#D91C2F",
  },
  {
    name: "Orange",
    value: "orange",
    hex: "#FA9D00",
  },
  {
    name: "Magenta",
    value: "magenta",
    hex: "#E0096D",
  },
];

export const formColorOptions: { label: string; value: string }[] =
  roleColorOptions.map((option) => ({
    label: option.name,
    value: option.value,
  }));
