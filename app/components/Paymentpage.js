"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "../actions/useractions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Paymentpage = ({ Username }) => {
  const [paymentform, setpaymentform] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [payments, setpayments] = useState([]);
  const { data: session } = useSession();
  const searchparams = useSearchParams();
  const toastId = uuidv4();
  const router = useRouter();
  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } 
    if (searchparams.get("paymentdone") == "true") {
      if (!toast.isActive(toastId)) {
        // Update profile and handle errors
        try {
          toast.success("Payment Successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: toastId, // Set the unique ID
          });
          router.push(`/${Username}`);
        } catch (error) {
          toast.error("Payment Failed, Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            toastId: toastId, // Set the unique ID
          });
        }
      }
    }
    getdata();
  });

  const getdata = async () => {
    let u = await fetchuser(Username);
    setcurrentUser(u);
    let p = await fetchpayments(Username);
    setpayments(p);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, session?.user.name, paymentform);
    let orderId = a.id;

    var options = {
      key: currentUser.razorpay_id,
      amount: amount,
      currency: "INR",
      name: "Share-a-Sip",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const validateForm = () => {
    const { name, message, amount } = paymentform;
  
    // Ensure the fields exist and are strings
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
  
    // Regular expression for checking only alphabetic characters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    const messageRegex = /^[A-Za-z\s]+$/;
  
    // Check all fields are filled after trimming
    if (!trimmedName || !trimmedMessage || !amount) return false;
  
    // Check name and message are strings with valid lengths and only alphabetic characters
    if (trimmedName.length <= 2 || !nameRegex.test(trimmedName)) return false;
    if (trimmedMessage.length <= 4 || !messageRegex.test(trimmedMessage)) return false;
  
    // Check amount is a valid number greater than 0
    if (isNaN(amount) || parseInt(amount) <= 0) return false;
  
    return true;
  };
  const isPayButtonDisabled = () => !validateForm();

   // Calculate total contributors and total amount
   const totalContributors = payments.length;
   const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="Banner relative w-full h-96  mt-9">
        <Image
          src={currentUser?.cover_pic || "/share-a-sip_banner.gif"}
          layout="fill"
          objectFit="cover"
          alt="Banner Image"
        />
        <div className="profile-pic shadow-md absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full">
          <Image
            src={currentUser?.profile_pic || "/Flaming_Sphere.gif"}
            layout="fill"
            objectFit="cover"
            alt="profile-pic"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 justify-center">
        <div className="text-2xl font-bold mb-4">
          🔥{Username.replaceAll(/%20|-/g, " ")}
        </div>

        <div className="text-sm mb-4">
        {currentUser?.bio || "Creating Awesome Content For Community"}
        </div>
        <div className="flex gap-2.5">
          <div className="text-sm mb-2">{totalContributors} Contributor</div>
          <div className="text-sm">₹{totalAmount.toLocaleString()} Donation</div>
        </div>
      </div>

      <div className="md:w-4/5 md:h-[340px] mx-auto mt-10 flex gap-5 flex-col md:flex-row">
        <div className="bg-slate-900 md:w-1/2 text-left p-5 overflow-x-auto">
          <div>
            <h2 className="font-semibold text-2xl mb-5">Supporters</h2>
            <ul className="ml-5 space-y-2.5">
              {payments.length === 0 && <li>No Donation Till Now !!</li>}
              {payments.length > 0 &&
                payments.map((item, id) => (
                  <li key={id} className="flex gap-2 items-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/xfzuyvam.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                    <span>
                      {item.name} donated <b>₹{item.amount}</b> with the message
                      &quot;{item.message}&quot;
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 md:w-1/2">
          <h2 className="font-semibold text-2xl text-left p-5">
            Make a Payment
          </h2>
          <form className="w-[94%] mx-auto space-y-2.5">
            <input
              onChange={handlechange}
              value={paymentform.name || ""}
              type="text"
              name="name"
              placeholder="Enter Name"
              id="uname"
              className="bg-gray-800 rounded-md py-2 px-4 w-full"
            />
            <input
              onChange={handlechange}
              value={paymentform.message || ""}
              type="text"
              name="message"
              placeholder="Enter Message"
              id="msg"
              className="bg-gray-800 rounded-md py-2 px-4 w-full"
            />
            <input
              onChange={handlechange}
              value={paymentform.amount || ""}
              type="number"
              name="amount"
              placeholder="Enter Amount"
              id="amount"
              className="bg-gray-800 rounded-md py-2 px-4 w-full"
            />
            <button
              type="button"
              onClick={() => {
                const amount = parseInt(paymentform.amount) * 100;
                pay(amount);
              }}
              className={`w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 
              ${isPayButtonDisabled() ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isPayButtonDisabled()}
            >
              Pay
            </button>
          </form>
          <div className="flex gap-5 p-5">
            <button
              className={`px-3 py-1.5 bg-gray-800 rounded-md cursor-pointer ${
                isPayButtonDisabled()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => pay(1000)}
              disabled={isPayButtonDisabled()}
            >
              Pay ₹10
            </button>
            <button
              className={`px-3 py-1.5 bg-gray-800 rounded-md cursor-pointer ${
                isPayButtonDisabled()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => pay(2000)}
              disabled={isPayButtonDisabled()}
            >
              Pay ₹20
            </button>
            <button
              className={`px-3 py-1.5 bg-gray-800 rounded-md cursor-pointer ${
                isPayButtonDisabled()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => pay(3000)}
              disabled={isPayButtonDisabled()}
            >
              Pay ₹30
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
