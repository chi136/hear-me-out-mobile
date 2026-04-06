import { StyleSheet } from "react-native";
import COLORS from "./colors";

const GlobalStyles = StyleSheet.create({
  screenBg: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 28,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },

  label: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
  },

  input: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },

  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 12,
  },

  btnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1.5,
  },

  link: {
    color: COLORS.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
    fontSize: 13,
  },

  centerText: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 14,
  },

  screenTitle: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 16,
    marginTop: 4,
  },
});

export default GlobalStyles;