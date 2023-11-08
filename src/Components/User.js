import { useEffect, useState } from "react";

const User = ({ name }) => {
  const [count] = useState(0);
  const [count2] = useState(1);

  useEffect(() => {
    //Api calls
  }, []); //Call it once
  return (
    <div className="user__card">
      <h1>Count :{count}</h1>
      <h1>Count 2:{count2}</h1>
      <p>Name: {name}</p>
      <p>location: Mumbai</p>
      <p>Contact: chausshifa@gmail.com</p>
    </div>
  );
};

export default User;
