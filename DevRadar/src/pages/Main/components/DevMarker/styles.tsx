import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Devs
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260,
    height: 250
  },
  devName: {
    fontWeight: "bold"
  },
  devBio: {
    fontSize: 12,
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5
  },
  tech: {
    backgroundColor: "#7551d7",
    color: "#fff",
    fontSize: 10,
    margin: 2,
    paddingHorizontal: 5,
    borderRadius: 5
  }
});

export default styles;
