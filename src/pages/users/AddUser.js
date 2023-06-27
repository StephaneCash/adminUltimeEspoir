import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { newUser, updateUser } from '../../features/Users';

const AddUser = () => {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.users);

    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            setPseudo(state && state.data && state.data.pseudo);
            setEmail(state && state.data && state.data.email);
            setRole(state && state.data && state.data.role);
        }
    }, [state]);

    const addCategorie = (e) => {
        let formData = new FormData();
        formData.append('pseudo', pseudo);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', parseInt(role));

        if (password === confirmPass) {
            dispatch(newUser(formData));
        } else {
            toast.error("Les mots de passent ne correspondent pas")
        }
    };

    const updCategorie = (e) => {
        let formData = new FormData();
        formData.append('pseudo', pseudo);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', parseInt(role));

        let data = {}
        data.form = formData;
        data.id = state && state.data && state.data.id;

        dispatch(updateUser(data));
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
                        <div className='alert alertInputSearch' style={{ border: "1px solid #ddd", background: "#1976d2" }}>
                            <h4 style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                color: "#1976d2"
                            }}>
                                <Link to="/users"
                                    style={{
                                        fontSize: "16px", color: "#1976d2",
                                        display: "flex", alignItems: "center", gap: "5px",
                                    }}
                                >
                                    <FaArrowLeft /> Utilisateurs
                                </Link>
                                <span style={{ fontSize: "15px", color: "#1976d2", }}>/</span>
                                <span style={{ fontSize: "17px" }}>
                                    {
                                        state ? `Modification de ${state && state.data && state.data.pseudo}` : "Ajout"
                                    }
                                </span>
                            </h4>
                        </div>

                        <div className='col-sm-12 tableCategorie'>
                            <div className='col-sm-6'>
                                <div className='col-sm-12'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlInput1">Entrer un nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Entrer un nom"
                                            value={pseudo}
                                            onChange={(e) => setPseudo(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlFile1">Entrer une adresse email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleFormControlFile1"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            placeholder='Votre adresse email'
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlFile1">Créér un mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleFormControlFile1"
                                            placeholder='Créér un mot de passe'
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-sm-12'>
                                    <div className="form-group mb-3">
                                        <label htmlFor="exampleFormControlFile1">Répéter le mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleFormControlFile1"
                                            placeholder='Créér un mot de passe'
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <select className='form-control mb-3' onChange={(e) => setRole(e.target.value)}>
                                    <option value="">--Veuillez choisir un rôle--</option>
                                    <option value={0}>Admin simple</option>
                                    <option value={2}>Client</option>
                                    <option value={1}>Super Admin</option>
                                    <option value={3}>Compte Agent</option>
                                </select>
                            </div>
                            <div className='col-sm-6 '>
                                <button
                                    className='btn btn-primary'
                                    onClick={!state ? addCategorie : updCategorie}
                                    disabled={pseudo && email ? false : true}
                                >
                                    {
                                        isLoading && isLoading.loading ? <Loader /> : state ? "Modifier" : "Ajouter"
                                    }

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser