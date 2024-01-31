const Shimmer = ({ box, style, hide, grid, heading, border, icon }) => {
  return (
    <section className="mx-auto max-w-7xl p-6 lg:px-8 ">
      <div
        className={`${heading} bg-gray-200 w-32 animate-pulse border shadow  mb-6`}
      ></div>
      <div className={` grid ${grid}   mb-6`}>
        {Array(box)
          .fill("")
          .map((e, index) => (
            <div key={index} className="flex  gap-2">
              <div className="flex items-center ">
                <span>{icon}</span>
                <div
                  className={`${style} border bg-gray-200 animate-pulse flex space-x-4   shadow   mb-2  `}
                ></div>
              </div>
              <div
                className={`${hide} bg-gray-200 w-32 animate-pulse border shadow  `}
              ></div>
              <div className={border}></div>
              <div
                className={`${hide} bg-gray-200 w-28 animate-pulse border shadow  `}
              ></div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Shimmer;
