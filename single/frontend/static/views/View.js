export default class {
    constructor(params) {
        this.params = params
        this.title = null
    }
    setTitle(title) {
        this.title = title
        document.title = title
    }

    async getHtml() {
        return ``
    }
}