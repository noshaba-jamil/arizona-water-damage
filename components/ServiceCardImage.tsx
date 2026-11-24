import {
  IconSiren, IconCloudRain, IconDrop, IconPump, IconFan, IconPipeBurst,
  IconCeilingDrip, IconDrainWarning, IconMoldSpots, IconBuilding, IconDocShield,
} from "./Icons";

// Maps each real service slug to a distinct, thematically-related icon.
// These are illustrative vector graphics (SVG line art), not photographs —
// deliberately not styled to look like stock photography, since no real
// job-site photos of this business exist to use honestly.
const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "emergency-water-damage-arizona": IconSiren,
  "monsoon-flood-damage-arizona": IconCloudRain,
  "flood-cleanup-arizona": IconDrop,
  "water-removal-arizona": IconPump,
  "structural-drying-dehumidification-arizona": IconFan,
  "burst-pipe-water-damage-arizona": IconPipeBurst,
  "ceiling-water-damage-arizona": IconCeilingDrip,
  "sewage-backup-cleanup-arizona": IconDrainWarning,
  "mold-remediation-arizona": IconMoldSpots,
  "commercial-water-damage-arizona": IconBuilding,
  "water-damage-insurance-claim-arizona": IconDocShield,
};

export default function ServiceCardImage({ slug, variant = 0 }: { slug: string; variant?: number }) {
  const Icon = SERVICE_ICON_MAP[slug] ?? IconDrop;
  // Rotate decorative ring position/size slightly per card so a grid of
  // these doesn't look like the exact same stamp repeated.
  const rings = [
    { top: "-20px", right: "-16px", width: "80px", height: "80px" },
    { bottom: "-24px", left: "-10px", width: "64px", height: "64px" },
    { top: "10px", left: "-18px", width: "56px", height: "56px" },
  ][variant % 3];

  return (
    <div className="service-card-image">
      <div className="deco-ring" style={rings} />
      <Icon className="main-icon" />
    </div>
  );
}
