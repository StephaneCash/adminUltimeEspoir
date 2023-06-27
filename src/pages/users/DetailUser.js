import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { dateParserFunction } from '../../utils';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { activeOrDesactiveUserStatus } from '../../features/Users';

const DetailUser = () => {

    const location = useLocation();
    const { state } = location;

    const dispatch = useDispatch()

    const activeOrDesactiveUser = (val) => {
        let data = {};
        data.id = val.id;
        data.isActive = !val.isActive
        dispatch(activeOrDesactiveUserStatus(data))
    }

    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='alert  alertInputSearch'>

                            <Link to="/users">
                                <div className='retour'>
                                    <FaArrowLeft />
                                    <span>Retour</span>
                                </div>
                            </Link>
                        </div>

                        <div className='col-sm-12 mt-3 tableCategorie'>
                            <div className='alert alert-secondary'>
                                Détail de {state && state.data && state.data.pseudo} membre depuis {dateParserFunction(state && state.data && state.data.createdAt)}
                            </div>

                            <div className='col-sm-12'>
                                <table className='table table-bordered table-striped'>
                                    <tbody>
                                        <tr>
                                            <td>Pseudo</td>
                                            <td>{state && state.data && state.data.pseudo}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{state && state.data && state.data.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{state && state.data && state.data.isActive === false ? <span style={{ background: "red", color: "#ddd", padding: "4px", borderRadius: "20px" }}>Désactivé</span>
                                                : <span style={{ background: "green", color: "#ddd", padding: "4px", borderRadius: "20px" }}>Activé</span>
                                            }</td>
                                        </tr>

                                        <tr>
                                            <td>Rôle</td>
                                            <td>
                                                {
                                                    state && state.data && state.data.role === 0 ? "Admin simple" : state && state.data && state.data.role === 1 ? "Super Admin" : "Client"
                                                }
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Décider  de {state && state.data && state.data.isActive === !false ? <span style={{ background: "red", color: "#ddd", padding: "4px", borderRadius: "20px" }}>Désactiver</span>
                                                : <span style={{ background: "green", color: "#ddd", padding: "4px", borderRadius: "20px" }}> Activer</span>
                                            }
                                            </td>
                                            <td>

                                                {
                                                    state && state.data && state.data.isActive === false ? <FiToggleLeft
                                                        size={30} style={{ marginLeft: "5px" }}
                                                        onClick={() => activeOrDesactiveUser(state && state.data)}
                                                    />
                                                        : <FiToggleRight
                                                            size={30}
                                                            style={{ marginLeft: "5px" }}
                                                            onClick={() => activeOrDesactiveUser(state && state.data)}
                                                        />
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailUser