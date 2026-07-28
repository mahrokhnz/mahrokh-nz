interface LanguageProps {
    item: {
        id: number;
        name: string;
        institute: string;
        moreInfo: string[];
    }
}

function Language({item}: LanguageProps) {
    return (
        <div className="flex flex-1 flex-col gap-[3mm]">
            <h4 className="text-[5.1mm] font-semibold">{item.name}</h4>
            {item.institute && (<span className="text-[4.7mm]">{item.institute}</span>)}
            {item.moreInfo.map((info, index) => (
                <span key={`Info-${index + 1}`} className="text-[4.5mm]">{info}</span>
            ))}
        </div>
    );
}

export default Language;
