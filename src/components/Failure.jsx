import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Payment Cancelled</h2>
        <p className="mb-4">Your payment was not completed. You can try again from your bag.</p>
        <div className="flex gap-2 justify-center">
          <Link to="/bag" className="btn btn-primary">Return to Bag</Link>
          <Link to="/" className="btn btn-ghost">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Failure;