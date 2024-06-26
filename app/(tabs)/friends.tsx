import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, Text, View } from "react-native";

export default function ProfileScreen() {
	return (
		<SafeAreaView
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<ThemedText style={{ color: Colors.light.text }}>Friends</ThemedText>
		</SafeAreaView>
	);
}
