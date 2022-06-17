import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./form";
import "./style.css"
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function PAyment() {
  const [clientSecret, setClientSecret] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios
      .post(
        "http://localhost:5000/create-payment-intent",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setClientSecret(result.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="card">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
