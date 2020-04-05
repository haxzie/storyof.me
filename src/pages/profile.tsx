import React from "react";
import NavBar from "../components/NavBar";

export default function Profile({ username }) {
  return (
    <div>
      <NavBar {...{ username }} />
    </div>
  );
}

Profile.getInitialProps = async ({ query }) => {
  console.log({ username: query.username });
  return { username: query.username };
};
