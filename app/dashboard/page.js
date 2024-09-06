"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "../actions/useractions";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [form, setForm] = useState({});
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [session, router]);

  const getData = async () => {
    let user = await fetchuser(session.user.name);
    setForm(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const toastId = uuidv4(); // Generate a unique toast ID

    // Check if there's an active toast
    if (!toast.isActive(toastId)) {
      try {
        await updateProfile(form, session.user.name);
        toast.success("Profile Updated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          toastId: toastId,
        });
        router.push(`/${session.user.name.replaceAll(" ", "-")}`);
      } catch (error) {
        toast.error("Failed to update profile. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          toastId: toastId,
        });
      }
    }
  };

  return (
    <>
      <div className="mt-16">
        <div className="text-2xl my-5 font-bold ">Complete Your Profile...</div>
        <form
          className="-z-10 max-w-sm mx-auto space-y-2.5  px-4"
          onSubmit={handleSubmit} // Use onSubmit instead of action
        >
          {/* Name Input */}
          <label
            htmlFor="uname"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                color="#9b9b9b"
                fill="none"
              >
                <path
                  d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              id="uname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
            />
          </div>
          {/* Remaining Input Fields... */}
          {/* The rest of your form fields go here with similar patterns */}
          <button
            type="submit" // Ensure button type is submit
            className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
