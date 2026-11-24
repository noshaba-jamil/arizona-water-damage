import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon built from the site's approved Premium Professional Red theme
// (Primary Red #C62828, Dark Red #8E1B1B) — a "since-superseded" note used
// to live here flagging a mismatch with an earlier navy/blue/orange brief;
// the red theme document confirmed this palette is the correct, intentional
// direction, so the favicon now matches it directly.
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
          background: "#111111",
          borderRadius: 8,
        }}
      >
        {/* Teardrop via a rotated square with 3 rounded corners — a
            standard CSS technique, reliable in satori/ImageResponse
            unlike complex inline SVG path data. */}
        <div
          style={{
            width: 16,
            height: 16,
            background: "linear-gradient(135deg, #C62828, #8E1B1B)",
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
