import React from "react";
import { StyleSheet, StatusBar } from "react-native";

import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2D7086" />
      <Routes />
    </>
  );
}
