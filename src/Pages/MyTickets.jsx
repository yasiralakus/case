import { useContext } from "react"
import { DataContext } from "../App"
import { Link } from "react-router-dom";

export default function MyTickets() {

    const {myTickets, setMyTickets} = useContext(DataContext);


    return (
        <div className="my-tickets">
            
            <table>
                <tr>
                    <th>Tarih</th>
                    <th>Havayolu Şirketi</th>
                    <th>Kalkış Yeri ve Saati</th>
                    <th>Varış Yeri ve Saati</th>
                    <th>Fiyat</th>
                </tr>
                {
                    myTickets?.length > 0 && myTickets.map(x => (
                        <tr>
                            <td>
                                <h6>{x.date}</h6>
                            </td>
                            <td>
                                <h6>{x.airline}</h6>
                            </td>
                            <td>
                                <p>{x.departure_time.slice(11,16)}</p>
                                <h6>{x.departure}</h6>
                            </td>
                            <td>
                                <p>{x.arrival_time.slice(11,16)}</p>
                                <h6>{x.arrival}</h6>
                            </td>
                            <td>
                                <h6>{x.price}</h6>
                            </td>
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}