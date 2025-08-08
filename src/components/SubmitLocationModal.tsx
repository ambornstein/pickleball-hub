'use client'

import Modal, { ModalProps } from "./Modal";
import InputField from "./InputField";
import { AddressAutofill } from "@mapbox/search-js-react";

export default function SubmitLocationModal(props: ModalProps) {
    return (
        <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
            <h2>Submit Location</h2>
            <form className="flex flex-col gap-4 items-center mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField className="col-span-2" label="Location Name" valueName="locationName"></InputField>
                    <InputField className="col-span-2" label="Site Link" valueName="url" />
                    <AddressAutofill accessToken='pk.eyJ1IjoiYW1ib3Juc3RlaW4iLCJhIjoiY2x3ajhnYjBjMHk1cDJrbXdjZHdqaWZ3cyJ9._K7RJ6SvA6Tg2VtuZjfCig'>
                        <InputField label="Address" valueName="address" />
                    </AddressAutofill>
                    <InputField label="Phone Number" valueName="phone" />
                </div>
                <div className="flex flex-row justify-evenly w-full my-4">
                    <label><input type="checkbox" name="openPlay" />Open Play</label>
                    <label><input type="checkbox" name="reservations" />Reservations</label>
                    <label><input type="checkbox" name="lessons" />Lessons</label>
                </div>
                <input type="submit" className="button w-36" />
            </form>
        </Modal >)
}