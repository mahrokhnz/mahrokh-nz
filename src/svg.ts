const svg: string = `<svg class="svgContainer" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path class="backWave"
              d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,80C672,85,768,139,864,154.7C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="currentColor"
              fill-opacity="1"></path>
        <path class="frontWave"
              d="M0,128L80,117.3C160,107,320,85,480,106.7C640,128,800,192,960,224C1120,256,1280,256,1360,256L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="currentColor"
              fill-opacity="1"></path>

        <circle cx="50" cy="180" fill="currentColor" r="5"/>
        <circle cx="70" cy="180" fill="currentColor" r="5"/>
        <circle cx="90" cy="180" fill="currentColor" r="5"/>
        <circle cx="110" cy="180" fill="currentColor" r="5"/>
        <circle cx="130" cy="180" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="200" fill="currentColor" r="5"/>
        <circle cx="70" cy="200" fill="currentColor" r="5"/>
        <circle cx="90" cy="200" fill="currentColor" r="5"/>
        <circle cx="110" cy="200" fill="currentColor" r="5"/>
        <circle cx="130" cy="200" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="220" fill="currentColor" r="5"/>
        <circle cx="70" cy="220" fill="currentColor" r="5"/>
        <circle cx="90" cy="220" fill="currentColor" r="5"/>
        <circle cx="110" cy="220" fill="currentColor" r="5"/>
        <circle cx="130" cy="220" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="240" fill="currentColor" r="5"/>
        <circle cx="70" cy="240" fill="currentColor" r="5"/>
        <circle cx="90" cy="240" fill="currentColor" r="5"/>
        <circle cx="110" cy="240" fill="currentColor" r="5"/>
        <circle cx="130" cy="240" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="260" fill="currentColor" r="5"/>
        <circle cx="70" cy="260" fill="currentColor" r="5"/>
        <circle cx="90" cy="260" fill="currentColor" r="5"/>
        <circle cx="110" cy="260" fill="currentColor" r="5"/>
        <circle cx="130" cy="260" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="280" fill="currentColor" r="5"/>
        <circle cx="70" cy="280" fill="currentColor" r="5"/>
        <circle cx="90" cy="280" fill="currentColor" r="5"/>
        <circle cx="110" cy="280" fill="currentColor" r="5"/>
        <circle cx="130" cy="280" fill="currentColor" r="5"/>
    
        <circle cx="50" cy="300" fill="currentColor" r="5"/>
        <circle cx="70" cy="300" fill="currentColor" r="5"/>
        <circle cx="90" cy="300" fill="currentColor" r="5"/>
        <circle cx="110" cy="300" fill="currentColor" r="5"/>
        <circle cx="130" cy="300" fill="currentColor" r="5"/>
    </svg>`

class svgComponent extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = svg
    }
}

customElements.define('svg-component', svgComponent)