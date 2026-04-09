import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Logo from "../components/logo";
import COLORS from "../constants/colors";
import InvalidModal from "../components/invalid-modal";
import GlobalStyles from "../constants/GlobalStyles";
import { validateUser } from "../constants/user";

export default function LoginScreen() {
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Please agree to the terms and conditions first."
  );

  function handleLogin() {
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      setInvalid(true);
      return;
    }

    const user = validateUser(email, password);

    if (!user) {
      setErrorMsg("Invalid email or password.");
      setInvalid(true);
      return;
    }

    if (!agree) {
      setErrorMsg("Please agree to the terms and conditions first.");
      setInvalid(true);
      return;
    }

    router.replace("/assessment");
  }

  return (
    <ScrollView
      contentContainerStyle={GlobalStyles.screenBg}
      keyboardShouldPersistTaps="handled"
    >
      <View style={GlobalStyles.card}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Logo size={76} />

        <Text style={GlobalStyles.screenTitle}>LOGIN</Text>

        <Text style={GlobalStyles.label}>Email</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Enter email"
          placeholderTextColor={COLORS.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.hint}>Example: user@email.com</Text>

        <Text style={GlobalStyles.label}>Password</Text>
        <View style={styles.pwRow}>
          <TextInput
            style={[GlobalStyles.input, styles.pwInput]}
            placeholder="Enter password"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showPw}
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={styles.eyeBtn}
            onPress={() => setShowPw(!showPw)}
          >
            <Ionicons
              name={showPw ? "eye" : "eye-off"}
              size={22}
              color={COLORS.muted}
            />
          </Pressable>
        </View>

        <Pressable style={styles.checkRow} onPress={() => setAgree(!agree)}>
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <Text style={styles.checkLabel}>
            I agree to the{" "}
            <Text
              style={GlobalStyles.link}
              onPress={() => router.push("/terms")}
            >
              terms and conditions
            </Text>
          </Text>
        </Pressable>

        <Pressable style={GlobalStyles.btn} onPress={handleLogin}>
          <Text style={GlobalStyles.btnText}>LOGIN</Text>
        </Pressable>

        <Text style={GlobalStyles.centerText}>
          Don’t have an account?{" "}
          <Text
            style={GlobalStyles.link}
            onPress={() => router.push("/register")}
          >
            Sign up
          </Text>
        </Text>

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
  hint: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 3,
  },
  back: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 4,
  },
  backText: {
    fontSize: 26,
    color: COLORS.primary,
    fontWeight: "700",
    lineHeight: 26,
  },
  pwRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pwInput: {
    flex: 1,
    paddingRight: 44,
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBg,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  checkLabel: {
    fontSize: 12,
    color: COLORS.muted,
    flex: 1,
  },
});