import { BiCheck, BiX } from "react-icons/bi";

export const BooleanCell = ({ value }: { value: boolean }) => (
    <td className="*:m-auto">{value ? <BiCheck /> : <BiX />}</td>
)