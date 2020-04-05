import React from "react";
import styles from "./styles.module.scss";
import Container from "../Container";

export default function NavBar({ username }) {
  return (
    <div className={styles.navWrapper}>
      <Container>
        <h1>Story of {username}</h1>
      </Container>
    </div>
  );
}
