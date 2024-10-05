const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Sucessful got request to Amazon API",
  });
});

// This function is called whenever our React app makes a POST request to this endpoints.
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    // Create a PaymentIntent with the specified amount and currency
    // This is what Stripe needs to know in order to create a payment
    // The amount is the total in subunits of the currency (e.g. cents for USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } else {
    res
      .status(403)
      .json({ message: "Invalid amount and total must be greater than 0" });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port 5000, http://localhost:5000")
);
