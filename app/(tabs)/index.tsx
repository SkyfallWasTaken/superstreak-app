import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Button,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { secondsToMMSS } from "../util";
import CircularProgress from "react-native-circular-progress-indicator";

export default function HomeScreen() {
  const startingSeconds = 10;
  const [secondsRemaining, setSecondsRemaining] = useState(startingSeconds / 2);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!isPaused && secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsRemaining]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25292e",
      }}
    >
      <CircularProgress
        value={secondsRemaining}
        radius={120}
        maxValue={startingSeconds}
        initialValue={secondsRemaining}
        progressValueColor={"#fff"}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        duration={500}
      />

      <View>
        <Pressable
          style={styles.button}
          disabled={secondsRemaining === 0}
          onPress={() => setPaused(!isPaused)}
        >
          <Text>{!isPaused ? "Pause" : "Play"}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setSecondsRemaining(startingSeconds)}
        >
          <Text>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
