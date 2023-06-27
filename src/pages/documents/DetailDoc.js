import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';

const DetailDoc = () => {

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        let desc = state && state.data && state.data.description
        let content = document.getElementById("content");
        content.innerHTML = desc;
    }, [state]);

    return (
        <>
            <Navbar />

            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='alert alertInputSearch ' style={{ border: "1px solid #ddd", background: "#1976d2", padding: "2rem 2rem 2rem 1rem" }}>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#1976d2"
                            }}>
                                <Link to="/documents"
                                    style={{
                                        fontSize: "16px", color: "#1976d2",
                                        display: "flex", alignItems: "center", gap: "5px",
                                    }}
                                >
                                    <FaArrowLeft />Documents
                                </Link>
                                <span style={{ fontSize: "15px", color: "#1976d2", }}>/</span>
                                <span style={{ fontSize: "17px" }}>
                                    {
                                        state && state.val ?
                                            <span>Détail de {state && state.data && state.data.nom}</span> :
                                            state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>

                        <div className='mt-2 mainDataDesc'>
                            <h1>Détail du document {state && state.data && state.data.nom}</h1>
                            <div id="content"></div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default DetailDoc