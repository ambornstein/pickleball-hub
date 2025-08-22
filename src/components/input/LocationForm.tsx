import { FormEvent, useState } from "react"
import InputField from "./InputField"

interface LocationProps {
    location?: Venue
    submitAction: (e: FormEvent) => void
}

export default function LocationForm(props: LocationProps) {
    const [openPlay, setOpenPlay] = useState(props.location?.openPlay)
    const [reservations, setReservations] = useState(props.location?.reservations)
    const [lessons, setLessons] = useState(props.location?.lessons)

    return (
        <>
            <h2>Submit Location</h2>
            <form className="flex flex-col gap-4 items-center mt-4" onSubmit={props.submitAction}>
                <div className="grid grid-cols-2 gap-4">
                    <InputField className="col-span-2" label="Location Name" valueName="locationName" initValue={props.location?.name} />
                    <InputField className="col-span-2" label="Site Link" valueName="url" type="url" initValue={props.location?.url} />
                    {/* <AddressAutofill accessToken='pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'> */}
                    <InputField label="Address" valueName="address" autoComplete="address-line1" initValue={props.location?.address} />
                    <input type="hidden" name="zipcode" required={false} autoComplete="postal-code" />
                    <input type="hidden" name="city" required={false} autoComplete="address-level2" />
                    <input type="hidden" name="state" required={false} autoComplete="address-level2" />
                    {/* </AddressAutofill> */}
                    <InputField label="Phone Number" valueName="phoneNumber" type="tel" initValue={props.location?.phoneNumber} />
                </div>
                <div className="flex flex-row justify-evenly w-full my-4">
                    <label><input type="checkbox" name="openPlay" defaultChecked={openPlay} value={openPlay ? "true" : "false"} onChange={e => setOpenPlay(e.target.checked)}/>Open Play</label>
                    <label><input type="checkbox" name="reservations" defaultChecked={reservations} value={reservations ? "true" : "false"} onChange={e => setReservations(e.target.checked)} />Reservations</label>
                    <label><input type="checkbox" name="lessons" defaultChecked={lessons} value={lessons ? "true" : "false"} onChange={e => setLessons(e.target.checked)}/>Lessons</label>
                </div>
                <input type="submit" className="button w-full"/>
            </form>
        </>
    )
}