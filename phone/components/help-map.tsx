import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

interface Props {
  handleMarker: (id: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number) => void;
}

type MarkerRef = React.ComponentRef<typeof Marker>;

export function HelpMap({ handleMarker, selectedId, setSelectedId } : Props) {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      // 位置情報の権限をリクエスト
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("位置情報の使用が許可されていません");
        return;
      }

      // 現在地を取得
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);
  const markers = [
    { id: 1, name: "田中太郎", time: "3分前", status: "waiting", latitude: 35.2005, longitude: 137.0317, is_helped: true },
    { id: 2, name: "佐藤花子", time: "8分前", status: "in_progress", latitude: 35.2365, longitude: 137.0317, is_helped: false },
    { id: 3, name: "鈴木一郎", time: "15分前", status: "waiting", latitude: 35.2600, longitude: 137.0317, is_helped: true },
    { id: 4, name: "福品", time: "8分前", status: "in_progress", latitude: 35.2901, longitude: 137.0317, is_helped: false },
    { id: 5, name: "epona", time: "15分前", status: "waiting", latitude: 35.2203, longitude: 137.0317, is_helped: false },
    { id: 6, name: "公民館", time: "15分前", status: "waiting", latitude: 35.2264, longitude: 137.0460, is_helped: false },
  ];
  const shinjukuPolygon = [
    { latitude: 35.705, longitude: 137.000 },
    { latitude: 35.690, longitude: 137.500 },
    { latitude: 35.670, longitude: 137.600 },
    { latitude: 35.680, longitude: 137.690 },
  ];

  const markerRefs = useRef<Record<number, MarkerRef | null>>({});



  useEffect(() => {
    if (selectedId == null) return;
  
    const target = markers.find(m => m.id === selectedId);
    if (!target || !mapRef.current) return;
  
    mapRef.current.animateToRegion(
      {
        latitude: target.latitude,
        longitude: target.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500 // アニメーション時間(ms)
    );
    markerRefs.current[selectedId]?.showCallout();
  }, [selectedId]);

  
  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 35.2405,     // 🗺️ 尾張旭市中心
        longitude: 137.0317,
        latitudeDelta: 0.01,   // 街レベル表示（新宿と同じ縮尺）
        longitudeDelta: 0.01,
      }}
      
    >
      <Polygon
        coordinates={shinjukuPolygon}
        strokeColor="rgba(0,122,255,0.8)"
        fillColor="rgba(0,122,255,0.15)"
        strokeWidth={2}
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          ref={(ref) => {
            markerRefs.current[marker.id] = ref;
          }}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
          description={marker.time}
          pinColor={marker.is_helped ? "blue" : "orange"}
          onPress={() => {
            setSelectedId(marker.id);
            handleMarker(marker.id);
          }
        }
        />
      ))}
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="現在地"
      />
    </MapView>

  );
}
