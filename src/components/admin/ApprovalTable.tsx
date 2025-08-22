import { BiCheck } from "react-icons/bi"
import { BooleanCell } from "./BooleanCell"

interface ApprovalTableProps {
    refreshLocations: () => void
    stagedLocations?: Venue[]
}

export default function ApprovalTable(props: ApprovalTableProps) {

    const approvePendingLocation = (id: string) => {
        fetch(`api/pending-location/${id}`, {
            method: "PATCH"
        }).then(() => props.refreshLocations())
    }

    return (<div className="w-fit bg-slate-700">
        <table className="border-spacing-1 border-separate
                [&_td]:border [&_td]:border-slate-500 [&_td]:text-nowrap [&_th]:text-nowrap [&_td]:max-w-[200px] [&_td]:p-1 [&_td]:truncate">
            <caption>Locations for Review</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Site</th>
                    <th>Zipcode</th>
                    <th>Open Play</th>
                    <th>Reservations</th>
                    <th>Lessons</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.stagedLocations?.map((loc, index) =>
                    <tr key={loc._id}>
                        <td>{loc.name}</td>
                        <td>{loc.address}</td>
                        <td>{loc.url}</td>
                        <td>{loc.zipcode}</td>
                        <BooleanCell value={loc.openPlay} />
                        <BooleanCell value={loc.reservations} />
                        <BooleanCell value={loc.lessons} />
                        <td className="*:inline *:size-6">
                            <BiCheck onClick={() => approvePendingLocation(loc._id)} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    )
}