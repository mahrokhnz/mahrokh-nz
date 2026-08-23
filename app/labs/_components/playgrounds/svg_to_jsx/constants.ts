export type OutputMode = "jsx" | "component";
export type PreviewSize = "small" | "medium" | "large";
export type PreviewBackground = "light" | "dark" | "checkerboard";

export const OUTPUT_TABS: Array<{label: string; value: OutputMode}> = [
    {label: "JSX", value: "jsx"},
    {label: "Component", value: "component"},
];

export const PREVIEW_SIZES: Array<{label: string; value: PreviewSize}> = [
    {label: "S", value: "small"},
    {label: "M", value: "medium"},
    {label: "L", value: "large"},
];

export const PREVIEW_BACKGROUNDS: Array<{label: string; value: PreviewBackground}> = [
    {label: "Light", value: "light"},
    {label: "Dark", value: "dark"},
    {label: "Grid", value: "checkerboard"},
];

export const PREVIEW_SIZE_PX: Record<PreviewSize, number> = {
    small: 48,
    medium: 96,
    large: 160,
};

export const DEFAULT_COMPONENT_NAME = "SvgIcon";

export const EXAMPLE_SVG = `<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    stroke="currentColor"
    stroke-width="2"
  />
  <path
    d="M12 8v4l2.5 2.5"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

export const SVG_INPUT_PLACEHOLDER = `Paste your SVG here...

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="..."
    fill="currentColor"
  />
</svg>`;
