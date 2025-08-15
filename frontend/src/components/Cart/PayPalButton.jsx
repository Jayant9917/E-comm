import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  // Minimal PayPal configuration for sandbox testing
  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          console.log("Creating PayPal order with amount:", amount);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: parseFloat(amount).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          console.log("PayPal order approved:", data);
          try {
            const details = await actions.order.capture();
            console.log("Payment captured successfully:", details);
            onSuccess(details);
          } catch (error) {
            console.error("Error capturing payment:", error);
            onError(error);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
        onCancel={(data) => {
          console.log("PayPal payment cancelled:", data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
