import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold text-3xl md:text-5xl flex justify-center items-center gap-2">Get Me a Chai <span><img width={88} className="invertImg" src="/tea.gif" alt="" /></span></div>
        <p className="text-center md:text-left"> A crowdfunding platform for creators to fund their projects.</p>
        <p className="text-center md:text-left">A place where your fans can buy you a Chai. Unleash the power of your fans and get your projects funded.</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="btn text-white mr-5 rounded-sm bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Start Here</button> </Link>

          <Link href={"/about"}>
            <button type="button" className="btn text-white rounded-sm bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Read More</button> </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">

      </div>

      <div className="text-white container mx-auto pb-20 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 text-black rounded-full p-2" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p> Your fans are available to support you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 text-black rounded-full p-2" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p> Your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className=" bg-slate-400 text-black rounded-full p-2" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p> Your fans are ready to collabrate with you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">

      </div>

      <div className="text-white container mx-auto pt-10 flex flex-col items-center  justify-center">
        <h2 className="text-3xl font-bold text-center">Learn more about us</h2>


        <video className=" w-[55vw] md:w-auto rotate-270"
          controls
          src="/Spidermanvideo.mp4"></video>

      </div>
    </>
  );
}
