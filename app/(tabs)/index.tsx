import React, { useState } from "react";
import {
	Image,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	useColorScheme,
	Animated,
	TouchableWithoutFeedback,
	Text,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Chat {
	id: number;
	name: string;
	image: string;
}

const chatsList: Chat[] = [
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
	const [chats, setChats] = useState<Chat[]>(chatsList);
	const [search, setSearch] = useState<string>("");

	const rowRefs = new Map<number, Swipeable>();

	const handleSearch = (searchTerm: string) => {
		setSearch(searchTerm);
	};

	const handleClearSearch = () => {
		setSearch("");
	};

	const handleFocus = () => {
		// handle search bar focus
	};

	const handleBlur = () => {
		// handle search bar blur
	};

	const handleDeleteChat = (chatId: number) => {
		setChats(chats.filter((chat) => chat.id !== chatId));
	};

	const border =
		useColorScheme() === "light" ? Colors.light.border : Colors.dark.border;

	const searchBgColor =
		useColorScheme() === "light"
			? Colors.light.secondaryColor
			: Colors.dark.secondaryColor;
	const textColor =
		useColorScheme() === "light" ? Colors.light.text : Colors.dark.text;

	const iconColor =
		useColorScheme() === "light" ? Colors.light.icon : Colors.dark.icon;

	const swipeableBg =
		useColorScheme() === "light"
			? Colors.light.secondaryColor
			: Colors.dark.secondaryColor;

	const renderActions = (dragX: Animated.Value, chatId: number) => {
		const opacityMore = dragX.interpolate({
			inputRange: [-100, -60],
			outputRange: [1, 0],
			extrapolate: "clamp",
		});

		const widthDelete = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [100, 100],
			extrapolate: "clamp",
		});

		return (
			<View style={styles.actionsContainer}>
				<Animated.View
					style={[
						styles.moreButton,
						{
							opacity: opacityMore,
							backgroundColor: swipeableBg,
						},
					]}
				>
					<TouchableOpacity style={styles.moreContent}>
						<Ionicons
							style={{ color: textColor }}
							size={28}
							name="ellipsis-horizontal-outline"
						/>
						<Text style={styles.moreText}>More</Text>
					</TouchableOpacity>
				</Animated.View>
				<Animated.View
					style={[
						styles.deleteButton,
						{
							opacity: widthDelete,
							backgroundColor: "red",
						},
					]}
				>
					<TouchableOpacity
						onPress={() => handleDeleteChat(chatId)}
						style={styles.deleteContent}
					>
						<Ionicons name="trash-outline" size={28} color="white" />
						<Text style={styles.deleteText}>Delete</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TouchableWithoutFeedback>
				<View style={{ flex: 1 }}>
					<View style={styles.titleContainer}>
						<ThemedText type="title">Chats</ThemedText>
					</View>
					<SearchBar
						round
						onCancel={handleClearSearch}
						platform="ios"
						placeholder="Type Here..."
						onChangeText={() => handleSearch}
						value={search}
						containerStyle={{ backgroundColor: "transparent" }}
						inputContainerStyle={{ backgroundColor: searchBgColor }}
						inputStyle={{ color: textColor }}
						placeholderTextColor={iconColor}
						searchIcon={{ name: "search" }}
						clearIcon={{ name: "close" }}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onClear={handleClearSearch}
						loadingProps={{ color: iconColor }}
						showLoading={false}
						lightTheme={false}
						cancelButtonTitle={"Cancel"}
						cancelButtonProps={{ color: iconColor }}
						showCancel
					/>
					<ScrollView style={{ marginTop: 10 }}>
						{chats.map((chat) => (
							<Swipeable
								key={chat.id}
								ref={(ref) => {
									if (ref && !rowRefs.get(chat.id)) {
										rowRefs.set(chat.id, ref);
									}
								}}
								renderRightActions={(progress, dragX) =>
									renderActions(dragX, chat.id)
								}
								onSwipeableWillOpen={() => {
									[...rowRefs.entries()].forEach(([key, ref]) => {
										if (key !== chat.id && ref) ref.close();
									});
								}}
								rightThreshold={80} // Adjust swipe threshold to activate the button
							>
								<View
									style={[styles.chatContainer, { borderBottomColor: border }]}
								>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
											flex: 1,
										}}
									>
										<Image
											style={{ width: 50, height: 50, borderRadius: 25 }}
											source={{ uri: chat.image }}
										/>
										<ThemedText type="defaultSemiBold">{chat.name}</ThemedText>
									</View>
								</View>
							</Swipeable>
						))}
					</ScrollView>
				</View>
			</TouchableWithoutFeedback>
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
	actionsContainer: {
		flexDirection: "row",
		height: "100%",
	},
	moreButton: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: 80,
	},
	moreContent: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	moreText: {
		color: "white",
		marginLeft: 10,
		fontSize: 16,
	},
	deleteButton: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: 80,
	},
	deleteContent: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	deleteText: {
		color: "white",
		marginLeft: 10,
		fontSize: 16,
	},
});
