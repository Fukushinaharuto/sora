import { Footer } from "@/components/footer";
import { HelpMap } from "@/components/help-map";
import { helps } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { useCreateAssignments, useIndexHelp } from "@/lib/hooks/useHelp";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useUserStore } from "@/store/useUserStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Linking, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Index() {  
  const insets = useSafeAreaInsets();
  const { city_id } = useLocalSearchParams<{ city_id: string }>();
  const { tasks, isLoading: indexHelpIsLoading, mutate } = useIndexHelp(Number(city_id));
  const { submit, isLoading } = useCreateAssignments();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemLayouts = useRef<Record<number, number>>({});
  const [refreshing, setRefreshing] = useState(false); 

  const handleMarker = (id: number) => {
    if (scrollRef.current) {
      const y = itemLayouts.current[id];
      if (y != null) {
        scrollRef.current?.scrollTo({ y: Math.max(y - 20, 0), animated: true });
      }
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await mutate(); // SWRのデータを再取得
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
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
  const user = useUserStore((state) => state.user); 
  useEffect(() => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "この機能を利用するにはログインが必須です。",
      });
      router.push("/auth");
    }
  }, [user]);

  if (indexHelpIsLoading || isLoading || !user) return null;
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
          <HelpMap  markers={tasks} handleMarker={handleMarker} selectedId={selectedId} setSelectedId={setSelectedId}/>
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

        <ScrollView 
          showsVerticalScrollIndicator={false} 
          ref={scrollRef}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary} // iOS用の色
              colors={[colors.primary]} // Android用の色
            />
          }
        >
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
                  <View className="flex-row justify-start items-center mb-2">
                    <View>
                      <Text className="font-bold">{task.name}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-2 mb-3">
                    <helps.LocationIcon size={16} color={colors.primaryLight} />
                    <Text className="text-primaryLight text-sm">
                      {task.address}
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <helps.TimeIcon size={12} color={colors.blackLight} />
                      <Text className="text-blackLight text-xs">
                        {timeAgo(task.createAt)}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-black mb-3">{task.message}</Text>
                  <View className="flex-row items-center gap-2 mb-3">
                    {task.helpersCount === 0 ?  (
                      <>
                        <helps.TimeIcon size={14} color={colors.orange} />
                        <Text className="text-sm text-orange font-bold">まだ誰も向かっていません</Text>
                      </>
                    ) : (
                      <>
                        <helps.HelperIcon size={14} color={colors.mapIconBlue} />
                        <Text className="text-sm text-mapIconBlue font-bold">{task.helpersCount}人が向かっています</Text>
                      </>
                    )}
                    
                  </View>
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={() => openRoute(task.latitude, task.longitude)}
                      className="flex-row flex-1 gap-2 border border-borderColor rounded-lg py-2 items-center justify-center"
                    >
                      <helps.CurrentLocationIcon size={16} color={colors.primary} />
                      <Text className="text-primary font-bold">経路案内</Text>
                    </TouchableOpacity>

                    {!task.isHelping && (
                      <TouchableOpacity 
                        className="flex-1 bg-blue-500 rounded-lg py-2 items-center"
                        onPress={() => submit( Number(city_id) , task.id, )}
                      >
                        <Text className="text-white font-bold">向かう</Text>
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
