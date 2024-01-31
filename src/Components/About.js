import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div className="  w-[90%] max-w-7xl my-0 mx-auto">
        <h2 className="app__name">Class Component</h2>
        <h3 className="app__name">Food villa app</h3>
        {/* <User name={"Shifa Chaus (Function)"} /> */}
        <UserClass name={"Shifa Chaus (Class)"} location={"Mumbai Class"} />
      </div>
    );
  }
}
export default About;
