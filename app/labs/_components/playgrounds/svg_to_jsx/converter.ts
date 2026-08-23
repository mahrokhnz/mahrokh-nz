import {parseAndSanitizeSvg} from "./sanitize";

const ATTRIBUTE_MAP: Record<string, string> = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    readonly: "readOnly",
    maxlength: "maxLength",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    rowspan: "rowSpan",
    usemap: "useMap",
    frameborder: "frameBorder",
    contenteditable: "contentEditable",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "fill-rule": "fillRule",
    "fill-opacity": "fillOpacity",
    "clip-rule": "clipRule",
    "clip-path": "clipPath",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "enable-background": "enableBackground",
    "xml-space": "xmlSpace",
    "xml:space": "xmlSpace",
    "xml:lang": "xmlLang",
    "xmlns:xlink": "xmlnsXlink",
    "xlink:href": "xlinkHref",
    "xlink:title": "xlinkTitle",
    "xlink:show": "xlinkShow",
    "xlink:actuate": "xlinkActuate",
    "xlink:type": "xlinkType",
    "xlink:arcrole": "xlinkArcrole",
    "xlink:role": "xlinkRole",
    "color-interpolation": "colorInterpolation",
    "color-interpolation-filters": "colorInterpolationFilters",
    "color-profile": "colorProfile",
    "color-rendering": "colorRendering",
    "dominant-baseline": "dominantBaseline",
    "flood-color": "floodColor",
    "flood-opacity": "floodOpacity",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-size-adjust": "fontSizeAdjust",
    "font-stretch": "fontStretch",
    "font-style": "fontStyle",
    "font-variant": "fontVariant",
    "font-weight": "fontWeight",
    "glyph-name": "glyphName",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    "horiz-adv-x": "horizAdvX",
    "horiz-origin-x": "horizOriginX",
    "image-rendering": "imageRendering",
    "letter-spacing": "letterSpacing",
    "lighting-color": "lightingColor",
    "marker-end": "markerEnd",
    "marker-mid": "markerMid",
    "marker-start": "markerStart",
    "overline-position": "overlinePosition",
    "overline-thickness": "overlineThickness",
    "paint-order": "paintOrder",
    "panose-1": "panose1",
    "pointer-events": "pointerEvents",
    "rendering-intent": "renderingIntent",
    "shape-rendering": "shapeRendering",
    "strikethrough-position": "strikethroughPosition",
    "strikethrough-thickness": "strikethroughThickness",
    "stroke-linecap": "strokeLinecap",
    "text-anchor": "textAnchor",
    "text-decoration": "textDecoration",
    "text-rendering": "textRendering",
    "underline-position": "underlinePosition",
    "underline-thickness": "underlineThickness",
    "unicode-bidi": "unicodeBidi",
    "unicode-range": "unicodeRange",
    "units-per-em": "unitsPerEm",
    "v-alphabetic": "vAlphabetic",
    "v-hanging": "vHanging",
    "v-ideographic": "vIdeographic",
    "v-mathematical": "vMathematical",
    "vector-effect": "vectorEffect",
    "vert-adv-y": "vertAdvY",
    "vert-origin-x": "vertOriginX",
    "vert-origin-y": "vertOriginY",
    "word-spacing": "wordSpacing",
    "writing-mode": "writingMode",
    "baseline-shift": "baselineShift",
    "alignment-baseline": "alignmentBaseline",
    "gradienttransform": "gradientTransform",
    "gradientunits": "gradientUnits",
    "patterntransform": "patternTransform",
    "patternunits": "patternUnits",
    "patterncontentunits": "patternContentUnits",
    "preserveaspectratio": "preserveAspectRatio",
    "viewbox": "viewBox",
    "attributename": "attributeName",
    "attributetype": "attributeType",
    "basefrequency": "baseFrequency",
    "calcmode": "calcMode",
    "clippathunits": "clipPathUnits",
    "diffuseconstant": "diffuseConstant",
    "edgemode": "edgeMode",
    "filterunits": "filterUnits",
    "kernelmatrix": "kernelMatrix",
    "kernelunitlength": "kernelUnitLength",
    "keypoints": "keyPoints",
    "keysplines": "keySplines",
    "keytimes": "keyTimes",
    "lengthadjust": "lengthAdjust",
    "limitingconeangle": "limitingConeAngle",
    "markerheight": "markerHeight",
    "markerunits": "markerUnits",
    "markerwidth": "markerWidth",
    "maskcontentunits": "maskContentUnits",
    "maskunits": "maskUnits",
    "numoctaves": "numOctaves",
    "pathlength": "pathLength",
    "primitiveunits": "primitiveUnits",
    "refx": "refX",
    "refy": "refY",
    "repeatcount": "repeatCount",
    "repeatdur": "repeatDur",
    "specularconstant": "specularConstant",
    "specularexponent": "specularExponent",
    "spreadmethod": "spreadMethod",
    "startoffset": "startOffset",
    "stddeviation": "stdDeviation",
    "surfacescale": "surfaceScale",
    "systemlanguage": "systemLanguage",
    "tablevalues": "tableValues",
    "targetx": "targetX",
    "targety": "targetY",
    "textlength": "textLength",
    "xchannelselector": "xChannelSelector",
    "ychannelselector": "yChannelSelector",
    "zoomandpan": "zoomAndPan",
};

const PRESERVE_CASE = new Set([
    "viewBox",
    "preserveAspectRatio",
    "gradientTransform",
    "gradientUnits",
    "patternTransform",
    "patternUnits",
    "patternContentUnits",
    "baseFrequency",
    "clipPathUnits",
    "filterUnits",
    "maskUnits",
    "maskContentUnits",
    "primitiveUnits",
    "spreadMethod",
    "stdDeviation",
    "tableValues",
    "textLength",
    "startOffset",
    "markerUnits",
    "markerWidth",
    "markerHeight",
    "refX",
    "refY",
    "pathLength",
]);

const NUMERIC_ATTRS = new Set([
    "width",
    "height",
    "x",
    "y",
    "cx",
    "cy",
    "r",
    "rx",
    "ry",
    "x1",
    "x2",
    "y1",
    "y2",
    "dx",
    "dy",
    "fx",
    "fy",
    "opacity",
    "fillOpacity",
    "strokeOpacity",
    "strokeWidth",
    "strokeMiterlimit",
    "fontSize",
    "tabIndex",
    "order",
]);

function kebabToCamel(value: string): string {
    return value.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

function toJsxAttributeName(name: string): string {
    if (ATTRIBUTE_MAP[name]) return ATTRIBUTE_MAP[name];
    if (ATTRIBUTE_MAP[name.toLowerCase()]) return ATTRIBUTE_MAP[name.toLowerCase()];
    if (PRESERVE_CASE.has(name)) return name;

    if (name.startsWith("aria-") || name.startsWith("data-")) return name;
    if (name.includes(":") || name.includes("-")) return kebabToCamel(name.replace(":", "-"));
    if (/^[a-z]+[A-Z]/.test(name) || PRESERVE_CASE.has(name)) return name;

    const lower = name.toLowerCase();
    if (ATTRIBUTE_MAP[lower]) return ATTRIBUTE_MAP[lower];

    return name;
}

function escapeJsxString(value: string): string {
    return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function isNumericLiteral(value: string): boolean {
    return /^-?\d+(\.\d+)?$/.test(value.trim());
}

function parseStyleObject(style: string): string {
    const entries = style
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const colon = part.indexOf(":");
            if (colon === -1) return null;
            const rawKey = part.slice(0, colon).trim();
            const rawValue = part.slice(colon + 1).trim();
            if (!rawKey || !rawValue) return null;

            const key = rawKey.startsWith("--") ? `"${rawKey}"` : kebabToCamel(rawKey);
            if (isNumericLiteral(rawValue) && !rawKey.startsWith("--")) {
                return `${key}: ${rawValue}`;
            }
            return `${key}: "${escapeJsxString(rawValue)}"`;
        })
        .filter(Boolean);

    return `{${entries.join(", ")}}`;
}

function formatAttribute(name: string, value: string): string {
    if (name === "style") {
        return `style={${parseStyleObject(value)}}`;
    }

    if (value === "" || value === name) {
        return name;
    }

    if (NUMERIC_ATTRS.has(name) && isNumericLiteral(value)) {
        return `${name}={${value.trim()}}`;
    }

    if (isNumericLiteral(value) && NUMERIC_ATTRS.has(name)) {
        return `${name}={${value.trim()}}`;
    }

    return `${name}="${escapeJsxString(value)}"`;
}

function serializeAttributes(element: Element, indent: string): string {
    const attrs = Array.from(element.attributes);
    if (!attrs.length) return "";

    const formatted = attrs.map((attr) => {
        const jsxName = toJsxAttributeName(attr.name);
        return formatAttribute(jsxName, attr.value);
    });

    if (formatted.length <= 2 && formatted.join(" ").length < 72) {
        return ` ${formatted.join(" ")}`;
    }

    return `\n${formatted.map((attr) => `${indent}  ${attr}`).join("\n")}\n${indent}`;
}

function serializeNode(node: Node, depth: number): string {
    const indent = "  ".repeat(depth);

    if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent ?? "").replace(/\s+/g, " ").trim();
        return text ? `${indent}${text}` : "";
    }

    if (node.nodeType === Node.CDATA_SECTION_NODE) {
        const text = (node.textContent ?? "").trim();
        return text ? `${indent}{${JSON.stringify(text)}}` : "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const element = node as Element;
    const tag = element.tagName.toLowerCase();
    const attrs = serializeAttributes(element, indent);
    const children = Array.from(element.childNodes)
        .map((child) => serializeNode(child, depth + 1))
        .filter(Boolean);

    if (!children.length) {
        return `${indent}<${tag}${attrs} />`;
    }

    return `${indent}<${tag}${attrs}>\n${children.join("\n")}\n${indent}</${tag}>`;
}

export type ConvertResult =
    | {ok: true; jsx: string; svg: SVGSVGElement}
    | {ok: false; error: "empty" | "invalid" | "missing-root" | "parse"; message: string};

const ERROR_MESSAGES: Record<Exclude<ConvertResult, {ok: true}>["error"], string> = {
    empty: "Paste an SVG to get started.",
    invalid: "Check your markup and try again.",
    "missing-root": "SVG root element is missing.",
    parse: "Check your markup and try again.",
};

export function convertSvgToJsx(
    input: string,
    options: {
        mode: "jsx" | "component";
        componentName: string;
        clean?: boolean;
    }
): ConvertResult {
    const sanitized = parseAndSanitizeSvg(input, {clean: options.clean});
    if (!sanitized.ok) {
        return {
            ok: false,
            error: sanitized.error === "empty" ? "empty" : sanitized.error === "missing-root" ? "missing-root" : "invalid",
            message: ERROR_MESSAGES[sanitized.error === "empty" ? "empty" : sanitized.error === "missing-root" ? "missing-root" : "invalid"],
        };
    }

    const body = serializeNode(sanitized.svg, 0);
    const safeName = sanitizeComponentName(options.componentName);

    if (options.mode === "component") {
        const indented = body
            .split("\n")
            .map((line) => (line ? `    ${line}` : line))
            .join("\n");

        return {
            ok: true,
            svg: sanitized.svg,
            jsx: `const ${safeName} = () => {\n  return (\n${indented}\n  );\n};`,
        };
    }

    return {ok: true, svg: sanitized.svg, jsx: body};
}

export function sanitizeComponentName(name: string): string {
    const cleaned = name.replace(/[^A-Za-z0-9_$]/g, "");
    if (!cleaned) return "SvgIcon";
    if (/^[0-9]/.test(cleaned)) return `Svg${cleaned}`;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
