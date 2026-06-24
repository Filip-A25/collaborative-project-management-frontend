interface Props {
  completionPercentage: number;
}

export const CompletionProgress = ({ completionPercentage }: Props) => {
  const completionProgress = `${completionPercentage}%`;

  return (
    <div className="flex flex-col md:min-w-[140px] lg:min-w-[180px] xl:min-w-[200px]">
      <span className="flex items-end gap-3">
        <p className="text-2xl font-semibold">{completionProgress}</p>
        <p className="text-xs tracking-widest">COMPLETED</p>
      </span>
      <progress
        value={completionProgress}
        max={100}
        className="w-full rounded-full overflow-hidden h-2 md:mt-1 md:mb-4 [&::-webkit-progress-bar]:bg-muted-1/20 [&::-webkit-progress-value]:bg-primary-2"
      />
    </div>
  );
};
