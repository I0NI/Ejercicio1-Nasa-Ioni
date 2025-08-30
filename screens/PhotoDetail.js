import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";

// HTTPS para web
const toHttps = (u) =>
  u?.startsWith("http://") ? u.replace("http://", "https://") : u;

const BLURHASH = "L6P%XU~qM_ay-;M{M{fQ%gRjM{fQ}";

export default function PhotoDetail({ route }) {
  const { photo } = route.params || {};
  if (!photo) return null;

  const { img_src, camera, rover, earth_date, id, sol } = photo;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#08172b" }}
      contentContainerStyle={{ paddingBottom: 28 }}
    >
      <View style={styles.heroWrap}>
        <Image
          source={{ uri: toHttps(img_src) }}
          style={styles.hero}
          contentFit="contain"
          transition={250}
          placeholder={BLURHASH}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.title}>Detalle de la captura</Text>

        {/* Badges */}
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{camera?.name}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{earth_date}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{rover?.name}</Text>
          </View>
        </View>

        <Text style={styles.row}>
          <Text style={styles.label}>ID:</Text> {id}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Sol:</Text> {sol}
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Cámara:</Text> {camera?.full_name} (
          {camera?.name})
        </Text>
        <Text style={styles.row}>
          <Text style={styles.label}>Fecha (Tierra):</Text> {earth_date}
        </Text>
        <Text style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.label}>Rover:</Text> {rover?.name} — estado{" "}
          {rover?.status}
        </Text>
        <Text style={styles.small}>
          Lanzamiento: {rover?.launch_date} | Aterrizaje: {rover?.landing_date}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    backgroundColor: "#000",
    margin: 14,
    borderRadius: 18,
    overflow: "hidden",
    // sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  hero: { width: "100%", height: 380, backgroundColor: "#000" },
  panel: {
    backgroundColor: "#0f2137",
    borderRadius: 18,
    marginHorizontal: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  title: { color: "#fff", fontWeight: "800", fontSize: 18, marginBottom: 10 },
  row: { color: "#d8e7ff", marginTop: 2, lineHeight: 20 },
  label: { fontWeight: "800", color: "#fff" },
  small: { color: "#9fb6d6", marginTop: 6, fontSize: 12 },
  badges: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  badge: {
    backgroundColor: "#1a3a60",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
