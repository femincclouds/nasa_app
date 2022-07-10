import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { appStateSelectors, useAppState } from "../../state/app";

type State = {
  asteroid: string;
};

const Landing: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    getRandomAsteroids();
  }, []);

  const [data, setData] = useState({ asteroid: "" });
  const [randomId, setRandomId] = useState<string>("");
  const setAsteroidIds = useAppState(appStateSelectors.setAsteroidIds);
  const setAsteroidInfo = useAppState(appStateSelectors.setAsteroidInfo);

  const asteriodAPI = axios.create({
    baseURL: "https://api.nasa.gov/",
  });

  const showRandomAsteroidInfo = async () => {
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${randomId}?api_key=MPqpbDQQs7hjybeje6CcUHc9MNlD6EYwjzP9QCgP`
      )
      .then((res) => {
        setAsteroidInfo(res);
        navigation.navigate("Asteroid");
      });
  };

  const getRandomAsteroids = async () => {
    await axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=MPqpbDQQs7hjybeje6CcUHc9MNlD6EYwjzP9QCgP`
      )
      .then((res) => {
        const { data } = res;
        const { near_earth_objects } = data;
        const asteroidArray =
          near_earth_objects[Object.keys(near_earth_objects)[0]];
        const randomIds = asteroidArray.map((item: any) => {
          return item.id;
        });
        setAsteroidIds(randomIds);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (key: keyof State) => {
    return (text: string) => {
      setData({ ...data, [key]: text });
    };
  };
  const handleSubmit = async () => {
    const res = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${data.asteroid}?api_key=MPqpbDQQs7hjybeje6CcUHc9MNlD6EYwjzP9QCgP`
    );
    setAsteroidInfo(res);
    navigation.navigate("Asteroid");
    setData({ asteroid: "" });
  };

  const getAsteriodDetails = (id: string) => {
    console.log(id);
    asteriodAPI.get(
      `neo/rest/v1/neo/${id}?api_key=MPqpbDQQs7hjybeje6CcUHc9MNlD6EYwjzP9QCgP`
    );
    navigation.navigate("Asteroid");
  };

  const handleRandomAsteroid = async () => {
    await axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`)
      .then((res) => {
        const { data } = res;
        const { near_earth_objects } = data;
        const randomIds = near_earth_objects.map((item: any) => {
          return item.id;
        });
        const id = randomIds[Math.floor(Math.random() * randomIds.length)];
        setRandomId(id);
      })
      .then(() => {
        showRandomAsteroidInfo();
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Find Asteroid</Text>
      <TextInput
        value={data.asteroid}
        onChangeText={handleChange("asteroid")}
        style={styles.input}
        placeholder="Enter Asteroid ID"
        placeholderTextColor="black"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        activeOpacity={0.7}
        disabled={data.asteroid === ""}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRandomAsteroid}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Random Asteroid</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#a2d2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "black",
    marginBottom: 10,
  },
  input: {
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 15,
    borderRadius: 5,
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
