const OrderModel = require('../../models/OrderModel')
const { customResponse } = require('../../utils')

// [PATCH] /orders/:id
const updateStatus = function(req, res, next){
    const { id } = req.params
    const { status } = req.body

    OrderModel.findByIdAndUpdate({ _id: id }, { status })
        .then(() => res.status(204).send())
        .catch(next)
}

// [POST] /orders/status
const updateStatusAll = function(req, res, next){
    const { selectedStatus, newStatus } = req.body
    OrderModel
        .updateMany({ status: selectedStatus }, { status: newStatus })
        .then((data) => {
            const { matchedCount, modifiedCount } = data
            const message = matchedCount > 0 ? `${modifiedCount} document(s) updated` : 'No documents found'
            
            return res.status(200).send(customResponse(message))
        })
        .catch(next)
}

module.exports = {
    updateStatus,
    updateStatusAll,
}