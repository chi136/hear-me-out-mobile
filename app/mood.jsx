import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import COLORS from "../constants/colors";

const moods = ["😊", "😐", "😢", "😡"];

export default function MoodScreen() {
  const selectMood = (mood) => {
    router.push({
      pathname: "/mood-history",
      params: { mood },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>

      {moods.map((m) => (
        <Pressable
          key={m}
          style={styles.button}
          onPress={() => selectMood(m)}
        >
          <Text style={styles.text}>{m}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});