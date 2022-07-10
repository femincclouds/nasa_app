import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { appStateSelectors, useAppState } from "../../state/app";

const Asteroid = () => {
  const asteroidInfo = useAppState(appStateSelectors.asteroidInfo);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.textStyle}>
        name: <Text style={styles.data}>{asteroidInfo.data.name}</Text>
      </Text>

      <Text style={styles.textStyle}>
        nasa_jpl_url:{" "}
        <Text style={styles.data}>{asteroidInfo.data.nasa_jpl_url}</Text>
      </Text>

      <Text style={styles.textStyle}>
        is_potentially_hazardous_asteroid:
        <Text style={styles.data}>
          {asteroidInfo.data.is_potentially_hazardous_asteroid.toString()}
        </Text>
      </Text>
    </View>
  );
};

export default Asteroid;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 25,
    margin: 10,
  },
  data: {
    color: "blue",
    fontSize: 30,
    margin: 10,
  },
});
