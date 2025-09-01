export default function ColumnNameTable() {
    return (
        <table className="border-spacing-1 border-separate [&_td]:border [&_td]:border-slate-500 [&_td]:p-1 h-fit">
            <caption className="text-xl">Accepted Fields and Inputs</caption>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Input Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Location Name</td>
                    <td>String</td>

                </tr>
                <tr>
                    <td>Address</td>
                    <td>String</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>String</td>
                </tr>
                <tr>
                    <td>Site</td>
                    <td>String</td>
                </tr>
                <tr>
                    <td>Zipcode</td>
                    <td>Number</td>
                </tr>
                <tr>
                    <td>Open Play</td>
                    <td>true/false</td>
                </tr>
                <tr>
                    <td>Reservations</td>
                    <td>true/false</td>
                </tr>
                <tr>
                    <td>lessons</td>
                    <td>Lessons</td>
                </tr>
            </tbody >
        </table >
    )
}