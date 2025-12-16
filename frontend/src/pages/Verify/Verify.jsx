import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = ({ success = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success("Order Placed Successfully");
      navigate("/myorders");
    } else {
      toast.error("Payment Failed or Something went wrong");
      navigate("/");
    }
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
