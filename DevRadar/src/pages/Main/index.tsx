import React, { useEffect, useCallback, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import styles from "./styles";

import DevMarker from "./components/DevMarker";
import api from "../../services/api";

import { Dev } from "../../interfaces/dev";

export default function Main({ navigation }) {
  const [devs, setDevs] = useState<Dev[]>([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState("");
  const getUserLocation = useCallback(async () => {
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      });
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    let query = `latitude=${latitude}&longitude=${longitude}`;

    if (techs) {
      query = `${query}&techs[in]=${techs}`;
    }

    const response = await api.get(`/devs?${query}`);

    setDevs(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  function handleDevPress(github_username) {
    navigation.navigate("Profile", { github_username });
  }

  if (!currentRegion) {
    return (
      <View style={styles.container}>
        <LottieView
          style={{
            width: 200,
            height: 200
          }}
          source={require("../../../assets/radar.json")}
          loop
          autoPlay
        />
      </View>
    );
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {devs.map(dev => (
          <DevMarker key={dev._id} data={dev} onPress={handleDevPress} />
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dev por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
