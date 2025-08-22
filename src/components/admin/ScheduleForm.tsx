import { FormEvent } from "react"

interface ScheduleFormProps {
    schedule: Schedule,
    submitAction: (e: FormEvent) => void
}

const intToHour = (hour: number) => `${("00" + hour).slice(-2)}:00`

export default function ScheduleForm(props: ScheduleFormProps) {
    return (
        <form onSubmit={props.submitAction}>
            <table className="border-spacing-1 border-separate
                [&_td]:border [&_td]:border-slate-500 [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:max-w-[200px] [&_td]:p-1 [&_td]:truncate [&_td]:*:m-auto">
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
                        <td><input type="time" name="weekOpen" step={3600} defaultValue={intToHour(props.schedule?.weekday?.openTime ?? 0)} /></td>
                        <td><input type="time" name="weekClose" step={3600} defaultValue={intToHour(props.schedule?.weekday?.closeTime ?? 0)} /></td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td><input type="time" name="satOpen" step={3600} defaultValue={intToHour(props.schedule?.saturday?.openTime ?? 0)} /></td>
                        <td><input type="time" name="satClose" step={3600} defaultValue={intToHour(props.schedule?.saturday?.closeTime ?? 0)} /></td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td><input type="time" name="sunOpen" step={3600} defaultValue={intToHour(props.schedule?.sunday?.openTime ?? 0)} /></td>
                        <td><input type="time" name="sunClose" step={3600} defaultValue={intToHour(props.schedule?.sunday?.closeTime ?? 0)} /></td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" className="button w-full"/>
        </form >
    )
}