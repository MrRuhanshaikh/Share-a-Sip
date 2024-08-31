"use client"
import Image from "next/image";
import Link from "next/link";
export default function Home() {
const toggelScreen = () => {

}
  return (
    <main className="min-h-[80vh] text-white">
      <div class="fixed left-0 top-0 -z-10 h-full w-full">
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      </div>
      <div id="home" className="relative hero flex flex-col gap-10 text-white justify-center border-b border-zinc-500 items-center h-[85vh]">
        <div className="text-3xl sm:text-6xl flex ">
          <span>
            <h1>
              <span className="text-5xl sm:text-8xl bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent ">
                S
              </span>
              hare a{" "}
              <span
                className="text-4xl sm:text-7xl border-b border-transparent"
                style={{
                  borderImage: "linear-gradient(to right, #38bdf8, #34d399) 1",
                }}
              >
                Sip
              </span>
            </h1>
          </span>
          <span>
            <Image
              className="hidden sm:block"
              src="/favicon.ico"
              width={90}
              height={90}
              alt="logo-icon"
            />
             <Image
              className="sm:hidden"
              src="/favicon.ico"
              width={50}
              height={50}
              alt="logo-icon"
            />
          </span>
        </div>
        <div className="sm:text-xl text-center mx-5">
          Support the Creators You Love by Sharing a Sip, Turning Every Cup into
          a Contribution Towards Their Dreams
        </div>
        <div className="flex gap-10">
          <button className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center -">
            Start Here
          </button>
          <button className="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center -">
           <Link href='#about-us'> Read More</Link>
          </button>
        </div>
      </div>
      <div id="about-us" className="flex flex-col mx-10 items-center gap-10 ">
        <h2 className="text-xl sm:text-2xl font-bold my-11 "><span className="sm:text-3xl">S</span>upport the Creators You Love by <span className=" bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent ">Sharing a Sip</span></h2>
        <div className="flex flex-col md:flex-row gap-9 lg:gap-28">
         <div className="card flex flex-col gap-5 items-center justify-center">
              <div><Image
              src="/man.gif"
              width={90}
              height={90}
              alt="Fuel the passion"
              className="rounded-md"
            /></div>
            <div className="font-bold text-xl">Fuel Their Passion</div>
            <div className="text-lg">Your contribution keeps creativity alive</div>
         </div>
         <div className="card flex flex-col gap-5 items-center justify-center">
              <div><Image
              src="/dollar.gif"
              width={90}
              height={90}
              alt="Fund Yourself"
              className="rounded-md"
            /></div>
            <div className="font-bold text-xl">Fund Yourself</div>
            <div className="text-lg">Your fans are available to help you</div>
         </div>
         <div className="card flex flex-col gap-5 items-center justify-center">
              <div><Image
              src="/group.gif"
              width={90}
              height={90}
              alt="support-circle"
              className="rounded-md"
            /></div>
            <div className="font-bold text-xl">Join the Support Circle</div>
            <div className="text-lg">Together, we help creators thrive</div>
         </div>
         </div>
      </div>
    </main>
  );
}
