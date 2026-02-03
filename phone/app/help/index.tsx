import { Footer } from "@/components/footer";
import { HelpMap } from "@/components/help-map";
import { helps } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Linking, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  
  
  const insets = useSafeAreaInsets();
  const tasks = [
    { id: 1, name: "田中太郎", time: "3分前", status: "waiting", latitude: 35.2005, longitude: 137.0317, is_helped: true },
    { id: 2, name: "佐藤花子", time: "8分前", status: "in_progress", latitude: 35.2365, longitude: 137.0317, is_helped: false },
    { id: 3, name: "鈴木一郎", time: "15分前", status: "waiting", latitude: 35.2600, longitude: 137.0317, is_helped: true },
    { id: 4, name: "福品", time: "8分前", status: "in_progress", latitude: 35.2901, longitude: 137.0317, is_helped: false },
    { id: 5, name: "epona", time: "15分前", status: "waiting", latitude: 35.2203, longitude: 137.0317, is_helped: false },
    { id: 6, name: "公民館", time: "15分前", status: "waiting", latitude: 35.2264, longitude: 137.0460, is_helped: false },
  ];
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<Record<number, number>>({});

  const handleMarker = (id: number) => {
    if (scrollRef.current) {
      const y = itemLayouts.current[id];
      if (y != null) {
        scrollRef.current?.scrollTo({ y: Math.max(y - 20, 0), animated: true });
      }
    }
  };


  const openRoute = (lat: number, lng: number) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`,
      android: `google.navigation:q=${lat},${lng}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  }

  return (
    <>
    <SafeScreen changeBackgroundColor="white" paddingX={0}>
      <View 
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        className="gap-2 bg-white border-b border-borderColor px-[20px] pb-6 z-10"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Math.max(insets.top, 20),
        }}
      >
        <View className="mt-3 flex-row items-center justify-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <helps.ArrowLeftIcon size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-center text-2xl font-bold">
            助け要請一覧
          </Text>
        </View>
      </View>
      {/* マッププレビュー */}
      <View
        style={{
          marginTop: Math.max(headerHeight - insets.top, 0),
        }}
      >
        <View className="h-[300px] overflow-hidden">
          <HelpMap handleMarker={handleMarker} selectedId={selectedId} setSelectedId={setSelectedId}/>
        </View>
      </View>

      {/* リストエリア（ここだけスクロール） */}
      <View 
        className="flex-1 px-[20px] pb-4"
        style={{
          marginBottom: Math.max(footerHeight - insets.bottom, 0),
        }}
      >
        <Text className="text-sm text-primaryLight font-bold my-4">
          直近の助け要請 ({tasks.length}件)
        </Text>

        <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
          {tasks.map((task) => {
            const isWaiting = task.status === "waiting";
            const isSelected = selectedId === task.id;

            return (
              <TouchableOpacity
                key={task.id}
                onPress={() => setSelectedId(task.id)}
                activeOpacity={0.8}
                onLayout={(e) => {
                  itemLayouts.current[task.id] = e.nativeEvent.layout.y;
                }}
              >
                <View
                  className={`rounded-xl p-4 mb-3 shadow border ${
                    isSelected ? "border-blue-500 bg-blue-50" : "border-borderColor bg-white"
                  }`}
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center gap-2">
                      <View className="h-9 w-9 rounded-full bg-borderColor items-center justify-center">
                        <helps.ProfileIcon size={24} color={colors.primary} />
                      </View>
                      <View>
                        <Text className="font-bold">{task.name}</Text>
                        <View className="flex-row items-center gap-1">
                          <helps.TimeIcon size={12} color={colors.blackLight} />
                          <Text className="text-blackLight text-xs">
                            {task.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      className={`px-2 py-1 rounded-full ${
                        isWaiting ? "bg-orange-100" : "bg-blue-100"
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          isWaiting ? "text-orange-600" : "text-blue-600"
                        }`}
                      >
                        {isWaiting ? "対応待ち" : "対応中"}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-2">
                    <helps.LocationIcon size={16} color={colors.primaryLight} />
                    <Text className="text-primaryLight text-sm mb-3">
                      東京都新宿区...
                    </Text>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => openRoute(task.latitude, task.longitude)}
                      className="flex-row flex-1 gap-2 border border-borderColor rounded-lg py-2 items-center justify-center"
                    >
                      <helps.CurrentLocationIcon size={16} color={colors.primary} />
                      <Text className="text-primary font-bold">経路案内</Text>
                    </TouchableOpacity>

                    {isWaiting && (
                      <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg py-2 items-center">
                        <Text className="text-white font-bold">対応する</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>);
            
          })}
        </ScrollView>
      </View>
      <Footer setFooterHeight={setFooterHeight}/>
    </SafeScreen>
    </>
  );
}
