import Modal, { ModalProps } from "./Modal";
import InputField from "./InputField";

export default function SubmitLocationModal(props: ModalProps) {
    return (
        <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
            <h2>Submit Location</h2>
            <form className="flex flex-col gap-4 items-center mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputField className="col-span-2" label="Location Name" valueName="locationName"></InputField>
                    <InputField label="Address" valueName="address" />
                    <InputField label="Zip Code" valueName="zipcode" />
                    <InputField label="Phone Number" valueName="phone" />
                    <InputField label="Site Address" valueName="url" />
                </div>
                <div className="flex flex-row justify-evenly w-full my-4">
                    <label><input type="checkbox" name="openPlay" />Open Play</label>
                    <label><input type="checkbox" name="reservations" />Reservations</label>
                    <label><input type="checkbox" name="lessons" />Lessons</label>
                </div>
                <input type="submit" className="button w-36" />
            </form>
        </Modal>)
}