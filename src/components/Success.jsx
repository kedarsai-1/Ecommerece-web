import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBag } from "../utils/itemSlice";

const Success = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear local bag on successful payment
    dispatch(clearBag());
  }, [dispatch]);

  const sessionId = searchParams.get("session_id");
  const paymentIntent = searchParams.get("pi");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Payment Successful 🎉</h2>
        <p className="mb-4">Thank you! Your payment has been confirmed.</p>
        
        {paymentIntent && (
          <p className="text-sm text-gray-600 mb-4">Payment Intent: {paymentIntent}</p>
        )}
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default Success;