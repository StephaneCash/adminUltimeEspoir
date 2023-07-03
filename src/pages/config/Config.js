import React, { useState } from 'react';
import "./Config.css";
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import Accueil from './accueil/Accueil';

const Config = () => {

    const [selectItem, setSelectItem] = useState(0);

    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='toolbar'>
                            <ul>
                                <li onClick={() => setSelectItem(0)} className={selectItem === 0 ? "selected" : ""}>Accueil</li>
                                <li onClick={() => setSelectItem(1)} className={selectItem === 1 ? "selected" : ""}>Entreprendre</li>
                                <li onClick={() => setSelectItem(2)} className={selectItem === 2 ? "selected" : ""}>Cartes</li>
                                <li onClick={() => setSelectItem(3)} className={selectItem === 3 ? "selected" : ""}>Vidéos</li>
                                <li onClick={() => setSelectItem(4)} className={selectItem === 4 ? "selected" : ""}>Témoignages</li>
                                <li onClick={() => setSelectItem(5)} className={selectItem === 5 ? "selected" : ""}>Découvrir</li>
                                <li onClick={() => setSelectItem(6)} className={selectItem === 6 ? "selected" : ""}>Réseaux</li>
                            </ul>
                        </div>

                        <div className='dataMain'>
                            {
                                selectItem === 0 ?
                                    <Accueil />
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Config