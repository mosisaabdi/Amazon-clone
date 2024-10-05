const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const stripe = require("stripe")(process.env.STRIPE_KEY)

const app = express()
app.use(cors({origin: true}))

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Sucessful got request"
    })
})

// This function is called whenever our React app makes a POST request to this endpoint.
app.post('/payments/create', async (req, res) => {
    const total = parseInt(req.query.total)
    if (total > 0) {
        // Create a PaymentIntent with the specified amount and currency
        // This is what Stripe needs to know in order to create a payment
        // The amount is the total in subunits of the currency (e.g. cents for USD)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, // subunits of the currency
            currency: "usd",
        }) 
        res.status(201).json(
          {  clientSecret:paymentIntent.client_secret},
        )
    }
    else {
        res.status(403).json({message: "Invalid amount and total must be greater than 0"})
    }
     
})

//to listen for http requests from firebase functions
exports.api = onRequest(app)