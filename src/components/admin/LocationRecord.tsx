import { BooleanCell } from "./BooleanCell";

export default function LocationRecord(props: { loc: Venue, selected: boolean, setEditingLocation: (v: Venue) => void}) {

    return <tr key={props.loc._id} className={`${props.selected ? 'bg-blue-800' : ''} hover:cursor-pointer`} onClick={() => props.setEditingLocation(props.loc)}>
        <td>{props.loc.name}</td>
        <td>{props.loc.address}</td>
        <td className="link"><a href={props.loc.url}>{props.loc.url}</a></td>
        <td>{props.loc.zipcode}</td>
        <BooleanCell value={props.loc.openPlay} />
        <BooleanCell value={props.loc.reservations} />
        <BooleanCell value={props.loc.lessons} />
    </tr>
}