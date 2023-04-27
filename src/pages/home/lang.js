// const lang = document.querySelector(".language");
// const langWrapper = document.querySelector(".languageWrapper");
// const langValueEn = document.querySelector(".en");
// const langValueFa = document.querySelector(".fa");
//
// const defaultLocale = "en";
// let locale;
// let translations = {};
//
// document.addEventListener("DOMContentLoaded", () => {
//     setLocale(defaultLocale);
//     bindLocaleSwitcher(defaultLocale);
// });
//
// async function setLocale(newLocale) {
//     if (newLocale === locale) return;
//     const newTranslations =
//         await fetchTranslationsFor(newLocale);
//     locale = newLocale;
//     translations = newTranslations;
//     translatePage();
// }
//
// async function fetchTranslationsFor(newLocale) {
//     const response = await fetch(`../../lang/${newLocale}.json`);
//     return response.json()
// }
//
// function translatePage() {
//     document
//         .querySelectorAll("[data-i18n-key]")
//         .forEach(translateElement);
// }
//
// function translateElement(element) {
//     const key = element.getAttribute("data-i18n-key");
//     element.innerText = keyFinder(key);
//
//     // TODO: I CAN DO IT MUCH BETTER!
// }
//
// function keyFinder(key) {
//     console.log(key)
//     if (key.includes('.')) {
//         const array = key.split('.')
//         console.log(array, translations[array[0]], Object.values(translations[array[0]])[0])
//         console.log(array[0], array[1], 'll')
//         return Object.values(translations[array[0]])[array[1]]
//     } else {
//         return translations[key];
//     }
//
//     // TODO: DOESNT WORK
// }
//
//
// // Language Switcher
// lang.addEventListener('click', (e) => {
//     e.stopPropagation()
//     langWrapper.classList.toggle('active')
// })
//
// langValueEn.addEventListener('click', () => {
//     if (!langValueEn.classList.contains('active')) {
//         langValueFa.classList.remove('active')
//         langValueEn.classList.add('active')
//         setLocale('en')
//
//
//         // TODO: Directions
//     }
// })
//
// langValueFa.addEventListener('click', () => {
//     if (!langValueFa.classList.contains('active')) {
//         langValueEn.classList.remove('active')
//         langValueFa.classList.add('active')
//         setLocale('fa')
//     }
// })
//
// document.addEventListener('click', () => {
//     if (langWrapper.classList.contains('active')) {
//         langWrapper.classList.remove('active')
//     }
// })
//
// // TODO: FONT FOR PERSIAN?