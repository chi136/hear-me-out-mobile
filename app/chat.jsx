import {View, Text, TextInput, Pressable, FlatList, StyleSheet,} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import COLORS from "../constants/colors";

export default function ChatScreen() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage() {
  if (message.trim() === "") return;

  const newMessage = {
    id: Date.now().toString(),
    text: message,
    sender: "me",
  };

  setMessages((prev) => [...prev, newMessage]);
  setMessage("");
}

  function generateReply(msg) {
    const text = msg.toLowerCase();

    if (text.includes("sad") || text.includes("😢")) {
      return "I'm here for you. Do you want to talk about it?";
    }
    if (text.includes("angry") || text.includes("😡")) {
      return "I understand. Want to share what happened?";
    }
    if (text.includes("hi") || text.includes("hello")) {
      return "Hi! How are you feeling today?";
    }

    return "I'm listening. Tell me more.";
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Chat</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageWrapper,
              item.sender === "me"
                ? styles.alignRight
                : styles.alignLeft,
            ]}
          >
            <View
              style={[
                styles.message,
                item.sender === "me"
                  ? styles.myMsg
                  : styles.otherMsg,
              ]}
            >
              <Text
                style={{
                  color: item.sender === "me" ? "#fff" : "#000",
                }}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={COLORS.muted}
          value={message}
          onChangeText={setMessage}
        />

        <Pressable style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 10,
  },

  backText: {
    fontSize: 22,
    color: COLORS.primary,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    alignItems: "center",
    color: COLORS.primary,
  },

  messageWrapper: {
    marginVertical: 4,
    flexDirection: "row",
  },

  alignLeft: {
    justifyContent: "flex-start",
  },

  alignRight: {
    justifyContent: "flex-end",
  },

  message: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
  },

  myMsg: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 4,
  },

  otherMsg: {
    backgroundColor: "#E5E5EA",
    borderTopLeftRadius: 4,
  },

  typingText: {
    fontSize: 12,
    color: COLORS.muted,
    marginLeft: 16,
    marginBottom: 5,
  },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },

  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "700",
  },
});