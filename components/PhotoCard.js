import { Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";

const toHttps = (u) =>
  u?.startsWith("http://") ? u.replace("http://", "https://") : u;

const sideFromUrl = (u) => {
  if (!u) return "";
  const s = u.toUpperCase();
  if (s.includes("FHAZ") || s.includes("/FCAM/")) {
    if (s.includes("_FLB_")) return " (Left)";
    if (s.includes("_FRB_")) return " (Right)";
  }
  if (s.includes("RHAZ") || s.includes("/RCAM/")) {
    if (s.includes("_RLB_")) return " (Left)";
    if (s.includes("_RRB_")) return " (Right)";
  }
  return "";
};

const BLURHASH = "L6P%XU~qM_ay-;M{M{fQ%gRjM{fQ";

export default function PhotoCard({ photo, onPress }) {
  const { camera, earth_date, img_src } = photo;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image
        source={{ uri: toHttps(img_src) }}
        style={styles.image}
        contentFit="cover"
        transition={200}
        placeholder={BLURHASH}
      />
      <BlurView intensity={30} tint="dark" style={styles.overlay}>
        <Text numberOfLines={1} style={styles.camera}>
          {(camera?.full_name || camera?.name) + sideFromUrl(img_src)}
        </Text>
        <Text style={styles.date}>{earth_date}</Text>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.02)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  cardPressed: { transform: [{ scale: 0.98 }], opacity: 0.96 },
  image: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#0b1a2b",
  },
  overlay: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  camera: { color: "#fff", fontWeight: "800", letterSpacing: 0.2 },
  date: { color: "#c4d3ea", fontSize: 12, marginTop: 2 },
});
