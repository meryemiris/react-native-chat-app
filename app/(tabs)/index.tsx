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

const chats: Chat[] = [
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

	const [search, setSearch] = useState<string>("");
	let rowRefs = new Map();

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

	const renderActions = (dragX: any) => {
		const scale = dragX.interpolate({
			inputRange: [-3000, -80, 0],
			outputRange: [2, 1, 0],
			extrapolate: "clamp",
		});
		// const closeSwipeable = () => {
		// 	swipeableRef.current?.reset();
		// };

		return (
			<TouchableOpacity
				activeOpacity={0.8}
				// onPress={() => closeSwipeable}
				style={styles.actionContainer}
			>
				<Animated.View
					style={[
						{
							transform: [{ scale }],
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: swipeableBg,
							width: 80,
							height: 80,
						},
					]}
				>
					<Ionicons
						style={{ color: textColor }}
						size={28}
						name="ellipsis-horizontal-outline"
					/>
					<ThemedText type="default">More</ThemedText>
				</Animated.View>
			</TouchableOpacity>
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
						loadingProps={{
							color: iconColor,
						}}
						showLoading={false}
						lightTheme={false}
						cancelButtonTitle={"Cancel"}
						cancelButtonProps={{ color: iconColor }}
						showCancel
					/>
					<ScrollView style={{ marginTop: 10 }}>
						{chats.map((chat) => (
							<Swipeable
								friction={1}
								key={chat.id}
								ref={(ref) => {
									if (ref && !rowRefs.get(chat.id)) {
										rowRefs.set(chat.id, ref);
									}
								}}
								renderRightActions={(progress, dragX) => renderActions(dragX)}
								// close open swiables when opening new one
								onSwipeableWillOpen={() => {
									[...rowRefs.entries()].forEach(([key, ref]) => {
										if (key !== chat.id && ref) ref.close();
									});
								}}
							>
								<View
									style={[styles.chatContainer, { borderBottomColor: border }]}
								>
									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
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
	actionContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 80,
	},
});
