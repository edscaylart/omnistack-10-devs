import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2D7086"
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff"
  },
  // Devs
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
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#2d5290",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  }
});

export default styles;
