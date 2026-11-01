const LOGO_ASPECT_RATIO = 386 / 80;

/** `alt` carries the brand name, so links wrapping the logo stay named. */
export function Logo({ height = 40 }: { height?: number }) {
  return (
    <img
      className="logo"
      src="/assets/branding/logo.svg"
      alt="ChilloCafé"
      width={Math.round(height * LOGO_ASPECT_RATIO)}
      height={height}
    />
  );
}
