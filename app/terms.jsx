import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";

const termsContent = [
  {
    title: "1. Purpose",
    body:
      "Hear Me Out is an anonymous, peer-driven emotional support system for the students of STI Global City. This service does not replace professional counseling or medical care.",
  },
  {
    title: "2. Eligibility",
    body:
      "This app is accessible only to current students at STI Global City. Accounts will be deactivated upon graduation, transfer, or inactivity.",
  },
  {
    title: "3. User Responsibilities",
    body:
      "Use this app respectfully and responsibly. Keep personal information private. Do not post offensive content or violate anonymity. Report inappropriate behavior immediately.",
  },
  {
    title: "4. Anonymity",
    body:
      "Users are assigned anonymous identifiers. Sharing of real names, contact information, or social media links is not allowed. The system automatically removes personal identifiers and patterns in messages.",
  },
  {
    title: "5. Monitoring",
    body:
      "Flagged content or identity verification is accessible to guidance, disciplinary, or registrar personnel. Chats that were inactive are not saved, unless reported.",
  },
  {
    title: "6. Reporting & Discipline",
    body:
      "Avoid publishing any harmful content, misrepresentation, or bullying of the community. Most violations have disciplinary or even legal consequences.",
  },
  {
    title: "7. Emergency Support (Regulator)",
    body:
      "Alerts the Guidance Office and passes on campus resources. Does not replace medical or police emergency procedures.",
  },
  {
    title: "8. Privacy & Data Protection",
    body:
      "Complies with RA 9728 (Data Privacy Act). Collects: ID codes, mood entries, Random Wall posts, flagged chats, and device metadata. Data is retained for 365 days and accessible only with authorized permission. Regular chats are not stored. Flagged content is retained.",
  },
  {
    title: "9. Acceptable Use",
    body:
      "Avoid publishing harmful, false, or offensive content. Violations may result in disciplinary action.",
  },
  {
    title: "10. Intellectual Property",
    body:
      "All contents of this app are owned by the developers and STI Global City. Reproduction is unauthorized.",
  },
  {
    title: "11. No Professional Liability",
    body:
      "This app provides peer support only. Developers are not responsible for outcomes from peer interactions. Seek professional help if in severe distress.",
  },
  {
    title: "12. Availability of the System",
    body:
      "The app might be unavailable at times due to maintenance. Developers are not responsible for temporary unavailability.",
  },
  {
    title: "13. Changes to Terms",
    body:
      "Terms are subject to change. Users will be notified before changes take effect.",
  },
  {
    title: "14. Termination",
    body:
      "Accounts may be suspended or terminated due to violations, safety concerns, or administrative action.",
  },
];

export default function TermsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>TERMS & CONDITIONS</Text>
        <Text style={styles.subtitle}>
          Please read carefully before continuing
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {termsContent.map((item, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemBody}>{item.body}</Text>
          </View>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.doneBtn} onPress={() => router.replace("/login")}>
          <Text style={styles.doneBtnText}>DONE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    backgroundColor: COLORS.card,
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.muted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  item: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemTitle: {
    fontWeight: "700",
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 6,
  },
  itemBody: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
  },
  footer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  doneBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1.5,
  },
});