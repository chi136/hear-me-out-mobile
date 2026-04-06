import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";

export default function InvalidModal({
  visible,
  onClose,
  message = "The student number or password you entered is invalid.",
}) {
  return (
    <Modal
    transparent={true}
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}
  >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.message}>{message}</Text>

          <Pressable style={styles.btn} onPress={onClose}>
            <Text style={styles.btnText}>OKAY</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    width: 260,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  message: {
    color: COLORS.text,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1.2,
  },
});