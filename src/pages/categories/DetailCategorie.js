import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { baseUrlImage } from '../../bases/basesUrl';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import "./Categorie.css"
import DetailListCatgorie from './DetailListCatgorie';

const DetailCategorie = () => {

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
                            <Link to="/categories">
                                <div className='retour'>
                                    <FaArrowLeft />
                                    <span>Retour</span>
                                </div>
                            </Link>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <DetailListCatgorie
                                data={data}
                            />
                        </div>

                        <div className='col-sm-12 mt-3 tableCategorie'>
                            <div className='alert alert-secondary'>
                                <h5>Sous catégories</h5>
                            </div>

                            {
                                data && data.sousCategories && data.sousCategories.length > 0 ? <div className='grille'>
                                    {
                                        data.sousCategories.map(val => {
                                            return <div className='card'>
                                                <img src={baseUrlImage + '/' + val.url} alt={val.nom} />
                                                <div className='card-body'>
                                                    <p>{val.nom} {val.prenom} {val.pseudo}</p>
                                                    <p>
                                                        <Link
                                                            to={{ pathname: "/sous-categories/detail" }}
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
                                    Aucune sous catégorie trouvée.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCategorie