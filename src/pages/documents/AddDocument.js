import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { newDocument, updateDocument } from '../../features/Documents';
import JoditEditor from 'jodit-react';

const AddDocument = () => {

    const editor = useRef(null);

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.documentsAdmin.loading);

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setNom(state && state.data && state.data.nom);
            setDescription(state && state.data && state.data.description);
        }
    }, [state]);

    const addDocumentHandle = (e) => {
        let formData = {}
        formData.nom = nom;
        formData.description = description;
        let form = {};
        form.data = formData;
        form.id = state && state.data && state.data.id;
        if (state) {
            dispatch(updateDocument(form))
        } else {
            dispatch(newDocument(formData));
        }
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
                        <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#1976d2", padding: "2rem 2rem 2rem 1rem" }}>
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
                                        state ? `Modification de ${state && state.data && state.data.nom}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>

                        <input
                            type="text"
                            className='form-control mb-2'
                            placeholder='Nom du document'
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />

                        <div className='col-sm-12 tableCategorie '>
                            <JoditEditor
                                ref={editor}
                                tabIndex={1}
                                value={description}
                                onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </div>

                        <div className='mainDiv'>
                            <button
                                onClick={addDocumentHandle}
                                className='btn btn-primary'
                                disabled={nom && description ? false : true}
                            >
                                {
                                    isLoading ? <Loader /> : state ? "Modifier" : "Ajouter"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddDocument