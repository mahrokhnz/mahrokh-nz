const contact: string = `
    <div class="contactWrapper">
        <a class="iconWrapper" href="https://github.com/mahrokhnz" target="_blank">
            <img alt="Github Icon" src="/icons/square-github.svg">
        </a>
        <a class="iconWrapper" href="https://www.hackerrank.com/mahrokhnz" target="_blank">
            <img alt="Hackerrank Icon" src="/icons/hackerrank.svg">
        </a>
        <a class="iconWrapper" href="https://www.linkedin.com/in/mahrokh-nabizadeh-335326144/" target="_blank">
            <img alt="linkedin Icon" src="/icons/linkedin.svg">
        </a>
    </div>
`

class contactComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = contact
    }
}

customElements.define('contact-component', contactComponent)