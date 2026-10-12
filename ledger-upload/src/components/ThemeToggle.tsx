import type { Palette, ThemeName } from "../types";
import { STRINGS } from "../constants/strings";
import { S } from "../styles/styles";

export function ThemeToggle({
  theme,
  onToggle,
  palette,
}: {
  theme: ThemeName;
  onToggle: () => void;
  palette: Palette;
}) {
  return (
    <button
      className="ghost themebtn"
      onClick={onToggle}
      aria-label={STRINGS.theme.ariaToggle}
      style={{ ...S.themeBtn, borderColor: palette.line, color: palette.dim }}
    >
      {theme === "dark" ? STRINGS.theme.toLight : STRINGS.theme.toDark}
    </button>
  );
}
