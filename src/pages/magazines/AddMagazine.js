import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { newMagazine, updateMagazine } from '../../features/Magazines';

const AddMagazine = () => {

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [nom, setNom] = useState('');
    const [categorieMagazineId, setCategorieMagazineId] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.magazines);

    const categoriesMagazines = useSelector(state => state.categoriesMagazines.value);

    const location = useLocation();
    const { state } = location;
    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setDescription(state && state.data && state.data.description);
            setCategorieMagazineId(state && state.data && state.data.categorieMagazineId)
            setImage(state && state.data && state.data.image)
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('categorieMagazineId', categorieMagazineId);

        dispatch(newMagazine(formData));
    };

    const updCategorie = (e) => {
        let formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('categorieMagazineId', categorieMagazineId);

        let data = {};
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateMagazine(data));
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
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
                                    <Link to="/magazines"
                                        style={{
                                            fontSize: "16px", color: "#0b6cc7d0",
                                            display: "flex", alignItems: "center", gap: "5px",
                                        }}
                                    >
                                        <FaArrowLeft /> Magazines
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
                                        <label htmlFor="exampleFormControlInput1">Choisir une photo de couverture</label>
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

                            <div className='mb-2'>
                                <select className='form-control' onChange={(e) => setCategorieMagazineId(e.target.value)}>
                                    <option>Choisir...</option>
                                    {
                                        categoriesMagazines && categoriesMagazines.length > 0 && categoriesMagazines.map(value => {
                                            return <option value={value.id} key={value.id}>{value.nom}</option>
                                        })
                                    }
                                </select>
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
        </>
    )
}

export default AddMagazine