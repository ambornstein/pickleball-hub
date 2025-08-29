export default function ColumnNameTable() {
    return (
        <table className="border-spacing-1 border-separate [&_td]:border [&_td]:border-slate-500 [&_td]:p-1">
            <caption className="text-xl">Accepted Fields and Inputs</caption>
            <thead>
                <tr>
                    <th>Field</th>
                    <td>Location Name</td>
                    <td>Address</td>
                    <td>Phone Number</td>
                    <td>Site</td>
                    <td>Zipcode</td>
                    <td>Open Play</td>
                    <td>Reservations</td>
                    <td>Lessons</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Column Name</th>
                    <td>name</td>
                    <td>address</td>
                    <td>phoneNumber</td>
                    <td>url</td>
                    <td>zipcode</td>
                    <td>openPlay</td>
                    <td>reservations</td>
                    <td>lessons</td>
                </tr>
                <tr>
                    <th>Input Type</th>
                    <td>String</td>
                    <td>String</td>
                    <td>String</td>
                    <td>String</td>
                    <td>Number</td>
                    <td>true/false</td>
                    <td>true/false</td>
                    <td>true/false</td>
                </tr>
            </tbody>
        </table>
    )
}