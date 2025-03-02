interface IMetadataComponentProps {
    title: string;
    description: string;
}

function MetadataComponent ({ title, description }: IMetadataComponentProps) {
    return (
        <>
            <title>{`Mahrokh | ${title}`}</title>
            <meta name="description" content={description}/>
            <meta property="og:title" content={`Mahrokh | ${title}`}/>
            <meta property="og:description" content={description}/>
        </>
    );
};

export default MetadataComponent;