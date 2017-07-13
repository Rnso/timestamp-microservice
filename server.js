const express = require('express')
const moment = require('moment')



const server = express()

server.set('view engine', 'ejs')

server.get('/', (req, res) => {
    res.render('index')
})

server.get('/:parameter', (req, res) => {
    var regex1 = /^[0-9]+$/
    if (regex1.test(req.params.parameter)) {
        var day = moment.unix(req.params.parameter)
        res.send({"unix": req.params.parameter, "natural" : moment(day).format('LL')})
    }
    else if (moment(req.params.parameter).isValid()) {
        res.send({"unix": moment(req.params.parameter).format('x'), "natural": moment(req.params.parameter).format('LL')})
    }
    else{
        res.send({"unix": null, "natural" : null})
    }
})

server.use(express.static('public'))

server.listen(8080, () => {
    console.info('Express Listening on port:', 8080)
})
