import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../constants/colors";

const ORBS = [
  "#e74c3c",
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
];

const QUOTES = [
  "Push yourself, because no one else will.",
  "Success starts with self-discipline.",
  "Small steps every day lead to big results.",
  "Don’t stop until you’re proud.",
  "Your only limit is your mind.",
];

const ORB_SIZE = 18;
const ORBIT_RADIUS = 22;

export default function LoadingScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 400,  
      useNativeDriver: true,
    }).start(() => {
      router.replace("/login");
    });
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={[styles.screen, { opacity: fadeOut }]}>
      <View style={styles.orbitWrapper}>
        <Animated.View
          style={[styles.orbit, { transform: [{ rotate: spin }] }]}
        >
          {ORBS.map((color, i) => {
            const angle = (i / ORBS.length) * 2 * Math.PI;
            const x = ORBIT_RADIUS * Math.cos(angle);
            const y = ORBIT_RADIUS * Math.sin(angle);

            return (
              <View
                key={i}
                style={[
                  styles.orb,
                  {
                    backgroundColor: color,
                    transform: [{ translateX: x }, { translateY: y }],
                  },
                ]}
              />
            );
          })}
        </Animated.View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Hear Me Out</Text>

        <Text style={styles.quote}>{QUOTES[quoteIndex]}</Text>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },
  orbitWrapper: {
    width: 110,
    height: 110,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  orbit: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    position: "absolute",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.primary,
    marginBottom: 10,
  },
  quote: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});