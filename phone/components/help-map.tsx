import { IndexHelpResponse } from "@/lib/api/help";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useLocationStore } from "@/store/useCurrentGet";
import { useEffect, useRef } from "react";
import { ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  handleMarker: (id: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  markers: IndexHelpResponse[];
}

type MarkerRef = React.ComponentRef<typeof Marker>;
export function HelpMap({ handleMarker, selectedId, setSelectedId, markers } : Props) {
  const mapRef = useRef<MapView>(null);
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);

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
      500
    );
    markerRefs.current[selectedId]?.showCallout();
  }, [selectedId]);

  // 現在地が取得できていない場合はローディング
  if (latitude === null || longitude === null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
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
          title={marker.message}
          description={timeAgo(marker.createAt)}
          pinColor={marker.status === "in_progress" ? "blue" : "orange"}
          onPress={() => {
            setSelectedId(marker.id);
            handleMarker(marker.id);
          }}
        />
      ))}

      {/* 現在地マーカー */}
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        title="現在地"
        pinColor="red"
      />
    </MapView>
  );
}
