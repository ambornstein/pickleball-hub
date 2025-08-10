'use client'

import InputField from "@/components/InputField";
import { FormPageLayout } from "@/components/layout/FormPageLayout";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (<input type="submit" className="button w-36" disabled={pending} />)
}

export default function NewLocationPage() {

    return (
        <FormPageLayout>
            <h2>Submit Location</h2>
            <form className="flex flex-col gap-4 items-center mt-4" method="post" action="/api/location">
                <div className="grid grid-cols-2 gap-4">
                    <InputField className="col-span-2" label="Location Name" valueName="locationName"></InputField>
                    <InputField className="col-span-2" label="Site Link" valueName="url" type="url" />
                    <AddressAutofill accessToken='pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'>
                        <InputField label="Address" valueName="address" autoComplete="address-line1" />
                        <input className="absolute collapse" name="zipcode" autoComplete="postal-code" />
                        <input className="absolute collapse" name="city" autoComplete="address-level2" />
                        <input className="absolute collapse" name="state" autoComplete="address-level2" />
                    </AddressAutofill>
                    <InputField label="Phone Number" valueName="phoneNumber" />
                </div>
                <div className="flex flex-row justify-evenly w-full my-4">
                    <label><input type="checkbox" name="openPlay" />Open Play</label>
                    <label><input type="checkbox" name="reservations" />Reservations</label>
                    <label><input type="checkbox" name="lessons" />Lessons</label>
                </div>
                <SubmitButton />
            </form>
        </FormPageLayout>
    )
}