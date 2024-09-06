# Share-a-Sip

**Share-a-Sip** is a dynamic platform designed for content creators to manage and showcase their profiles, allowing users to support their favorite creators through funding. Inspired by platforms like Patreon and BuyMeACoffee, this application enables seamless integration of Razorpay for handling payments, showcasing advanced features in Next.js, Auth.js, and Tailwind CSS.

## Overview

Share-a-Sip provides a robust solution for content creators to monetize their content by receiving donations directly from users. The project demonstrates an extensive use of modern web technologies and offers an insightful learning experience in the following areas:

- **Next.js Routing**: Implementing advanced routing techniques and handling dynamic pages.
- **Razorpay Integration**: Integrating payment gateways for secure transactions.
- **Database Management**: Transitioning from MongoDB Compass to MongoDB Atlas, with dynamic CRUD operations.
- **Authentication**: Managing user authentication with multiple providers using NextAuth.
- **Cloud Hosting**: Deploying applications with Vercel, handling environment variables, and ensuring smooth transitions between local and production setups.

## Features

- **Dynamic User Profiles**: Each content creator can create and manage a personalized profile.
- **Real-Time Donations**: Users can make payments to their favorite creators using Razorpay.
- **Secure Authentication**: Supports authentication via GitHub with robust session management.
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive user interface.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Auth.js (NextAuth)**: Authentication library for managing user sessions and third-party logins.
- **Tailwind CSS**: Utility-first CSS framework for creating custom designs without leaving HTML.
- **Razorpay**: Payment gateway for processing transactions.
- **MongoDB Atlas**: Cloud database service for storing user and payment information.

## Learnings

This project has been a comprehensive learning journey in various aspects of modern web development:

- **Next.js Routing**: Mastering routing strategies for dynamic and static pages.
- **Payment Integration**: Implementing and troubleshooting Razorpay payments.
- **Database Handling**: Transitioning from MongoDB Compass to Atlas and handling CRUD operations dynamically.
- **Authentication**: Setting up secure authentication with NextAuth and managing different authentication providers.
- **Cloud Deployment**: Navigating the complexities of environment configurations and deploying applications on cloud platforms.

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/MrRuhanshaikh/Share-a-Sip.git
    cd Share-a-Sip
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env.local` file in the root of your project and add the following variables:

    ```env
    NEXTAUTH_URL=your_hosting-url
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
    MONGODB_URI=your_mongodb_atlas_connection_string
    ```

4. **Run the Application:**

    ```bash
    npm run dev
    ```
