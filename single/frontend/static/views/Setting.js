import View from './View.js'

export default class extends View {
    constructor(props) {
        super(props)
        this.setTitle('Setting')
    }

    async getHtml() {
        return `<h1>Setting${this.params.id}</h1>`
    }
}