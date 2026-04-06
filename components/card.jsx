import { View } from "react-native";
import COLORS from "../constants/colors";

export default function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.card,
          borderRadius: 24,
          padding: 24,
          width: "90%",
          alignSelf: "center",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 5,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}