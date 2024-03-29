const OrderModel = require('@/models/OrderModel');
const { success } = require('@/responses');

// [PATCH] /orders/:id
const updateStatus = function (req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  return OrderModel.findByIdAndUpdate({ _id: id }, { status })
    .then(() => res.status(204).send())
    .catch(next);
};

// [POST] /orders/status
const updateStatusAll = function (req, res, next) {
  const { selectedStatus, newStatus } = req.body;
  return OrderModel.updateMany({ status: selectedStatus }, { status: newStatus })
    .then((data) => {
      const { matchedCount, modifiedCount } = data;
      const message = matchedCount > 0 ? `${modifiedCount} document(s) updated` : 'No documents found';

      return res.status(200).send(success(message));
    })
    .catch(next);
};

module.exports = {
  updateStatus,
  updateStatusAll,
};
