import LinkScroll from "@/components/LinkScroll";
import LinkScrollReverse from "@/components/LinkScrollReverse";
import { BiMap } from "react-icons/bi";
import { CiMap, CiViewList } from "react-icons/ci";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-clip">
      <div className="grid grid-rows-[min-content_auto_min-content] gap-y-4 min-h-[85vh] justify-center">
        <LinkScroll />
        <div className="w-full flex justify-center">
          <div className="w-[80vw] grid grid-cols-1 gap-4 items-center lg:max-w-[50%]
              xl:grid-cols-2 xl:px-28 xl:gap-12 xl:max-w-[80%]">
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
            <div className="w-full" id="about">
              <h2>Welcome to the Houston Pickleball Hub Site</h2>
              <span>Use this site to find places to play pickleball in Houston. </span>
            </div>
          </div>
        </div>
        <LinkScrollReverse />
      </div>
      <section id="partnership" className="w-lg m-auto my-8 h-full px-4">
        <h2>Partnership</h2>
        <p>
          If you are the owner of a pickleball establishment or are promoting a new establishment, contacting the administrator of this site is encouraged.
          While there is the option of submitting a pickleball space through this site, business owners would be advised to discuss with the site creator at email amborn02@gmail.com or via LinkedIn.
        </p>
        <br />
        <p>
          This site is made for the benefit of both pickleball players and pickleball business owners in the Houston area.
          The priority is a fair and balanced registry of pickleball establishments in the Houston area, but advertising opportunities are on the table as long as they do not involve promoting one single establishment over others.
        </p>
        <h2>About</h2>
        <p>
          Houston Pickleball Hub is a public registry of pickleball establishments in the Houston Metropolitan Area.
          It is meant to showcase a variety of locations with different schedules and options for play, so that everyone who visits can find the place that is best for them quickly and easily.
          I hope that you get good use out of this site.
        </p>
        <br />
        <p>
          This site was created to fill an important need for pickleball enthusiasts but also as a project to gain experience in user experience (UX) design.
          Because of this, the number 1 priority is how accessible and intuitive the site is for users, and whether it allows them to find what they are looking for efficiently.
          Feedback is necessary to the site improving and growing.
        </p>
      </section>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <p>Created by Andrei Bornstein — <a href="https://www.andreibornstein.com">andreibornstein.com</a></p>
        <a href="https://www.flaticon.com/free-animated-icons/padel" title="padel animated icons">Padel animated icons created by Freepik - Flaticon</a>
      </footer>
    </main>
  );
}
