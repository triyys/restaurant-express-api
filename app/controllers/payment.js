var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    // 'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    // 'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
    'client_id': 'AdtWJe_iauGK_BYkayDGxnJkFwlpzGcjX7n6pLG7rbZAD87T9kyoSJD6N2RYnpHTpyNNdpe3E0tU5HqL',
    'client_secret': 'ENJeGQ5ctfVzIjeqMBUCLlJZDdFhShCOWvy_ZL5YiwYd0Ge3Gg1siDR81rS2FjW86Ceu2YcS05_5lg2C'
})

const processPayment = (req, res) => {
    console.log("Process Info");
    console.log(req.body.amount);
    console.log(req.body.description);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/payment/success",
            "cancel_url": "https://www.paypal.com/us/home"
        },
        "transactions": [{
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
                "total": req.body.amount
            },
            "description": req.body.description
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.redirect("http://localhost:3000/payment/fail");
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.send(payment.links[i].href);
                }
            }
        }
    });
}

const successPayment = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };

    // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
            console.log(error.response);
            res.status(500).send("Something wrong have occured, please try again")
        } else {
            console.log(JSON.stringify(payment));
            res.redirect("http://localhost:3000/success");
        }
    });
}

const cancelPayment = (req, res) => {
    res.redirect("https://www.paypal.com/us/home");
}

module.exports = {
    processPayment,
    successPayment,
    cancelPayment,
}