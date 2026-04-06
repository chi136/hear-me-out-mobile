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

import Logo from "../components/logo";
import COLORS from "../constants/colors";
import GlobalStyles from "../constants/GlobalStyles";
import InvalidModal from "../components/invalid-modal";

import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen() {
  const [studentNum, setStudentNum] = useState("");
  const [newPw, setNewPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showRe, setShowRe] = useState(false);

  const [invalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleReset() {
    if (!studentNum || !newPw || !rePw) {
      setErrorMsg("Please fill in all fields.");
      setInvalid(true);
      return;
    }

    if (newPw !== rePw) {
      setErrorMsg("Passwords do not match.");
      setInvalid(true);
      return;
    }

    setErrorMsg("Password reset successfully!");
    setInvalid(true);

    setTimeout(() => {
      setInvalid(false);
      router.replace("/login");
    }, 1200);
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

        <Text style={[GlobalStyles.screenTitle, { fontSize: 18 }]}>
          PASSWORD RESET
        </Text>

        <Text style={styles.subtitle}>
          Enter a new password below to change your password
        </Text>

        <Text style={GlobalStyles.label}>Student Number</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Enter student number"
          placeholderTextColor={COLORS.muted}
          value={studentNum}
          onChangeText={setStudentNum}
          keyboardType="numeric"
        />

        <Text style={GlobalStyles.label}>New Password</Text>
        <View style={styles.pwRow}>
          <TextInput
            style={[GlobalStyles.input, styles.pwInput]}
            placeholder="Enter new password"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showNew}
            value={newPw}
            onChangeText={setNewPw}
          />

          <Pressable style={styles.eyeBtn} onPress={() => setShowNew(!showNew)}>
            <Ionicons
              name={showNew ? "eye" : "eye-off"}
              size={22}
              color={COLORS.muted}
            />
          </Pressable>
        </View>

        <Text style={GlobalStyles.label}>Re-enter New Password</Text>
        <View style={styles.pwRow}>
          <TextInput
            style={[GlobalStyles.input, styles.pwInput]}
            placeholder="Enter new password"
            placeholderTextColor={COLORS.muted}
            secureTextEntry={!showRe}
            value={rePw}
            onChangeText={setRePw}
          />

          <Pressable style={styles.eyeBtn} onPress={() => setShowRe(!showRe)}>
            <Ionicons
              name={showRe ? "eye" : "eye-off"}
              size={22}
              color={COLORS.muted}
            />
          </Pressable>
        </View>

        <Pressable
          style={[GlobalStyles.btn, { marginTop: 20 }]}
          onPress={handleReset}
        >
          <Text style={GlobalStyles.btnText}>RESET PASSWORD</Text>
        </Pressable>

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
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 12,
    marginTop: -8,
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
});