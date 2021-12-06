const express = require('express')
const path = require('path')
const app = express()

function resolvePath(_path) {
    return path.resolve(__dirname, 'frontend', _path)
}
app.use('/static', express.static(resolvePath('static')))
app.get('/*', (req, res) => {
    res.sendFile(resolvePath('index.html'))
})

app.listen(process.env.PORT || 5001 , () => console.log('serve running...'))