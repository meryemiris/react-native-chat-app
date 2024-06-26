import {
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	Button,
	useColorScheme,
} from "react-native";

import { SearchBar } from "react-native-elements";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

const chats = [
	{ id: 1, name: "Chat 1", image: "https://picsum.photos/200/300" },
	{ id: 2, name: "Chat 2", image: "https://picsum.photos/200/300" },
	{ id: 3, name: "Chat 3", image: "https://picsum.photos/200/300" },
	{ id: 4, name: "Chat 4", image: "https://picsum.photos/200/300" },
	{ id: 5, name: "Chat 5", image: "https://picsum.photos/200/300" },
	{ id: 6, name: "Chat 6", image: "https://picsum.photos/200/300" },
	{ id: 7, name: "Chat 7", image: "https://picsum.photos/200/300" },
	{ id: 8, name: "Chat 8", image: "https://picsum.photos/200/300" },
	{ id: 9, name: "Chat 9", image: "https://picsum.photos/200/300" },
	{ id: 10, name: "Chat 10", image: "https://picsum.photos/200/300" },
];

export default function HomeScreen() {
	const border =
		useColorScheme() === "light" ? Colors.light.border : Colors.dark.border;

	const handleSearch = () => {
		// filter chats when search term
	};

	const handleClearSearch = () => {
		// clear search term
	};

	const handleFocus = () => {
		// handle search bar focus
	};

	const handleBlur = () => {
		// handle search bar blur
	};

	const searchBgColor =
		useColorScheme() === "light"
			? Colors.light.secondaryColor
			: Colors.dark.secondaryColor;
	const textColor =
		useColorScheme() === "light" ? Colors.light.text : Colors.dark.text;

	const searchIconColor =
		useColorScheme() === "light" ? Colors.light.icon : Colors.dark.icon;

	const [search, setSearch] = useState("");

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.titleContainer}>
				<ThemedText type="title">Chats</ThemedText>
			</View>
			<SearchBar
				platform="ios"
				placeholder="Type Here..."
				onChangeText={handleSearch}
				value={search}
				containerStyle={{ backgroundColor: "transparent" }}
				inputContainerStyle={{ backgroundColor: searchBgColor }}
				inputStyle={{ color: textColor }}
				placeholderTextColor={searchIconColor}
				searchIcon={{ name: "search" }}
				clearIcon={{ name: "close" }}
				onChange={() => setSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onClear={handleClearSearch}
				loadingProps={{
					color: searchIconColor,
				}}
				showLoading={false}
				onCancel={() => {}}
				lightTheme={false}
				round={false}
				cancelButtonTitle={"Cancel"}
				cancelButtonProps={{ color: searchIconColor }}
				showCancel
			/>
			<ScrollView style={{ marginTop: 10 }}>
				{chats.map((chat) => (
					<View
						style={[styles.chatContainer, { borderBottomColor: border }]}
						key={chat.id}
					>
						<View
							style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
						>
							<Image
								style={{ width: 50, height: 50, borderRadius: 25 }}
								source={{ uri: chat.image }}
							/>
							<ThemedText type="defaultSemiBold">{chat.name}</ThemedText>
						</View>
						<Button title="..." onPress={() => {}} />
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
		paddingHorizontal: 10,
	},
	chatContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,

		borderBottomWidth: 0.5,
	},
});
