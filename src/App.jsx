import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function App() {

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await fetch(
    //         "https://cors.bridged.cc/https://api.schiphol.nl/public-flights/destinations/SPC",
    //         {
    //           headers: {
    //             "Accept": "application/json",
    //             "ResourceVersion": "v4",
    //             "app_id": "b926634a",
    //             "app_key": "82212705f6f10e1746073a645dc7bb57"
    //           }
    //         }
    //       );
      
    //       const data = await response.json();
    //       console.log(data);
    //     };
      
    //     fetchData();
    //   }, []);

  return (
        <div className="full-page">
            
            <header className="header">

                <div className="container">

                    <Link className="logo">
                        <img src="./images/logo.png" alt="" />
                        <h3>Schiphol</h3>
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

        </div>
  );
}
