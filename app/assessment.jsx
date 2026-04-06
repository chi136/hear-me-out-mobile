import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { router } from "expo-router";
import COLORS from "../constants/colors";
import GlobalStyles from "../constants/GlobalStyles";
import InvalidModal from "../components/invalid-modal";

const questions = [
  {
    id: "q1",
    question:
      "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    category: "Depression",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q2",
    question:
      "How often have you had little interest or pleasure in doing things?",
    category: "Depression",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q3",
    question:
      "How often have you had trouble falling or staying asleep, or sleeping too much?",
    category: "Sleep",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q4",
    question: "How often have you felt tired or had little energy?",
    category: "Energy",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q5",
    question: "How often have you felt nervous, anxious, or on edge?",
    category: "Anxiety",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q6",
    question: "How often have you been unable to stop or control worrying?",
    category: "Anxiety",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q7",
    question: "How would you rate your overall stress level?",
    category: "Stress",
    options: [
      { value: "0", label: "Very low", score: 0 },
      { value: "1", label: "Low", score: 1 },
      { value: "2", label: "Moderate", score: 2 },
      { value: "3", label: "High", score: 3 },
      { value: "4", label: "Very high", score: 4 },
    ],
  },
  {
    id: "q8",
    question:
      "How often do you feel overwhelmed by daily responsibilities?",
    category: "Stress",
    options: [
      { value: "0", label: "Never", score: 0 },
      { value: "1", label: "Rarely", score: 1 },
      { value: "2", label: "Sometimes", score: 2 },
      { value: "3", label: "Often", score: 3 },
      { value: "4", label: "Always", score: 4 },
    ],
  },
  {
    id: "q9",
    question: "How would you rate your ability to concentrate on tasks?",
    category: "Cognitive",
    options: [
      { value: "4", label: "Excellent", score: 0 },
      { value: "3", label: "Good", score: 1 },
      { value: "2", label: "Fair", score: 2 },
      { value: "1", label: "Poor", score: 3 },
      { value: "0", label: "Very poor", score: 4 },
    ],
  },
  {
    id: "q10",
    question: "How often do you engage in activities you enjoy?",
    category: "Wellbeing",
    options: [
      { value: "4", label: "Daily", score: 0 },
      { value: "3", label: "Several times a week", score: 1 },
      { value: "2", label: "Once a week", score: 2 },
      { value: "1", label: "Rarely", score: 3 },
      { value: "0", label: "Never", score: 4 },
    ],
  },
  {
    id: "q11",
    question: "How satisfied are you with your social relationships?",
    category: "Social",
    options: [
      { value: "4", label: "Very satisfied", score: 0 },
      { value: "3", label: "Satisfied", score: 1 },
      { value: "2", label: "Neutral", score: 2 },
      { value: "1", label: "Dissatisfied", score: 3 },
      { value: "0", label: "Very dissatisfied", score: 4 },
    ],
  },
  {
    id: "q12",
    question: "How often do you feel isolated or alone?",
    category: "Social",
    options: [
      { value: "0", label: "Never", score: 0 },
      { value: "1", label: "Rarely", score: 1 },
      { value: "2", label: "Sometimes", score: 2 },
      { value: "3", label: "Often", score: 3 },
      { value: "4", label: "Always", score: 4 },
    ],
  },
  {
    id: "q13",
    question:
      "How often have you felt bad about yourself or that you are a failure?",
    category: "Self-esteem",
    options: [
      { value: "0", label: "Not at all", score: 0 },
      { value: "1", label: "Several days", score: 1 },
      { value: "2", label: "More than half the days", score: 2 },
      { value: "3", label: "Nearly every day", score: 3 },
    ],
  },
  {
    id: "q14",
    question:
      "How would you rate your appetite or eating habits recently?",
    category: "Physical",
    options: [
      { value: "0", label: "Normal and healthy", score: 0 },
      { value: "1", label: "Slightly changed", score: 1 },
      { value: "2", label: "Moderately changed", score: 2 },
      { value: "3", label: "Significantly changed", score: 3 },
    ],
  },
  {
    id: "q15",
    question:
      "How often do you have thoughts that you would be better off dead or hurting yourself?",
    category: "Crisis",
    options: [
      { value: "0", label: "Never", score: 0 },
      { value: "1", label: "Rarely", score: 1 },
      { value: "2", label: "Sometimes", score: 2 },
      { value: "3", label: "Often", score: 3 },
    ],
  },
];

export default function AssessmentScreen() {
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const [invalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const calculateScore = () => {
    let total = 0;

    questions.forEach((q) => {
      const option = q.options.find((o) => o.value === answers[q.id]);
      if (option) total += option.score;
    });

    return total;
  };

  const score = calculateScore();

  const getLevel = () => {
    if (score <= 2) return { label: "Low", color: COLORS.primary };
    if (score <= 4) return { label: "Moderate", color: "#F59E0B" };
    return { label: "High", color: "#EF4444" };
  };

  const level = getLevel();

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      setErrorMsg("Please answer all questions.");
      setInvalid(true);
      return;
    }

    setShowResults(true);

    setTimeout(() => {
      router.replace("/mood");
    }, 800);
  };

   const reset = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.card, isWeb && styles.cardWeb]}>
        <Text style={GlobalStyles.screenTitle}>
          Mental Health Assessment
        </Text>

        {!showResults &&
          questions.map((q) => (
            <View key={q.id} style={styles.qBox}>
              <Text style={styles.question}>{q.question}</Text>
              <Text style={styles.category}>{q.category}</Text>

              {q.options.map((opt) => (
                <Pressable
                  key={opt.value}
                  style={[
                    styles.option,
                    answers[q.id] === opt.value && styles.selected,
                  ]}
                  onPress={() => handleAnswer(q.id, opt.value)}
                >
                  <Text>{opt.label}</Text>
                </Pressable>
              ))}
            </View>
          ))}

        {!showResults ? (
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT ASSESSMENT</Text>
          </Pressable>
        ) : (
          <View style={styles.resultBox}>
            <Text style={[styles.resultText, { color: level.color }]}>
              {level.label} Risk Level
            </Text>

            <Text style={styles.scoreText}>Score: {score}</Text>

            <Pressable style={styles.button} onPress={reset}>
              <Text style={styles.buttonText}>OKAY</Text>
            </Pressable>
          </View>
        )}

        <InvalidModal
          visible={invalid}
          message={errorMsg}
          onClose={() => setInvalid(false)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 20,
  },
  cardWeb: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 28,
  },
  qBox: {
    marginBottom: 18,
  },
  question: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 8,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: COLORS.inputBg,
  },
  selected: {
    backgroundColor: COLORS.primary,
    opacity: 0.15,
    borderColor: COLORS.primary,
  },
  resultBox: {
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "700",
  },
  scoreText: {
    fontSize: 14,
    color: COLORS.muted,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});