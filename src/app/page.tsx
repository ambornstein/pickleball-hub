import CourtNavPanel from "@/components/CourtNavPanel";
import HeaderBar from "@/components/HeaderBar";
import LinkScroll from "@/components/LinkScroll";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeaderBar />
      <main className="flex flex-col items-center justify-center overflow-clip">
        <div className="flex flex-col h-[100vh-86px] space-y-12 items-center">
          <LinkScroll />
          <div className="flex flex-row container gap-28 items-center">
            <CourtNavPanel />
            <div id="about" className="w-[50%]">
              <h2 className="text-2xl text-center">About</h2>
              <p>
                Houston Pickleball Hub is a public registry of pickleball establishments in the Houston Metropolitan Area.
                It is meant to showcase a variety of locations with different schedules and options for play, so that everyone who visits can find the place that is best for them quickly and easily.
                I hope that you get good use out of this site.
              </p>
              <br />
              <p>
                This site was created to fill an important need for pickleball enthusiasts but also as a project to gain experience in user experience (UX) design. Because of this, the number 1 priority is how accessible and intuitive the site is for users, and whether it allows them to find what they are looking for efficiently. Feedback is necessary to the site improving and growing.
              </p>
            </div>
          </div>
          <LinkScroll />
        </div>

        <div id="secondary" className="mt-36">
          <section id="partnership" className="container m-auto my-8">
            <h2 className="text-2xl text-center my-4">Partnership</h2>
            <p>
              If you are the owner of a pickleball establishment or are promoting a new establishment, contacting the administrator of this site is encouraged.
              While there is the option of submitting a pickleball space through this site, business owners would be advised to discuss with the site creator at email amborn02@gmail.com or via LinkedIn.
            </p>
            <br />
            <p>
              This site is made for the benefit of both pickleball players and pickleball business owners in the Houston area.
              The priority is a fair and balanced registry of pickleball establishments in the Houston area, but advertising opportunities are on the table as long as they do not involve promoting one single establishment over others.
            </p>
          </section>
        </div>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        <p>Created by Andrei Bornstein — <a href="https://www.andreibornstein.com">andreibornstein.com</a></p>
      </footer>
    </div>
  );
}
