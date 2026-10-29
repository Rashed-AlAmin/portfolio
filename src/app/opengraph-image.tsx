import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "public", profile.photo), "base64");
const photoSrc = `data:image/jpeg;base64,${photo}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 15% 0%, #12385a 0%, #0d1220 55%), #0d1220",
          color: "#eef2f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#9fb0c8",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#34d399" }} />
            {profile.location}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginTop: 24, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 36, marginTop: 18, color: "#6ad2f0" }}>{profile.role}</div>
          <div style={{ fontSize: 24, marginTop: 28, color: "#9fb0c8", lineHeight: 1.4 }}>
            TypeScript · React · Next.js · Node.js · FastAPI · PostgreSQL · Shopify · LLMs
          </div>
        </div>
        <img
          src={photoSrc}
          width={340}
          height={340}
          alt=""
          style={{ borderRadius: 40, objectFit: "cover", border: "6px solid rgba(255,255,255,0.08)" }}
        />
      </div>
    ),
    size,
  );
}
