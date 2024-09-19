import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function Home() {

    const {myTickets, setMyTickets} = useContext(DataContext);
    const [loading, setLoading] = useState(false);
    const [filterDate, setFilterDate] = useState('bugün')

    const formatDateForInput = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const localDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [ticketData, setTicketData] = useState(null);
    console.log(ticketData)
    console.log(myTickets)

    async function searchTicket(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        setFilterDate(formObj.date);
        setLoading(true)
        const response = await fetch(`https://api.aviationstack.com/v1/flights?access_key=7f2b5ebf7d5f5df5eca119f704e9140f&dep_iata=${formObj.dep_iata}&arr_iata=${formObj.arr_iata}&flight_status=scheduled`).then(r => r.json())
        setTicketData(response?.data)
        setLoading(false)
    }

    const buyTicket = (ticket) => {
        const result = confirm("Bilet satın alma işlemini onaylıyor musunuz?");
        if(result) {
            setMyTickets(prevMyTickets => [
                ...prevMyTickets,
                {
                    date: ticket.flight_date,
                    airline: ticket.airline.name,
                    departure: ticket.departure.airport,
                    departure_time: ticket.departure.scheduled,
                    arrival: ticket.arrival?.airport,
                    arrival_time: ticket.arrival.scheduled,
                    price: '2300 ₺'
                }
                ]);
            alert('Bilet satın alma işlemi başarılı.')
        }
        else {
            alert('Bilet satın alma işlemi iptal edildi.')
        }
        
    };

    return (
        <>
            <form onSubmit={searchTicket} className="search-ticket">
                <div>
                    <p><i className="fa-solid fa-plane-departure"></i> Nereden</p>
                    <input type="text" name="dep_iata" placeholder="Kalkış Havaalanı Kodu"/>
                </div>
                <div>
                    <p><i className="fa-solid fa-plane-arrival"></i> Nereye</p>
                    <input type="text" name="arr_iata" placeholder="Varış Havaalanı Kodu"/>
                </div>
                <div>
                    <p><i className="fa-solid fa-calendar-days"></i> Tarih</p>
                    <select name="date" id="">
                        <option value="bugün">Bugün</option>
                        <option value="yarın">Yarın</option>
                    </select>
                </div>
                <button>Ara</button>
            </form>

            <div className="ticket-list">
                {
                    loading ?
                    <div className="loading-bg">
                        <p>Sonuçlar yükleniyor.</p>
                        <p>Bu biraz zaman alabilir...</p>
                        <div className="loading"></div>
                    </div>
                    :
                    <table>
                        <tr>
                            <th>Tarih</th>
                            <th>Havayolu</th>
                            <th>Kalkış</th>
                            <th>Varış</th>
                            <th>Fiyat</th>
                            <th>Satın Al</th>
                        </tr>
                        {
                            ticketData?.length < 1 && <p className="warning">Uçuş bulunamadı.</p>
                        }
                        
                        {
                            ticketData?.filter(x => x.flight_date === (filterDate === 'bugün' && formatDateForInput(localDate)))?.map(x => (
                                <tr>
                                    <td>
                                        <h6>{x.flight_date}</h6>
                                    </td>
                                    <td>
                                    <p>
                                        {x?.airline?.name 
                                        ? (x.airline.name.length > 14 
                                            ? x.airline.name.slice(0, 14) 
                                            : x.airline.name) 
                                        : "Unknown Airline"}
                                    </p>
                                        <h6>{x.flight.iata}</h6>
                                    </td>
                                    <td>
                                        <p>{x.departure.scheduled.split("T")[1].slice(0, 5)}</p>
                                        <h6>
                                            {x?.departure?.airport && x.departure.airport.length > 14 
                                            ? x.departure.airport.slice(0, 14) 
                                            : x.departure.airport}
                                        </h6>
                                    </td>
                                    <td>
                                        <p>{x.arrival.scheduled.split("T")[1].slice(0, 5)}</p>
                                        <h6>
                                            {x?.arrival?.airport && x.arrival.airport.length > 14 
                                            ? x.arrival.airport.slice(0, 14) 
                                            : x.arrival.airport}
                                        </h6>
                                    </td>
                                    <td>2300 ₺</td>
                                    <td><button onClick={() => buyTicket(x)}>Satın Al</button></td>
                                </tr>
                            ))
                        }
                        {
                            ticketData?.filter(x => x.flight_date === (filterDate === 'yarın' && formatDateForInput(tomorrow)))?.map(x => (
                                <tr>
                                    <td>
                                        <h6>{x.flight_date}</h6>
                                    </td>
                                    <td>
                                    <p>
                                        {x?.airline?.name 
                                        ? (x.airline.name.length > 14 
                                            ? x.airline.name.slice(0, 14) 
                                            : x.airline.name) 
                                        : "Unknown Airline"}
                                    </p>
                                        <h6>{x.flight.iata}</h6>
                                    </td>
                                    <td>
                                        <p>{x.departure.scheduled.split("T")[1].slice(0, 5)}</p>
                                        <h6>
                                            {x?.departure.iata}
                                        </h6>
                                    </td>
                                    <td>
                                        <p>{x.arrival.scheduled.split("T")[1].slice(0, 5)}</p>
                                        <h6>
                                            {x?.arrival.iata}
                                        </h6>
                                    </td>
                                    <td><h6>2300 ₺</h6></td>
                                    <td><button onClick={() => buyTicket(x)}>Satın Al</button></td>
                                </tr>
                            ))
                        }
                    </table>
                }
            </div>
        </>
    )
}