import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";

export default function RootLayout() {
  if (Platform.OS === "android") {
    return (
      <Drawer>
        <Drawer.Screen
          name="planets"
          options={{ drawerLabel: "Planets", title: "Planets" }}
        />
        <Drawer.Screen
          name="films"
          options={{ drawerLabel: "Films", title: "Films" }}
        />
        <Drawer.Screen
          name="spaceships"
          options={{ drawerLabel: "Spaceships", title: "Spaceships" }}
        />
      </Drawer>
    );
  }

  return (
    <Tabs>
      <Tabs.Screen name="planets" options={{ title: "Planets" }} />
      <Tabs.Screen name="films" options={{ title: "Films" }} />
      <Tabs.Screen name="spaceships" options={{ title: "Spaceships" }} />
    </Tabs>
  );
}
