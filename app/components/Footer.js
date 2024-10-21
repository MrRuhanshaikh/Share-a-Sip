// Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='w-full px-3 py-3 text-white backdrop-blur-md opacity-80 flex justify-center items-center text-center'>
      <div>&copy; 
        <span className="text-xl bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent">
          S
        </span>
        hare a
        <span
          className="border-b border-transparent text-lg"
          style={{
            borderImage: "linear-gradient(to right, #38bdf8, #34d399) 1",
          }}
        >
          Sip&nbsp;
        </span> || All rights reserved || Created with ❤️ By Grp 13
        {/* <Link className='font-bold' href='https://github.com/MrRuhanshaikh'>
        &nbsp;Ruhan Shaikh
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
