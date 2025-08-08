'use client'

import InputField from "@/components/InputField";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useState } from "react";

export default function NewLocationPage() {
    const [openPlay, setOpenPlay] = useState(false);
    const [reservations, setReservations] = useState(false);
    const [lessons, setLessons] = useState(false);

    return (
        <main className="center min-h-screen font-standard">
            <div className="panel w-lg">
                <h2>Submit Location</h2>
                <form className="flex flex-col gap-4 items-center mt-4" method="post" action="/api/location">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField className="col-span-2" label="Location Name" valueName="locationName"></InputField>
                        <InputField className="col-span-2" label="Site Link" valueName="url" type="url"/>
                        <AddressAutofill accessToken='pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'>
                            <InputField label="Address" valueName="address" autoComplete="address-line1" />
                            <input className="absolute collapse" name="zipcode" autoComplete="postal-code"/>
                            <input className="absolute collapse" name="city" autoComplete="address-level2"/>
                            <input className="absolute collapse" name="state" autoComplete="address-level2"/>
                        </AddressAutofill>
                        <InputField label="Phone Number" valueName="phone" />
                    </div>
                    <div className="flex flex-row justify-evenly w-full my-4">
                        <label><input type="checkbox" name="openPlay" onChange={e => setOpenPlay(e.target.checked) } value={Number(openPlay)} />Open Play</label>
                        <label><input type="checkbox" name="reservations" onChange={e => setReservations(e.target.checked) } value={Number(reservations)} />Reservations</label>
                        <label><input type="checkbox" name="lessons" onChange={e => setLessons(e.target.checked) } value={Number(lessons)} />Lessons</label>
                    </div>
                    <input type="submit" className="button w-36" />
                </form>
            </div>
        </main>
    )
}