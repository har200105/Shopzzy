const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
    console.log("Payment");
    console.log(process.env.STRIPE_API_KEY);
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})