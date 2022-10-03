const paypal = require('paypal-rest-sdk')
const { clientUrl, paypalClientId, paypalClientSecret } = require('../../config')
const TransactionModel = require('../models/TransactionModel')


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': paypalClientId,
    'client_secret': paypalClientSecret,
})
const FAILED_PAYMENT_URL = 'https://www.paypal.com/us/home'

// [POST] /payment
const processPayment = (req, res) => {
    const { amount, description } = req.body
    const data = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': `${req.protocol}://${req.headers.host}/payment`,
            'cancel_url': FAILED_PAYMENT_URL,
        },
        'transactions': [
            {
                // "item_list": {
                //     "items": [{
                //         "name": "Redhock Bar Soap",
                //         "sku": "001",
                //         "price": "25.00",
                //         "currency": "USD",
                //         "quantity": 1
                //     }]
                // },
                "amount": {
                    "currency": "USD",
                    "total": amount,
                },
                "description": description,
            }
        ],
    }

    paypal.payment.create(data, function (error, payment) {
        if (error) {
            console.log(error)
            return res.redirect(FAILED_PAYMENT_URL)
        }

        const approvedViewUrl = payment.links.find(link => link.rel === 'approval_url').href
        return res
            .location(approvedViewUrl)
            .status(201)
            .send(approvedViewUrl)
    })
}

// [GET] /payment
const successPayment = (req, res) => {
    const { PayerID: payerId, paymentId } = req.query

    const data = {
        'payer_id': payerId,
    }

    // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, data, function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
            console.log(error)
            return res
                .status(500)
                .send("Something wrong have occured, please try again")
        }

        TransactionModel.create(payment.transactions)
        return res.redirect(`${clientUrl}/success`)
    })
}

// [GET] /payment/cancel
const cancelPayment = (req, res) => {
    res.redirect(FAILED_PAYMENT_URL)
}

module.exports = {
    processPayment,
    successPayment,
    cancelPayment,
}