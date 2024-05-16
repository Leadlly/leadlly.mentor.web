const Progressbar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="rounded h-[6px] w-16 min-w-16 bg-[#C1C1C1]">
      <div
        style={{ width: `${percentage}%` }}
        className="h-full rounded bg-[#0075FF]"
      ></div>
    </div>
  );
};
export default Progressbar;
