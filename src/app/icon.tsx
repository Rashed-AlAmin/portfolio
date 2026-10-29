import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "linear-gradient(135deg, #6ad2f0, #f0b860)",
          color: "#0d1220",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        RA
      </div>
    ),
    size,
  );
}
