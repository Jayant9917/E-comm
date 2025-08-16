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
          try {
            const details = await actions.order.capture();
            onSuccess(details);
          } catch (error) {
            console.error("Error capturing payment:", error);
            onError(error);
          }
        }}
        onError={(err) => {
          console.error("PayPal payment error:", err);
          onError(err);
        }}
        onCancel={(data) => {
          // Payment cancelled by user
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
