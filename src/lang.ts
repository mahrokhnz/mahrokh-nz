const htmlNode: HTMLElement = document.documentElement
const lang: Element = document.querySelector(".language")!;
const langWrapper: Element = document.querySelector(".languageWrapper")!;
const langValueEn: Element = document.querySelector(".en")!;
const langValueFa: Element = document.querySelector(".fa")!;

type TLocale = "en" | "fa"
const defaultLocale: TLocale = "en";
let locale: TLocale;
let translations: {[key: string]: any} = {};

document.addEventListener("DOMContentLoaded", () => {    void setLocale(defaultLocale);
});

async function setLocale(newLocale: TLocale) {
    if (newLocale === locale) return;
    const newTranslations: object =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

async function fetchTranslationsFor(newLocale: TLocale): Promise<JSON> {
    const response = await fetch(`lang/${newLocale}.json`);
    return response.json()
}

function translatePage() {
    const i18nKey: NodeListOf<HTMLElement> = document.querySelectorAll("[data-i18n-key]")

    i18nKey.forEach((key: HTMLElement) => {translateElement(key)})
}

function translateElement(element: HTMLElement) {
    const key: string = element.getAttribute("data-i18n-key")!;
    element.innerText = translations[key]
}

// Language Switcher
lang.addEventListener('click', (e) => {
    e.stopPropagation()
    langWrapper.classList.toggle('active')
})

langValueEn.addEventListener('click', () => {
    if (!langValueEn.classList.contains('active')) {
        langValueFa.classList.remove('active')
        langValueEn.classList.add('active')
        void setLocale('en')

        htmlNode.lang = 'en'
    }
})

langValueFa.addEventListener('click', () => {
    if (!langValueFa.classList.contains('active')) {
        langValueEn.classList.remove('active')
        langValueFa.classList.add('active')
        void setLocale('fa')

        htmlNode.lang = 'fa'
    }
})

document.addEventListener('click', () => {
    if (langWrapper.classList.contains('active')) {
        langWrapper.classList.remove('active')
    }
})