import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  // const setUser = useUserStore((state) => state.setUser);

  // useEffect(() => {
  //   const init = async () => {
  //     // 通知
  //     // await Notifications.requestPermissionsAsync();

  //     // トークン復元
  //     const token = await SecureStore.getItemAsync('accessToken');

  //     if (token) {
  //       const res = await fetch('/me', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!res.ok) return;
  //       const user = await res.json();
  //       setUser(user);
        
  //     }
  //   };

  //   init();
  // }, [setUser]);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
