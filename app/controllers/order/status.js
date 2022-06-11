const OrderModel = require('../../models/OrderModel')

// [PATCH] /orders/:id
const updateStatus = function(req, res, next){
    const { id } = req.params
    const { status } = req.body

    OrderModel.findByIdAndUpdate({ _id: id }, { status })
        .then(() => {
            const result = {
                status: true,
                message: `Order ${id} is updated`,
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

// [POST] /orders/status
const updateStatusAll = function(req, res, next){
    const { selectedStatus, newStatus } = req.body
    OrderModel
        .updateMany({ status: selectedStatus }, { status: newStatus })
        .then((data) => {
            const {
                acknowledged,
                modifiedCount,
                matchedCount,
            } = data
            const result = {
                status: acknowledged,
                message: matchedCount > 0 ? `${modifiedCount} document(s) updated` : 'No documents found',
            }
            console.log(result)
            return res.status(200).send(result)
        })
        .catch(next)
}

module.exports = {
    updateStatus,
    updateStatusAll,
}