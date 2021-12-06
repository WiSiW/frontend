const navigateTo = url => {
    // 切换路由，但不刷新页面
    history.pushState(null, null, url)
    router()
}
import SettingView from '../views/Setting.js'
import View from '../views/View.js'

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries( keys.map( (key,i) => {
        return [key, values[i]]
    }))

}
const router = async () => {
    const routes = [
        { path: '/', view: View },
        { path: '/setting/:id', view: SettingView }
    ]

    const potentialMatches = routes.map(route => {
        return {
            route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    let match = potentialMatches.find(potentialMatche => potentialMatche.result !== null)
    if(!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }
    const view = new match.route.view(getParams(match))
    document.querySelector('#app').innerHTML = await view.getHtml()
}
window.addEventListener('popstate', () => {
    console.log("popstate");
    router()
})
window.addEventListener("DOMContentLoaded", () => {
    console.log('DOMContentLoaded');
    router()
    document.body.addEventListener('click', e => {
        console.log(e);
        if (e.target.matches('[data-link]')) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
})