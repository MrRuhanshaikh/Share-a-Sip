import React from "react";
import Paymentpage from "../components/Paymentpage";
import Payment from "../models/Payment";

const Username = ({ params }) => {  
  return (
    <>
      <Paymentpage Username={params.Username}/>
    </>
  );
};

export default Username;
