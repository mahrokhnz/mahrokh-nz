import Script from "next/script";

type JsonLdScriptProps = {
    id: string;
    data: Record<string, unknown> | Record<string, unknown>[];
};

function JsonLdScript({ id, data }: JsonLdScriptProps) {
    return (
        <Script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default JsonLdScript;
