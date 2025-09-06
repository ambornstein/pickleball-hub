import LinkScroll from "@/components/LinkScroll";
import LinkScrollReverse from "@/components/LinkScrollReverse";
import Image from "next/image";
import { BiMap } from "react-icons/bi";
import { CiMap, CiViewList } from "react-icons/ci";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <div className="grid grid-rows-[min-content_auto_min-content] gap-4 min-h-[85vh] justify-center">
        <LinkScroll />
        <div className="w-full flex justify-center">
          <div className="w-[90vw] grid grid-cols-1 gap-4 items-center xl:max-w-[70%] md:max-w-[60%] lg:max-w-[80%] lg:grid-cols-2 lg:gap-12 ">
            <div className="grid grid-rows-2 grid-cols-[32%_auto] aspect-[3/2] gap-4">
              <a href="/search" className="flex-col row-span-2 panel-link rounded-s-3xl">
                <CiMap className="panel-icon" />
                <span>Map</span>
              </a>
              <a className="panel-link rounded-tr-3xl">
                <CiViewList className="panel-icon" />
                <span>Events</span>
              </a>
              <a href="/submit-location" className="panel-link rounded-br-3xl">
                <BiMap className="panel-icon" />
                <div className="flex flex-col">
                  <span>Submit</span>
                  <span>Location</span>
                </div>
              </a>
            </div>
            <div className="w-full flex flex-col gap-4 items-center" id="about">
              <span className="md:text-4xl text-2xl block">Welcome to the Houston Pickleball Hub Site</span>
              <span className="text-xl block">Houston Pickleball Hub is a site for finding information on pickleball venues in the Houston Area. Use this site to find places to play pickleball in Houston. </span>
            </div>
          </div>
        </div>
        <LinkScrollReverse />
      </div>
      <section id="about" className="max-w-4xl h-screen flex flex-col m-auto my-24 px-4 ">
        <h2>About</h2>
        <div className="flex lg:flex-row gap-4 flex-col-reverse">
          <p className="bg-zinc-700/60 rounded-lg p-4">
            There are a variety of locations with different schedules and options for play, and the map can help you find the place that is best for them quickly and easily.
          </p>
          <Image width={550} height={550} alt='Map' className="w-full" src={'/picklemap.PNG'} />
        </div>
      </section>
      <footer className="grid md:grid-rows-3 lg:grid-rows-1 lg:grid-cols-[400px_auto_auto] gap-[24px] p-2 items-center justify-center w-auto h-fit text-[12px] mt-4 bg-zinc-800 shrink-0">
        <div>
          <h4>Partnership</h4>
          <p className="text-[12px]">
            If you are the owner of a pickleball establishment or are promoting a new establishment, contacting the administrator of this site is encouraged.
            Business owners are be advised to contact the site creator at email amborn02@gmail.com.
          </p>
        </div>
        <p>Created by Andrei Bornstein — <a href="https://www.andreibornstein.com">andreibornstein.com</a></p>
        <div className="*:block">
          <a href="https://www.flaticon.com/free-animated-icons/padel" title="padel animated icons">Padel animated icons created by Freepik - Flaticon</a>
          <a href="https://www.vecteezy.com/free-vector/pickle-ball-icon">Pickle Ball Icon Vectors by Vecteezy</a>
        </div>
      </footer>
    </main>
  );
}
