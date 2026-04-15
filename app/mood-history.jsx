import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import COLORS from "../constants/colors";

const moodColors = {
  "😊": "#4CAF50",
  "😐": "#FFC107",
  "😢": "#2196F3",
  "😡": "#F44336",
};

const CELL_SIZE = 44;
const CELL_GAP = 6;
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CALENDAR_WIDTH = CELL_SIZE * 7 + CELL_GAP * 6;

export default function MoodHistory() {
  const params = useLocalSearchParams();
  const mood = typeof params.mood === "string" ? params.mood : null;
  const router = useRouter();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(null);
  const [moods, setMoods] = useState({});
  const [appointment, setAppointment] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

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

      generateAppointment(mood);

      if (mood === "😢" || mood === "😡") {
        setRedirecting(true);

        setTimeout(() => {
          router.push("/chat");
        }, 1500);
      }
    }
  }, [mood]);

  function generateAppointment(mood) {
    let severity = "Low";
    let assignedTo = "Assistant Counselor (Student)";

    if (mood === "😐") severity = "Moderate";
    if (mood === "😢" || mood === "😡") {
      severity = "High";
      assignedTo = "Guidance Counselor";
    }

    const date = new Date();
    date.setDate(date.getDate() + 1);

    setAppointment({
      severity,
      assignedTo,
      status: "Pending",
      date: date.toLocaleDateString(),
      time: "10:00 AM",
    });
  }

  function changeMonth(offset) {
    setCurrentDate(new Date(year, month + offset, 1));
    setSelectedDay(null);
  }

  const moodCounts = {};
  Object.values(moods).forEach((m) => {
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Mood Tracker</Text>

        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => router.push("/chat")}>
            <Text style={styles.buttonText}>Go to Chat</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: COLORS.muted }]}
            onPress={() => router.push("/assessment")}
          >
            <Text style={styles.buttonText}>Track Again</Text>
          </Pressable>
        </View>

        {redirecting && (
          <Text style={styles.redirectText}>
            Connecting you to support chat...
          </Text>
        )}

        {/* HEADER */}
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

        {/* WEEK DAYS */}
       <View style={styles.weekRow}>
        {WEEK_DAYS.map((day, index) => (
          <Text
          key={day}
          style={[
          styles.weekText,
          index === 6 && { marginRight: 0 },
        ]}
          >
            {day}
            </Text>
          ))}
          </View>

        <View style={styles.calendar}>
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <View
            key={`empty-${i}`}
            style={[
            styles.dayBoxEmpty,
            (i + 1) % 7 === 0 && { marginRight: 0 },
          ]}
          />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = `${year}-${month}-${day}`;
            const dayMood = moods[key];
            const index = firstDayOfMonth + i;

    return (
      <Pressable
        key={day}
        style={[
          styles.dayBox,
          index % 7 === 6 && { marginRight: 0 },
          selectedDay === day && styles.selectedDay,
          dayMood && {
            backgroundColor: (moodColors[dayMood] || "#ccc") + "55",
          },
        ]}
        onPress={() => setSelectedDay(day)}
      >
        <Text style={styles.dayText}>{day}</Text>
        <Text>{dayMood || ""}</Text>
      </Pressable>
    );
  })}
</View>

        {/* SUMMARY */}
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

        {/* APPOINTMENT */}
        {appointment && (
          <View style={styles.appointmentBox}>
            <Text style={styles.appointmentTitle}>Appointment Details</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Severity</Text>
              <Text style={styles.value}>{appointment.severity}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Assigned To</Text>
              <Text style={styles.value}>{appointment.assignedTo}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>{appointment.status}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{appointment.date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{appointment.time}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  content: {
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },

  redirectText: {
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 10,
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },

  month: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
  },

  weekRow: {
    flexDirection: "row",
    width: CALENDAR_WIDTH,
    alignSelf: "center",
    marginBottom: 8,
  },

  weekText: {
    width: CELL_SIZE,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    color: "#666",
    marginRight: CELL_GAP,
  },

  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: CALENDAR_WIDTH,
    alignSelf: "center",
  },

  dayBox: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    marginRight: CELL_GAP,
    marginBottom: CELL_GAP,
  },

  dayBoxEmpty: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    marginRight: CELL_GAP,
    marginBottom: CELL_GAP,
  },

  selectedDay: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  dayText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },

  analytics: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    elevation: 2,
  },

  analyticsTitle: {
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 8,
    color: COLORS.primary,
  },

  analyticsText: {
    textAlign: "center",
    color: COLORS.text,
  },

  appointmentBox: {
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 3,
  },

  appointmentTitle: {
    fontWeight: "900",
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.primary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  label: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },

  value: {
    fontSize: 13,
    color: "#111",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
});