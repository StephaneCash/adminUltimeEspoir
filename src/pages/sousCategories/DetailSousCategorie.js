import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { baseUrlImage } from '../../bases/basesUrl';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import DetailListSousCatgorieOne from './DetailListSousCatgorieOne';

const DetailSousCategorie = () => {

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
                            <Link to="/sous-categories">
                                <div className='retour'>
                                    <FaArrowLeft />
                                    <span>Retour</span>
                                </div>
                            </Link>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <DetailListSousCatgorieOne
                                data={data}
                            />
                        </div>

                        <div className='col-sm-12 mt-3 tableCategorie'>
                            <div className='alert alert-secondary'>
                                <h5>Produits</h5>
                            </div>

                            {
                                data && data.produits && data.produits.length > 0 ? <div className='grille'>
                                    {
                                        data.produits.map(val => {
                                            return <div className='card'>
                                                <img src={baseUrlImage + '/' + val.url} alt={val.nom} />
                                                <div className='card-body'>
                                                    <p>{val.nom} {val.prenom} {val.pseudo}</p>
                                                    <p>
                                                        <Link
                                                            to={{ pathname: "/produits/detail" }}
                                                            state={{ data: val }}
                                                            className='btn btn-outline'
                                                            style={{ color: "#555", border: "1px solid #ddd" }}
                                                        >
                                                            Voir plus
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div> : <div className='text-center'>
                                    Aucun produit trouvé.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailSousCategorie