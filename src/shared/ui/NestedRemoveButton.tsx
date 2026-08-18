interface Props {
  clickFn: VoidFunction;
}

export const NestedRemoveButton = ({ clickFn }: Props) => {
  return (
    <button
      type="button"
      onClick={clickFn}
      className="cursor-pointer mt-2 text-red-500 hover:text-red-400 text-xs transition-colors duration-150 ease-in-out"
    >
      Remove
    </button>
  );
};
