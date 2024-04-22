const educationBachelor: string = `
   <div class="card bachelor active">
        <div class="universityWrapper">
            <img alt="University of Tehran"
                 src="/images/logos/universities/University_of_Tehran.svg.png">
            <h2 data-i18n-key="bachelorUniName"></h2>
        </div>
    
        <div class="infoWrapper">
            <h3 data-i18n-key="bachelorUniDegree"></h3>
            <span data-i18n-key="bachelorUniTime"></span>
        </div>
   </div>
`

const educationMaster: string = `
   <div class="card master">
        <div class="universityWrapper">
            <img alt="University of Science And Culture"
                 src="/images/logos/universities/University_of_Science_&_Culture.png">
            <h2 data-i18n-key="masterUniName"></h2>
        </div>
    
        <div class="infoWrapper">
            <h3 data-i18n-key="masterUniDegree"></h3>
            <span data-i18n-key="masterUniTime"></span>
        </div>
    </div>
`

class educationComponent extends HTMLElement {
    grade = this.getAttribute('grade')

    constructor() {
        super();
        this.innerHTML = this.grade === 'bachelor' ? educationBachelor : educationMaster
    }
}

customElements.define('education-component', educationComponent)