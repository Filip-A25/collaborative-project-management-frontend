interface Props {
  completionPercentage: number;
}

export const CompletionProgress = ({ completionPercentage }: Props) => {
  const completionProgress = `${completionPercentage}%`;

  return (
    <>
      <span className="flex items-end gap-3">
        <p className="text-2xl font-semibold">{completionProgress}</p>
        <p className="text-xs tracking-widest">COMPLETED</p>
      </span>
      <progress
        value={completionProgress}
        max={100}
        className="w-full rounded-full overflow-hidden h-2 mt-2 md:mb-4 [&::-webkit-progress-bar]:bg-muted-1/20 [&::-webkit-progress-value]:bg-primary-2"
      />
    </>
  );
};
