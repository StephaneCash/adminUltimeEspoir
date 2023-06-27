import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { baseUrlImage } from '../../bases/basesUrl';
import LoaderBlue from '../../components/loader/LoaderBlue';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FaBan, FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { dateParserFunction } from '../../utils';
import { deleteUser } from '../../features/Users';
import { ContextApp } from '../../context/AppContext';
import { toast } from 'react-toastify';

export default function ListUser(props) {
    let data = props.data;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);

    const { userConnected } = React.useContext(ContextApp)

    let dispatch = useDispatch();

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteUser(id));
            }
        }).catch((error) => {
            console.log(error);
        });
    };
    const handleCheckBox = (id) => {
        setShowBtnAddInf(!showBtnAddInf);
    };

    return (
        <TableContainer component={Paper}>
            <div style={{ background: '#0b6cc7d0', color: "#fff", border: "1px solid #ddd", padding: "1rem" }}>
                <span>Pages</span> / <span>Users {data && data.value && data.value.length > 0 ? `(${data.value.length})` :
                    `(0)`}</span>
                <br />
                <h6>Users</h6>
            </div>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <input
                                style={{ border: "2px solid silver", width: 20, height: 20 }}
                                className="form-check-input" type="checkbox" value=""
                                id="flexCheckDefault"
                            />
                        </TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Rôle</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Date ajout</TableCell>
                        <TableCell align="left">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {data && data.value && data.value.length > 0 ? data.value.filter(val => {
                        const nom = val && val.pseudo !== undefined && val.pseudo.toLowerCase();
                        return nom && nom.includes(valueSearch)
                    })
                        .map((row, i) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={60}>
                                    <input
                                        className="form-check-input" type="checkbox"
                                        value="" id="flexCheckDefault"
                                        onClick={() => handleCheckBox(row && row.id)}
                                        style={{ border: "2px solid silver", width: 20, height: 20 }}
                                    />
                                </TableCell>
                                <TableCell width={60}>{i + 1}</TableCell>
                                <TableCell width={300}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div>
                                            <Avatar alt={row.pseudo} sx={{ width: 40, height: 40 }} src={baseUrlImage + "/" + row.url} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: "600", }}>{row.pseudo}</div>
                                            <span style={{ color: "#1976d2 ", fontSize: '13px' }}>{userConnected && userConnected.id === row.id ? "(Vous)" : ""}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="left" width={500} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                    {
                                        row.email && row.email
                                    }
                                </TableCell>
                                <TableCell align="left" width={500} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                    {
                                        row.role === 0 ? "Admin simple" : row.role === 1 ? "Super Admin" : row.role === 3 ? "Compte Agent " : row.role === 2 && "Client"
                                    }
                                </TableCell>
                                <TableCell align="left" width={500} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                    {
                                        row.isActive === false ? <span
                                            style={{ background: 'red', borderRadius: "20px", padding: "4px", color: "#fff", fontSize: "12px" }}>Désactivé</span>
                                            : <span
                                                style={{ background: 'green', borderRadius: "20px", padding: "4px", color: "#fff", fontSize: "12px" }}
                                            >Activé</span>
                                    }
                                </TableCell>
                                <TableCell width={300}>
                                    {
                                        dateParserFunction(row.createdAt)
                                    }
                                </TableCell>
                                <TableCell align="left" width={130}>
                                    <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                        <FaInfo size={18} />
                                    </Link>
                                    <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                        <FaRegEdit size={18} />
                                    </Link>
                                    {
                                        userConnected && userConnected.id === row.id ?
                                            <FaBan size={18} style={{ cursor: 'pointer' }} onClick={() =>
                                                toast.error("Cette opération n'est pas prise en charge")
                                            } />
                                            :
                                            <FaRegTrashAlt size={18} style={{ cursor: 'pointer' }} onClick={() => deleteCategorie(row.id)} />
                                    }
                                </TableCell>
                            </TableRow>
                        )) :
                        data && data.value && data.value.length === 0 ?
                            <TableCell colSpan="8px"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Pas de données disponibles.
                            </TableCell> :

                            <TableRow
                            >
                                <TableCell
                                    align='center'
                                    colSpan="8px"
                                >
                                    <LoaderBlue />
                                </TableCell>
                            </TableRow>
                    }

                </TableBody>
            </Table>
        </TableContainer >
    );
}