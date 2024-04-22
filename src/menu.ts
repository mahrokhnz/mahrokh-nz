const menu: string = `
    <ul class="menu">
        <li><a data-i18n-key="home" href="#home"></a></li>
        <li><a data-i18n-key="aboutMe" href="#aboutMe"></a></li>
        <li class="menuItem"><a data-i18n-key="projects" href="#myProjects"></a></li>
        <li><a data-i18n-key="skills" href="#skills"></a></li>
        <li><a data-i18n-key="education" href="#education"></a></li>
    </ul>
`

class menuComponent extends HTMLElement {
    isHeaderMenu = this.getAttribute('isHeaderMenu')

    constructor() {
        super();
        this.innerHTML = menu
        if (this.isHeaderMenu) {
            this.children[0].classList.add('headerMenu')
        }
    }
}

customElements.define('menu-component', menuComponent)