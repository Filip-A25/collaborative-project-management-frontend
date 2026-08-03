interface Props {
  label: string;
  clickFn: VoidFunction;
}

export const NestedAddButton = ({ label, clickFn }: Props) => {
  return (
    <button
      type="button"
      onClick={clickFn}
      className="text-xs px-2 py-1 mt-3 border border-primary-1 rounded-md text-primary-1 hover:border-primary-2 hover:text-primary-2 cursor-pointer transition-colors duration-150 ease-in-out"
    >
      {label}
    </button>
  );
};
