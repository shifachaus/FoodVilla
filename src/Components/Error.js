import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();

  return (
    <div className="w-[90%] max-w-7xl my-0 mx-auto">
      <h2>oops!!</h2>
      <h3>Something went wrong</h3>
      <h4>
        {err.status} : {err.statusText}
      </h4>
    </div>
  );
};

export default Error;
