import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { baseUrlImage } from '../../bases/basesUrl';
import { newClassification, updateClassification } from '../../features/Classifications';

const AddClassification = () => {

    const [nom, setNom] = useState('');
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.classifications);

    const location = useLocation();
    const { state } = location;

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]))
    };

    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setImage(state && state.data && state.data.url);
            setDescription(state && state.data && state.data.description);
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        formData.append('description', description);

        dispatch(newClassification(formData));
    };

    const updCategorie = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        formData.append('description', description);

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateClassification(data));
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
                        <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#fff" }}>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#0b6cc7d0",
                            }}>
                                <Link to="/actualites"
                                    style={{
                                        fontSize: "16px", color: "#0b6cc7d0",
                                        display: "flex", alignItems: "center", gap: "5px",
                                    }}
                                >
                                    <FaArrowLeft /> Actualités
                                </Link>
                                <span style={{ fontSize: "16px", color: "#0b6cc7d0", }}>/</span>
                                <span style={{ fontSize: "14px" }}>
                                    {
                                        state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleFormControlInput1">Entrer un nom</label>
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
                                                <label htmlFor="exampleFormControlFile1">Choisir une photo</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="exampleFormControlFile1"
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
                                            rows={6}></textarea>
                                    </div>

                                </div>
                                <div  className={file ? "col-sm-6 imageCard" : image ? "col-sm-6 imageCard" : "col-sm-6"}>
                                    <h5>Image</h5>
                                    <div  className='card mt-2' style={{ border: image ? "1px solid #ddd" : "1px solid #ddd" }}>
                                        {
                                            file ?
                                                <img src={file} alt="" className='img-thumbnail' /> :
                                                image ?
                                                    <img
                                                        src={image ? baseUrlImage + "/" + image : ""}
                                                        className='img-thumbnail'
                                                        alt="catégorie"
                                                    />
                                                    : <div
                                                        className='noneImage'
                                                    >
                                                        <FaCloudUploadAlt size={100} />
                                                        <label htmlFor='exampleFormControlFile1'>Veuillez choisir une image</label>
                                                    </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                className='btn btn-primary'
                                onClick={!state ? addCategorie : updCategorie}
                                disabled={nom && description ? false : true}
                            >
                                {
                                    isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                                }

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClassification