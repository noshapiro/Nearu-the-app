import { Tabs } from 'expo-router';
import { TabBar } from '@/components/navigation/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarLabel: 'Chat' }} />
      <Tabs.Screen name="memory" options={{ title: 'Memory', tabBarLabel: 'Memory' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarLabel: 'Discover' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
