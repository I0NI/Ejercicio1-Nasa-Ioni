import { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image } from "expo-image";
import PhotoCard from "../components/PhotoCard";
import { API_KEY, BASE_URL, DEFAULT_EARTH_DATE } from "../constants/api";

const FALLBACK = {
  photos: [
    {
      id: 102685,
      sol: 1004,
      camera: {
        id: 20,
        name: "FHAZ",
        rover_id: 5,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FLB_486615455EDR_F0481570FHAZ00323M_.JPG",
      earth_date: "2015-06-03",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 102686,
      sol: 1004,
      camera: {
        id: 20,
        name: "FHAZ",
        rover_id: 5,
        full_name: "Front Hazard Avoidance Camera",
      },
      img_src:
        "https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG",
      earth_date: "2015-06-03",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 102842,
      sol: 1004,
      camera: {
        id: 21,
        name: "RHAZ",
        rover_id: 5,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/rcam/RLB_486615482EDR_F0481570RHAZ00323M_.JPG",
      earth_date: "2015-06-03",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
    {
      id: 102843,
      sol: 1004,
      camera: {
        id: 21,
        name: "RHAZ",
        rover_id: 5,
        full_name: "Rear Hazard Avoidance Camera",
      },
      img_src:
        "https://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/rcam/RRB_486615482EDR_F0481570RHAZ00323M_.JPG",
      earth_date: "2015-06-03",
      rover: {
        id: 5,
        name: "Curiosity",
        landing_date: "2012-08-06",
        launch_date: "2011-11-26",
        status: "active",
      },
    },
  ],
};

export default function HomeScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loadedOnce = useRef(false);
  const insets = useSafeAreaInsets();

  const fetchPhotos = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const url = `${BASE_URL}?earth_date=${DEFAULT_EARTH_DATE}&api_key=${API_KEY}`;
      const res = await fetch(url);
      if (res.status === 429) {
        setPhotos(FALLBACK.photos);
        setError("Límite de DEMO_KEY alcanzado. Mostrando muestra local.");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPhotos(data?.photos ?? []);
    } catch (e) {
      if (!photos.length) setPhotos(FALLBACK.photos);
      setError("No se pudieron cargar las fotos. (Muestra local)");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [photos.length]);

  useEffect(() => {
    if (loadedOnce.current) return;
    loadedOnce.current = true;
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    <LinearGradient
      colors={["#030814", "#07152a", "#0b1a2b"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={["top"]} style={{ paddingTop: insets.top }}>
        <LinearGradient
          colors={["#041b3f", "#083a7a", "#0a4b9a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png",
            }}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.title}>NASA Mars Photos</Text>
          <Text style={styles.subtitle}>Curiosity — {DEFAULT_EARTH_DATE}</Text>
        </LinearGradient>
      </SafeAreaView>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Cargando fotos…</Text>
        </View>
      ) : (
        <>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <FlatList
            data={photos}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            columnWrapperStyle={{ gap: 16, paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 28 }}
            initialNumToRender={6}
            windowSize={7}
            renderItem={({ item }) => (
              <PhotoCard
                photo={item}
                onPress={() =>
                  navigation.navigate("PhotoDetail", { photo: item })
                }
              />
            )}
          />
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  logo: { width: 40, height: 40, marginBottom: 6, opacity: 0.95 },
  title: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#cfe2ff",
    marginTop: 4,
    fontSize: 14,
    opacity: 0.9,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { color: "#d7e6ff", marginTop: 8 },
  error: {
    color: "#ffd6d6",
    fontSize: 13,
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 8,
  },
});
