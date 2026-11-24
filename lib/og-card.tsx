import { ImageResponse } from "next/og";
import { SITE } from "@/content/site-config";

export const OG_SIZE = { width: 1200, height: 630 };

// A text-only brand card (no stock photography). Replace with a real photo-based card whenever you have one.
export function ogCard() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111111", padding: "60px 72px", color: "#ffffff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", width: 84, height: 84, borderRadius: 20, background: "#1C1414", alignItems: "center", justifyContent: "center", marginRight: 24 }}>
            <div style={{ width: 42, height: 42, background: "linear-gradient(135deg, #C62828, #8E1B1B)", borderRadius: "50% 50% 50% 0", transform: "rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE.name}</div>
            <div style={{ fontSize: 22, color: "#B0B0B0", letterSpacing: 3 }}>RESTORATION &amp; RECOVERY</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.05, marginBottom: 18 }}>24/7 Emergency Water Damage Restoration</div>
          <div style={{ fontSize: 30, color: "#E0E0E0" }}>Maricopa · Pima · Pinal Counties, Arizona</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", background: "#C62828", borderRadius: 16, padding: "14px 32px", fontSize: 44, fontWeight: 700 }}>{`Call ${SITE.phone}`}</div>
          <div style={{ display: "flex", fontSize: 26, color: "#B0B0B0" }}>{SITE.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
