import React from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

import styles from "./styles";

import { Dev } from "../../../../interfaces/dev";

export default function DevMarker(props) {
  const dev: Dev = props.data;
  return (
    <Marker
      coordinate={{
        latitude: dev.location.coordinates[1],
        longitude: dev.location.coordinates[0]
      }}
    >
      <Image
        resizeMode="contain"
        style={styles.avatar}
        source={{
          uri: dev.avatar_url
        }}
      />

      <Callout onPress={() => props.onPress(dev.github_username)}>
        <View style={styles.callout}>
          <Text style={styles.devName}>{dev.name}</Text>
          <Text style={styles.devBio}>{dev.bio}</Text>
          <View style={styles.devTechs}>
            {dev.techs.map(tech => (
              <Text key={tech} style={styles.tech}>
                {tech}
              </Text>
            ))}
          </View>
        </View>
      </Callout>
    </Marker>
  );
}
