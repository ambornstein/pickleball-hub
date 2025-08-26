import { FormEvent } from "react"
import Modal from "../../Modal"
import { extractFormJSON } from "@/lib/utils"
import { AdminEditModalProps } from "@/app/admin/page"

const intToHour = (hour: number) => `${("00" + hour).slice(-2)}:00`

export default function ScheduleModal(props: AdminEditModalProps) {

    const updateSchedule = async (e: FormEvent) => {
        e.preventDefault();
        if (!props.editingLocation) return

        const formData = extractFormJSON(e)

        const data = {
            schedule: {
                weekday: {
                    openTime: Number.parseInt(formData.weekOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.weekClose.toString().slice(0, 2))
                },
                saturday: {
                    openTime: Number.parseInt(formData.satOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.satClose.toString().slice(0, 2))
                },
                sunday: {
                    openTime: Number.parseInt(formData.sunOpen.toString().slice(0, 2)),
                    closeTime: Number.parseInt(formData.sunClose.toString().slice(0, 2))
                }
            },
            outdoorCourts: formData.outdoorCourts ?? -1,
            indoorCourts: formData.indoorCourts ?? -1,
            openPlay: props.editingLocation.openPlay,
            reservations: props.editingLocation.reservations,
            lessons: props.editingLocation.lessons
        }

        await fetch(`api/location/${props.editingLocation._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        props.clearSelection()
        props.fetchLocations()
    }

    if (!props.editingLocation?.schedule) return null
    else
        return (
            <Modal isOpen={!!props.editingLocation} setIsOpen={props.clearSelection}>
                <form onSubmit={updateSchedule}>
                    <table className="border-spacing-1 border-separate
                [&_td]:border [&_td]:border-slate-500 [&_td]:text-nowrap [&_th]:text-nowrap [&_input]:w-[110px] [&_td]:w-[120px] [&_td]:p-1 [&_td]:truncate [&_td]:*:m-auto">
                        <thead>
                            <tr>
                                <th>Section</th>
                                <th>Open Time</th>
                                <th>Close Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Weekday</td>
                                <td><input type="time" name="weekOpen" step={3600} defaultValue={intToHour(props.editingLocation.schedule.weekday?.openTime ?? 0)} /></td>
                                <td><input type="time" name="weekClose" step={3600} defaultValue={intToHour(props.editingLocation.schedule.weekday?.closeTime ?? 0)} /></td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td><input type="time" name="satOpen" step={3600} defaultValue={intToHour(props.editingLocation.schedule?.saturday?.openTime ?? 0)} /></td>
                                <td><input type="time" name="satClose" step={3600} defaultValue={intToHour(props.editingLocation.schedule?.saturday?.closeTime ?? 0)} /></td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td><input type="time" name="sunOpen" step={3600} defaultValue={intToHour(props.editingLocation.schedule?.sunday?.openTime ?? 0)} /></td>
                                <td><input type="time" name="sunClose" step={3600} defaultValue={intToHour(props.editingLocation.schedule?.sunday?.closeTime ?? 0)} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex my-4 gap-8 w-full">
                        <label className="block w-auto">Outdoor Courts
                            <input className="w-full text-input" name="outdoorCourts" type="number" min={0} defaultValue={props.editingLocation.outdoorCourts} />
                        </label>
                        <label className="block w-auto">Indoor Courts
                            <input className="w-full text-input" name="indoorCourts" type="number" min={0} defaultValue={props.editingLocation.indoorCourts} />
                        </label>
                    </div>
                    <input type="submit" className="button w-full" />
                </form >
            </Modal>
        )
}