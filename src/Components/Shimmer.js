const Shimmer = ({ box, style, hide, grid }) => {
  return (
    <div className={`mx-auto max-w-7xl  p-6 lg:px-8 grid ${grid} mb-8 `}>
      {Array(box)
        .fill("")
        .map((e, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div
              className={`${style} border bg-gray-200 animate-pulse flex space-x-4   shadow   max-w-sm w-full mx-auto `}
            ></div>
            <div
              className={`${hide} bg-gray-200 w-32 animate-pulse border shadow  `}
            ></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
