import { createContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export const DataContext = createContext();

export default function App() {

    const [myTickets, setMyTickets] = useState([]);

  return (
        <div className="full-page">
            
            <header className="header">

                <div className="container">

                    <Link className="logo">
                        <img src="./images/logo.png" alt="" />
                        <h3>Bilet <br /> Fırsatı.com</h3>
                    </Link>

                    <div>
                        <NavLink to={'/'}>Anasayfa</NavLink>
                        <NavLink to={'ucuslarim'}>Uçuşlarım</NavLink>
                        <p>&nbsp;</p>
                        <div className="user">
                            <img src="https://randomuser.me/api/portraits/men/40.jpg" alt="" />
                            <p>Yasir Alakuş</p>
                        </div>
                    </div>

                </div>

            </header>

            <main className="main">

                <div className="container">

                    <div className="content-area">

                        <DataContext.Provider value={{myTickets, setMyTickets}}>

                        <Outlet />

                        </DataContext.Provider>

                    </div>

                    <div className="ad-area">

                        <Link><img src="./images/ad/ad1.jpg" alt="" /></Link>
                        <Link><img src="./images/ad/ad2.jpg" alt="" /></Link>
                        <Link><img src="./images/ad/ad3.jpg" alt="" /></Link>
                        <Link><img src="./images/ad/ad4.jpg" alt="" /></Link>
                        
                    </div>

                </div>

            </main>

        </div>
  );
}
