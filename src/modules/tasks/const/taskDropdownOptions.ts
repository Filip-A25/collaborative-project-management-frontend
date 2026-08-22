export const priorityOptions: {
  label: string;
  value: string;
  color: string;
}[] = [
  { label: "Undefined", value: "Undefined", color: "gray" },
  { label: "Low", value: "Low", color: "yellow" },
  { label: "Medium", value: "Medium", color: "orange" },
  { label: "High", value: "High", color: "red" },
  { label: "Very high", value: "VeryHigh", color: "dark-red" },
];

export const statusOptions: { label: string; value: string; color: string }[] =
  [
    { label: "Backlog", value: "Backlog", color: "gray" },
    { label: "In queue", value: "InQueue", color: "blue" },
    { label: "In progress", value: "InProgress", color: "purple" },
    { label: "In review", value: "InReview", color: "yellow" },
    { label: "Completed", value: "Completed", color: "green" },
  ];
