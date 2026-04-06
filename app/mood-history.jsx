import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const moodColors = {
  "😊": "#4CAF50",
  "😐": "#FFC107",
  "😢": "#2196F3",
  "😡": "#F44336",
};

export default function MoodHistory() {
  const { mood } = useLocalSearchParams();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(null);
  const [moods, setMoods] = useState({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    if (mood) {
      const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

      setMoods((prev) => ({
        ...prev,
        [key]: mood,
      }));
    }
  }, [mood]);

  function changeMonth(offset) {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDay(null);
  }

  const moodCounts = {};
  Object.values(moods).forEach((m) => {
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>

      <View style={styles.header}>
        <Pressable onPress={() => changeMonth(-1)}>
          <Text>{"<"}</Text>
        </Pressable>

        <Text style={styles.month}>
          {monthName} {year}
        </Text>

        <Pressable onPress={() => changeMonth(1)}>
          <Text>{">"}</Text>
        </Pressable>
      </View>

      <View style={styles.calendar}>
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const key = `${year}-${month}-${day}`;
          const dayMood = moods[key];

          return (
            <Pressable
              key={day}
              style={[
                styles.dayBox,
                selectedDay === day && styles.selectedDay,
                dayMood && { backgroundColor: moodColors[dayMood] + "55" },
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={styles.dayText}>{day}</Text>
              <Text>{dayMood || ""}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.analytics}>
        <Text style={styles.analyticsTitle}>Mood Summary</Text>

        {Object.keys(moodCounts).length === 0 && (
          <Text style={{ textAlign: "center", color: "gray" }}>
            No data yet
          </Text>
        )}

        {Object.entries(moodCounts).map(([m, count]) => (
          <Text key={m} style={styles.analyticsText}>
            {m} : {count} days
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 10 },

  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    alignItems: "center",
  },

  month: {
    fontSize: 18,
    fontWeight: "700",
  },

  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  dayBox: {
    width: "13%",
    height: 55,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDay: {
    borderColor: "#000",
  },

  dayText: {
    fontSize: 12,
    fontWeight: "600",
  },

  analytics: {
    marginTop: 20,
  },

  analyticsTitle: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 8,
  },

  analyticsText: {
    textAlign: "center",
  },
});