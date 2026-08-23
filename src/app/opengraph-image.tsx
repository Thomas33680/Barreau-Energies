import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1a1712",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <div style={{ width: 96, height: 22, borderRadius: 11, backgroundColor: "#2454d9" }} />
          <div style={{ width: 96, height: 22, borderRadius: 11, backgroundColor: "#3f8e45" }} />
          <div style={{ width: 96, height: 22, borderRadius: 11, backgroundColor: "#d6870f" }} />
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#c9c4b6",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Barreau Énergies
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 60,
            fontWeight: 800,
            color: "#faf8f3",
            maxWidth: 950,
            lineHeight: 1.15,
            display: "flex",
          }}
        >
          Les systèmes techniques de votre habitat, maîtrisés.
        </div>
      </div>
    ),
    { ...size }
  );
}
