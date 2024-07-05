import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { useEffect, useState } from "react";

import { secondsToMMSS } from "../util";
import CircularProgress from "react-native-circular-progress-indicator";

export default function HomeScreen() {
  const startingSeconds = 60;
  const [secondsRemaining, setSecondsRemaining] = useState(startingSeconds / 2);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setSecondsRemaining((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <Button
          title={!isPaused ? "Pause" : "Play"}
          disabled={secondsRemaining === 0}
          onPress={() => setPaused(!isPaused)}
        ></Button>
        <Button
          title="Reset"
          onPress={() => setSecondsRemaining(startingSeconds)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
