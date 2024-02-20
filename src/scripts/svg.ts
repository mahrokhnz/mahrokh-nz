const verticalPath: string = `<svg class="svgContainer" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
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

const horizontalPath: string = `<svg class="svgContainer" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                <circle cx="900" cy="90" fill="currentColor" r="5"/>
                <circle cx="920" cy="90" fill="currentColor" r="5"/>
                <circle cx="940" cy="90" fill="currentColor" r="5"/>
                <circle cx="960" cy="90" fill="currentColor" r="5"/>
                <circle cx="980" cy="90" fill="currentColor" r="5"/>
                <circle cx="1000" cy="90" fill="currentColor" r="5"/>
                <circle cx="1020" cy="90" fill="currentColor" r="5"/>

                <circle cx="900" cy="110" fill="currentColor" r="5"/>
                <circle cx="920" cy="110" fill="currentColor" r="5"/>
                <circle cx="940" cy="110" fill="currentColor" r="5"/>
                <circle cx="960" cy="110" fill="currentColor" r="5"/>
                <circle cx="980" cy="110" fill="currentColor" r="5"/>
                <circle cx="1000" cy="110" fill="currentColor" r="5"/>
                <circle cx="1020" cy="110" fill="currentColor" r="5"/>

                <circle cx="900" cy="130" fill="currentColor" r="5"/>
                <circle cx="920" cy="130" fill="currentColor" r="5"/>
                <circle cx="940" cy="130" fill="currentColor" r="5"/>
                <circle cx="960" cy="130" fill="currentColor" r="5"/>
                <circle cx="980" cy="130" fill="currentColor" r="5"/>
                <circle cx="1000" cy="130" fill="currentColor" r="5"/>
                <circle cx="1020" cy="130" fill="currentColor" r="5"/>

                <circle cx="900" cy="150" fill="currentColor" r="5"/>
                <circle cx="920" cy="150" fill="currentColor" r="5"/>
                <circle cx="940" cy="150" fill="currentColor" r="5"/>
                <circle cx="960" cy="150" fill="currentColor" r="5"/>
                <circle cx="980" cy="150" fill="currentColor" r="5"/>
                <circle cx="1000" cy="150" fill="currentColor" r="5"/>
                <circle cx="1020" cy="150" fill="currentColor" r="5"/>

                <circle cx="900" cy="170" fill="currentColor" r="5"/>
                <circle cx="920" cy="170" fill="currentColor" r="5"/>
                <circle cx="940" cy="170" fill="currentColor" r="5"/>
                <circle cx="960" cy="170" fill="currentColor" r="5"/>
                <circle cx="980" cy="170" fill="currentColor" r="5"/>
                <circle cx="1000" cy="170" fill="currentColor" r="5"/>
                <circle cx="1020" cy="170" fill="currentColor" r="5"/>
            </svg>
`

class svgPath extends HTMLElement {
    direction = this.getAttribute('direction')

    constructor() {
        super();
        this.innerHTML = this.direction === 'vertical' ? verticalPath : horizontalPath;
    }
}

customElements.define('svg-path', svgPath)