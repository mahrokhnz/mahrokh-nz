const lang: HTMLElement = document.querySelector(".language");
const langWrapper: HTMLElement = document.querySelector(".languageWrapper");
const langValueEn: HTMLElement = document.querySelector(".en");
const langValueFa: HTMLElement = document.querySelector(".fa");

type TLocale = "en" | "fa"
const defaultLocale: TLocale = "en";
let locale: TLocale;
let translations: object = {};

document.addEventListener("DOMContentLoaded", () => {
    void setLocale(defaultLocale);
});

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

async function fetchTranslationsFor(newLocale: TLocale): Promise<JSON> {
    const response = await fetch(`../../lang/${newLocale}.json`);
    return response.json()
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function translateElement(element: HTMLElement) {
    const key = element.getAttribute("data-i18n-key");
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

        document.querySelector("html").lang = 'en'
    }
})

langValueFa.addEventListener('click', () => {
    if (!langValueFa.classList.contains('active')) {
        langValueEn.classList.remove('active')
        langValueFa.classList.add('active')
        void setLocale('fa')

        document.querySelector("html").lang = 'fa'
    }
})

document.addEventListener('click', () => {
    if (langWrapper.classList.contains('active')) {
        langWrapper.classList.remove('active')
    }
})