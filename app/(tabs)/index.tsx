import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { useState } from "react";

import { secondsToMMSS } from "../util";

export default function HomeScreen() {
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isPaused, setPaused] = useState(false);
  const mmssRemaining = secondsToMMSS(secondsRemaining);

  const unsubscribe = setTimeout(() => {
    const newTime = secondsRemaining - 1;
    if (newTime >= 0 && !isPaused) {
      setSecondsRemaining(newTime);
    } else {
      clearTimeout(unsubscribe);
    }
  }, 1000);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25292e",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 48, fontWeight: "bold" }}>
        {mmssRemaining}
      </Text>
      <View>
        <Button
          title={!isPaused ? "Pause" : "Play"}
          disabled={secondsRemaining === 0}
          onPress={() => setPaused(!isPaused)}
        ></Button>
        <Button title="Reset" onPress={() => setSecondsRemaining(10)} />
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
