import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { baseUrlImage } from '../../bases/basesUrl';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';

const Detail = () => {

    const [data, setDtata] = useState('');

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setDtata(state.data)
        }
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
                        <div className='alert alertInputSearch'>
                            <Link to="/magazines">
                                <div className='retour'>
                                    <FaArrowLeft />
                                    <span>Retour</span>
                                </div>
                            </Link>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            Détail de {data && data.nom}

                            <table className='table table-striped mt-3'>
                                <tbody>
                                    <tr>
                                        <td>Nom</td>
                                        <td> {data && data.nom}</td>
                                    </tr>

                                    <tr>
                                        <td>Description</td>
                                        <td> {data && data.description}</td>
                                    </tr>

                                    <tr>
                                        <td>Présentation</td>
                                        <td> {data && data.presentation}</td>
                                    </tr>

                                    <tr>
                                        <td>Image</td>
                                        <td>
                                            <img src={data && baseUrlImage + "/" + data.image} style={{ width: "100px", height: "100px", borderRadius: "120px" }} alt="" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Document</td>
                                        <td>
                                            {
                                                data && data.urlDOc ?
                                                    <a className='btn btn-primary' href={data && baseUrlImage + "/" + data.urlDOc} download>
                                                        Télécharger
                                                    </a> : "Aucun à télécharger"
                                            }

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail