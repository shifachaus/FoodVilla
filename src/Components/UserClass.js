import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy ",
        location: "Default",
        avatar_url: "",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/shifachaus");
    const res = await data.json();

    this.setState({
      userInfo: res,
    });
    console.log(res);
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component will Unmount");
  }
  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user__card">
        <img src={avatar_url} alt="avatar" />
        <p>Name: {name}</p>
        <p>location: {location}</p>
        <p>Contact: chausshifa804@gmail.com</p>
      </div>
    );
  }
}

export default UserClass;
