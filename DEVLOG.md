Wednesday — 8/13/2025

I just finished the basic authentication logic, but it's very rudimentary and reliant on context and has no memory of sessions. Up to this point the map and location submission are the main features that work. The site will soon be able to handle traffic, but not before the submission review system is in place. Also the front page should be adjusted to introduce the site better and hook users.

Accounts aren't as necessary for now but the authentication system is good to have for the route protection for my admin page. Once my page is up I can start adding fields to each pickleball location like times and court counts. It will be ok if users see placeholder reviews so that they know what to expect from the finished version.

At this point, I am happy about the state of the site's infrastructure, but polishing parts of UX and page content are absolutely essential going forward.

Friday — 8/22/2025

After a long period of procrastination, I finally implemented standard business hours as a field on each location. This is a big step towards completing the location info pages. The location pages are extremely critical and almost at the point of completion. However, going forward, reviews for these pages is a low priority. The next highest priorities are now evident:

- NextAuth authentication with multiple providers (Google especially)
- Batch location upload

After this, a lot of frontend work will be necessary, including loading indicators and input responsiveness. That is all for now. UX is important but it will be left for last until all of the functionality is in place.

Saturday — 8/30/2025

I finished batch uploads, the admin permission table, and admin page protection based on user roles. I also just got authentication to work in production. So essentially the backend is totally done for now because I'm not adding any extra features like reviews, image uploads, or account customization yet. What is already up can quickly be improved to have better UX so that the first users can have an impression of a more polished product. It will stop them from being distracted by annoying UX stuff and instead give more feedback as to requirements and features they will actually want.

Sunday — 8/31/2025

I didnt finish my log entry yesterday :\. I did manage to improve some frontend things though. The most noticeable is the new background. I think it helps the site look more appealing and less sterile. Apart from that, I honestly can't count the amount of small frontend things that should be fixed. Most important is definitely mobile optimization. However, between trying to figure out how to do loaders and skeletons, my brain is cooked.

I also forgot to commit the changes yesterday. This commit is actually kind of hefty.