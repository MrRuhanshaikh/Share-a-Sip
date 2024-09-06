/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',  // Allow images from any external domain via HTTPS
        },
      ],
    },
  };
  
  export default nextConfig;
  