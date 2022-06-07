const EmployeeModel = require('../models/EmployeeModel')

const checkLogin = (req, res, next) => {
    const { account, password } = req.body
    EmployeeModel.findOne({ account, password })
        .then((account) => {
            const result = {
                status: true,
                message: `Log in successfully`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

module.exports = {
    checkLogin,
}