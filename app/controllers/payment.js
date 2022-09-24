const paypal = require('paypal-rest-sdk')
const { success } = require('../responses')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Aeqh_l1UeE4Qvrci_ZlGnJv_y7grEgOm1u6-crKl360QjRqR0llayoFxXTCcbI9wCze_O4BKKrAVdRZP',
    'client_secret': 'EAfIyBlyi-PvHXhgwPCMDUycFkj6Vm7jM-h-HHd1ErIc2qH_YUnZbI80UfALCvC8RhDU-jdWw0AEcrnv'
})
const FAILED_PAYMENT_URL = 'https://www.paypal.com/us/home'

// [POST] /payment/process
const processPayment = (req, res) => {
    const { amount, description } = req.body
    const data = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': `${req.protocol}://${req.headers.host}/payment/success`,
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
            res.redirect(FAILED_PAYMENT_URL)
        } else {
            const approvedViewUrl = payment.links.find(link => link.rel === 'approval_url').href
            return res
                .status(201)
                .send(success({ d: approvedViewUrl }))
        }
    })
}

// [GET] /payment/success
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

        console.log(payment.transactions)
        return res.redirect("http://localhost:3000/success")
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