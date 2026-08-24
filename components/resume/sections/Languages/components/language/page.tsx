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
        <div className="flex flex-1 flex-col gap-[1.2mm]">
            <h4 className="text-[4.4mm] font-semibold">{item.name}</h4>
            {item.institute && (<span className="text-[3.9mm]">{item.institute}</span>)}
            {item.moreInfo.map((info) => (
                <span key={info} className="text-[3.7mm]">{info}</span>
            ))}
        </div>
    );
}

export default Language;
