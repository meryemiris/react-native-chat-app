import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Chats",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "chatbox" : "chatbox-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="friends"
					options={{
						title: "Friends",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "people" : "people-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "person" : "person-outline"}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</GestureHandlerRootView>
	);
}
