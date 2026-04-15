import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import COLORS from "../constants/colors";
import { router } from "expo-router";
import Logo from "../components/logo";

const questions = [
  {
    id: "q1",
    question: "I feel nervous or anxious",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q2",
    question: "I have trouble sleeping",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  { id: "q3",
    question: "I feel overwhelmed",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  { id: "q4",
    question: "I feel sad or hopeless",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  { id: "q5",
    question: "I have difficulty concentrating",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
];

export default function AssessmentScreen() {
  const scrollRef = useRef(null);

  const [step, setStep] = useState("welcome");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chat, setChat] = useState([]);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [typing, setTyping] = useState(false);

  const currentQ = questions[currentIndex];

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDots = () => {
  const loop = Animated.loop(
    Animated.stagger(150, [
      Animated.sequence([
        Animated.timing(dot1, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot1, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(dot2, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot2, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(dot3, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dot3, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ])
  );

  loop.start();

  return loop;
};

  useEffect(() => {
  if (step === "assessment" && !done) {
    setTyping(true);
    animateDots();

    if (chat.length === 0) {
      setTimeout(() => {
        setChat([{ type: "question", text: "Hi! I'm your Assessment Bot 👋" }]);
        setTyping(false);

        setTimeout(() => {
          setChat((prev) => [
            ...prev,
            { type: "question", text: currentQ.question },
          ]);
        }, 800);
      }, 600);
    } else if (currentQ) {
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { type: "question", text: currentQ.question },
        ]);
        setTyping(false);
      }, 600);
    }
  }
}, [currentIndex, step]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [chat, typing]);

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: Number(option.value),
    }));

    setChat((prev) => [
      ...prev,
      { type: "answer", text: option.label },
    ]);

    setTyping(true);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setDone(true);
        setTyping(false);
      }
    }, 600);
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach((q) => {
      const option = q.options.find(
        (o) => Number(o.value) === answers[q.id]
      );
      if (option) total += option.score;
    });
    return total;
  };

  const getLevel = (score) => {
    if (score <= 2) return { label: "Low", color: COLORS.primary };
    if (score <= 4) return { label: "Moderate", color: "#F59E0B" };
    return { label: "High", color: "#EF4444" };
  };

  if (step === "welcome") {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Logo size={28} />
            <View>
              <Text style={styles.headerTitle}>Assessment Bot</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>

          <View style={styles.center}>
            <Text style={styles.title}>Welcome 👋</Text>
            <Text style={styles.subtitle1}>
              You are about to take a short mental health assessment.
            </Text>
            <Text style={styles.subtitle2}>
              Please answer honestly. This will only take a few minutes.
            </Text>

            <Pressable
              style={styles.mainBtn}
              onPress={() => setStep("assessment")}
            >
              <Text style={styles.btnText}>Start Assessment</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (done) {
    const score = calculateScore();
    const level = getLevel(score);
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Logo size={28} />
            <View>
              <Text style={styles.headerTitle}>Assessment Bot</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>

          <View style={styles.center}>
            <Text style={styles.title}>Assessment Completed ✅</Text>
            <Text style={[styles.result, { color: level.color }]}>
              {level.label} Risk
            </Text>
            <Text style={styles.score}>Score: {score}</Text>

            <Pressable
              style={styles.mainBtn}
              onPress={() => router.push("/mood")}
            >
              <Text style={styles.btnText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Logo size={28} />
          <View>
            <Text style={styles.headerTitle}>Assessment Bot</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <ScrollView ref={scrollRef} style={styles.chatArea}>
          {chat.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.type === "answer" ? styles.userMsg : styles.botMsg,
              ]}
            >
              <Text style={styles.msgText}>{msg.text}</Text>
            </View>
          ))}

          {typing && (
            <View style={[styles.message, styles.botMsg, styles.typingBubble]}>
              <Animated.View style={[styles.dot, { opacity: dot1 }]} />
              <Animated.View style={[styles.dot, { opacity: dot2 }]} />
              <Animated.View style={[styles.dot, { opacity: dot3 }]} />
            </View>
          )}
        </ScrollView>

        {!typing && currentQ && !done && (
          <View style={styles.options}>
            {currentQ.options.map((opt) => (
              <Pressable
                key={opt.value}
                style={styles.optionBtn}
                onPress={() => handleAnswer(opt)}
              >
                <Text style={styles.optionText}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.card, // same vibe as loading screen
    padding: 16,
    justifyContent: "center",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.primary,
  },

  headerStatus: {
    fontSize: 12,
    color: COLORS.muted,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle1: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle2: {
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    marginBottom: 18,
  },

  chatArea: {
    flex: 1,
    marginVertical: 10,
  },

  message: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: "80%",
  },

  botMsg: {
    backgroundColor: "#F1F1F1",
    alignSelf: "flex-start",
  },

  userMsg: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
  },

  msgText: {
    fontSize: 14,
    color: "#000",
  },

  options: {
    paddingVertical: 10,
    gap: 10,
  },

  optionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999, // pill style
    backgroundColor: "#F1F1F1",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  mainBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 999,
    marginTop: 20,
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },

  result: {
    fontSize: 22,
    fontWeight: "900",
    marginVertical: 10,
    textAlign: "center",
  },

  score: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 10,
  },

  typingBubble: {
    width: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#999",
  },
});