const EmployeeModel = require('../models/EmployeeModel')

const checkLogin = function(req, res) {
    EmployeeModel.findOne({
        account : req.body.account,
        password : req.body.password,
    })
        .then(account => {
            if (account) {
                res.send('Accept')
            } else {
                res.send('Reject')
            }
        })
}

module.exports = {
    checkLogin
}