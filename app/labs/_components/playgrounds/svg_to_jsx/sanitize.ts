const BLOCKED_TAGS = new Set([
    "script",
    "foreignobject",
    "iframe",
    "object",
    "embed",
    "link",
    "meta",
    "base",
]);

const EDITOR_ATTR_PREFIXES = ["inkscape:", "sodipodi:", "xmlns:inkscape", "xmlns:sodipodi"];

function isUnsafeUrl(value: string): boolean {
    const trimmed = value.trim().toLowerCase();
    return (
        trimmed.startsWith("javascript:") ||
        trimmed.startsWith("vbscript:") ||
        trimmed.startsWith("data:text/html")
    );
}

function shouldRemoveAttribute(name: string, value: string): boolean {
    const lower = name.toLowerCase();

    if (lower.startsWith("on")) return true;
    if (lower === "href" || lower === "xlink:href" || lower.endsWith(":href")) {
        const trimmed = value.trim().toLowerCase();
        if (isUnsafeUrl(value)) return true;
        // Block external resource references; keep same-document fragments (#id).
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
            return true;
        }
    }
    if (lower === "xlink:actuate" || lower === "xlink:show") return true;

    return false;
}

function cleanAttributes(element: Element, aggressiveClean: boolean) {
    const toRemove: string[] = [];

    for (const attr of Array.from(element.attributes)) {
        const name = attr.name;
        const value = attr.value;

        if (shouldRemoveAttribute(name, value)) {
            toRemove.push(name);
            continue;
        }

        if (!aggressiveClean) continue;

        const lower = name.toLowerCase();
        if (
            EDITOR_ATTR_PREFIXES.some((prefix) => lower.startsWith(prefix)) ||
            lower === "xmlns:xlink" ||
            lower === "data-name"
        ) {
            toRemove.push(name);
        }
    }

    for (const name of toRemove) {
        element.removeAttribute(name);
    }
}

function walkAndSanitize(node: Node, aggressiveClean: boolean) {
    if (node.nodeType === Node.COMMENT_NODE) {
        node.parentNode?.removeChild(node);
        return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node as Element;
    const tag = element.tagName.toLowerCase();

    if (BLOCKED_TAGS.has(tag)) {
        element.remove();
        return;
    }

    cleanAttributes(element, aggressiveClean);

    const children = Array.from(element.childNodes);
    for (const child of children) {
        walkAndSanitize(child, aggressiveClean);
    }
}

export type SanitizeResult =
    | {ok: true; svg: SVGSVGElement}
    | {ok: false; error: string};

export function parseAndSanitizeSvg(input: string, options?: {clean?: boolean}): SanitizeResult {
    const trimmed = input.trim();
    if (!trimmed) {
        return {ok: false, error: "empty"};
    }

    const withoutDeclaration = trimmed.replace(/<\?xml[\s\S]*?\?>/gi, "").trim();

    let doc: Document;
    try {
        doc = new DOMParser().parseFromString(withoutDeclaration, "image/svg+xml");
    } catch {
        return {ok: false, error: "parse"};
    }

    const parserError = doc.querySelector("parsererror");
    if (parserError) {
        return {ok: false, error: "invalid"};
    }

    const svg = doc.querySelector("svg");
    if (!svg) {
        return {ok: false, error: "missing-root"};
    }

    const cloned = svg.cloneNode(true) as SVGSVGElement;
    walkAndSanitize(cloned, Boolean(options?.clean));

    return {ok: true, svg: cloned};
}
