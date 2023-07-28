import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { newPub, updatePub } from '../../features/Publications';

const AddPub = () => {

    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [nom, setNom] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.publications);

    const location = useLocation();
    const { state } = location;
    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setDescription(state && state.data && state.data.description);
            setUrl(state && state.data && state.data.url)
        }
    }, [state]);

    const addPub = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', url);
        formData.append('description', description);

        dispatch(newPub(formData));
    };

    const updatePublication = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', url);
        formData.append('description', description);

        let data = {};
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updatePub(data));
    };

    const handleImage = (e) => {
        setUrl(e.target.files[0]);
    };

    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='col-sm-12'>
                            <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#fff" }}>
                                <h4 style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    color: "#0b6cc7d0"
                                }}>
                                    <Link to="/publications"
                                        style={{
                                            fontSize: "16px", color: "#0b6cc7d0",
                                            display: "flex", alignItems: "center", gap: "5px",
                                        }}
                                    >
                                        <FaArrowLeft /> Publications
                                    </Link>
                                    <span style={{ fontSize: "15px", color: "#0b6cc7d0", }}>/</span>
                                    <span style={{ fontSize: "17px" }}>
                                        {
                                            state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                        }
                                    </span>
                                </h4>
                            </div>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlInput1">Entrer un titre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Entrer un nom"
                                            value={nom}
                                            onChange={(e) => setNom(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-6'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlInput1">Choisir un fichier PDF</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Entrer un nom"
                                            onChange={handleImage}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    rows="4"></textarea>
                            </div>


                        </div>
                        <button
                            className='btn btn-primary'
                            style={{
                                width: "30%",
                                marginTop: "10px"
                            }}
                            onClick={!state ? addPub : updatePublication}
                            disabled={nom && description ? false : true}
                        >
                            {
                                isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                            }

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPub