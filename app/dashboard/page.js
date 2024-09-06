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
  }, [session, router, getData]);

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
        <form className="-z-10 max-w-sm mx-auto space-y-2.5  px-4 " action={handleSubmit}>
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
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Email
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
                  d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="email"
              id="uemail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              name="email"
              value={form.email || ""}
            />
          </div>
          <label
            htmlFor="bio-icon"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Bio
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
                  d="M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M22 17.5C22 19.433 20.433 21 18.5 21C16.567 21 15 19.433 15 17.5C15 15.567 16.567 14 18.5 14C20.433 14 22 15.567 22 17.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M9 17.5C9 19.433 7.433 21 5.5 21C3.567 21 2 19.433 2 17.5C2 15.567 3.567 14 5.5 14C7.433 14 9 15.567 9 17.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              id="bio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Bio"
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
            />
          </div>
          <label
            htmlFor="profile-img"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Profile Image
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
                  d="M12 5L12 15M12 5C11.2998 5 9.99153 6.9943 9.5 7.5M12 5C12.7002 5 14.0085 6.9943 14.5 7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 19H19.0001"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="profile-img"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Profile Image URL"
              onChange={handleChange}
              name="profile_pic"
              value={form.profile_pic || ""}
            />
          </div>
          <label
            htmlFor="cover-img"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Cover Image
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
                  d="M12 4.5L12 14.5M12 4.5C11.2998 4.5 9.99153 6.4943 9.5 7M12 4.5C12.7002 4.5 14.0085 6.4943 14.5 7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="cover-img"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cover Image URL"
              onChange={handleChange}
              name="cover_pic"
              value={form.cover_pic || ""}
            />
          </div>
          <label
            htmlFor="razorpay_id"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Razorpay ID
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
                  d="M3.3457 16.1976L16.1747 3.36866M18.6316 11.0556L16.4321 13.2551M14.5549 15.1099L13.5762 16.0886"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.17467 16.1411C1.60844 14.5749 1.60844 12.0355 3.17467 10.4693L10.4693 3.17467C12.0355 1.60844 14.5749 1.60844 16.1411 3.17467L20.8253 7.85891C22.3916 9.42514 22.3916 11.9645 20.8253 13.5307L13.5307 20.8253C11.9645 22.3916 9.42514 22.3916 7.85891 20.8253L3.17467 16.1411Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M4 22H20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="razorpay_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Provide Razorpay ID"
              onChange={handleChange}
              name="razorpay_id"
              value={form.razorpay_id || ""}
            />
          </div>
          <label
            htmlFor="razorpay_secret"
            className="block mb-2 text-lg font-medium text-left text-gray-900 dark:text-white"
          >
            Razorpay Secret
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
                  d="M3.3457 16.1976L16.1747 3.36866M18.6316 11.0556L16.4321 13.2551M14.5549 15.1099L13.5762 16.0886"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.17467 16.1411C1.60844 14.5749 1.60844 12.0355 3.17467 10.4693L10.4693 3.17467C12.0355 1.60844 14.5749 1.60844 16.1411 3.17467L20.8253 7.85891C22.3916 9.42514 22.3916 11.9645 20.8253 13.5307L13.5307 20.8253C11.9645 22.3916 9.42514 22.3916 7.85891 20.8253L3.17467 16.1411Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M4 22H20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="razorpay_secret"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Provide Razorpay Secret"
              onChange={handleChange}
              name="razorpay_secret"
              value={form.razorpay_secret || ""}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full invisible text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="w-full  text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
