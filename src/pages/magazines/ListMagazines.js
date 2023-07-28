import * as React from 'react';
import LoaderBlue from '../../components/loader/LoaderBlue';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { dateParserFunction } from '../../utils';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { deleteMagazine } from '../../features/Magazines';
import { Avatar } from '@mui/material';
import { baseUrlImage } from '../../bases/basesUrl';
import AddDoc from './AddDoc';
import { GoFile } from 'react-icons/go';

export default function ListMagazines(props) {
    let data = props.data;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);
    const [cunt, setCunt] = React.useState(5);

    const [magazines, setmagazines] = React.useState([]);
    const [shwoModal, setShowModal] = React.useState(false);
    const [id, setId] = React.useState("");

    let dispatch = useDispatch();

    React.useEffect(() => {
        setmagazines(data && data)
    }, [data]);

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer ce magazine ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteMagazine(id));
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleCheckBox = (val) => {
        setShowBtnAddInf(!showBtnAddInf);
        setShowModal(true);
        setId(val);
    };

    const closeModalFunction = () => {
        setShowModal(false)
    }

    React.useEffect(() => {
        setShowBtnAddInf(false);
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);

    const lastIndex = currentPage * cunt;
    const firstIndex = lastIndex - cunt;
    const records = magazines && magazines.length > 0 && magazines.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(magazines && magazines.length > 0 && magazines.length / cunt);
    const numbers = [...Array(magazines && nbPage + 1).keys()].slice(1);

    return (
        <TableContainer component={Paper}>

            <div className='alert alert-primary headTable' style={{
                background: '#0b6cc7d0', color: "#fff",
                border: "1px solid #ddd", padding: "1rem", display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <div>
                    <span>Pages</span> / <span>Magazines {data && data.length > 0 ? `(${data.length})` : `(0)`}</span>
                    <br />
                    <h6>Magazines</h6>
                </div>
                <div>
                    <label>Choisir le nombre d'items à afficher</label>
                    <select onChange={(e) => setCunt(e.target.value)} className='form-control'>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
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
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Date création</TableCell>
                        <TableCell align="left">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {records ? records.length > 0 ? records.filter(val => {
                        const nom = val && val.nom !== undefined && val.nom.toLowerCase();
                        return nom && nom.includes(valueSearch)
                    })
                        .map((row, i) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width={60}>
                                        <input
                                            className="form-check-input" type="checkbox"
                                            value="" id="flexCheckDefault"
                                            style={{ border: "2px solid silver", width: 20, height: 20 }}
                                        />
                                    </TableCell>
                                    <TableCell width={40}>{i + 1}</TableCell>
                                    <TableCell width={220} >
                                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                                            <Avatar alt={row && row.nom} sx={{ width: 40, height: 40 }} src={baseUrlImage + "/" + row.image} />
                                            <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                                                <span>{row.nom}</span>
                                                <span style={{ color: "#df652d" }}>{row && row.categorie && row.categorie.nom}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left" width={500} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                        {
                                            row.description.split(".") ? row.description.split(".")[0] + "..." : row.description
                                        }
                                    </TableCell>
                                    <TableCell align="left" width={300}>
                                        {dateParserFunction(row.createdAt)}
                                    </TableCell>
                                    <TableCell align="left" width={130}>
                                        <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                            <FaInfo size={18} />
                                        </Link>
                                        <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                            <FaRegEdit size={18} />
                                        </Link>
                                        <FaRegTrashAlt size={18} style={{ cursor: 'pointer' }} onClick={() => deleteCategorie(row.id)} className="me-1" />
                                        <GoFile onClick={() => handleCheckBox(row)} size={18} style={{ cursor: 'pointer' }} />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        ) :
                        data && data.value && data.value.length === 0 ?
                            <TableCell colSpan="8px"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Pas de données disponibles.
                            </TableCell> :
                            <TableRow>
                                <TableCell
                                    align='center'
                                    colSpan="8px"
                                >
                                    <LoaderBlue />
                                </TableCell>
                            </TableRow>
                        : <TableRow>
                            <TableCell
                                align='center'
                                colSpan="8px"
                            >
                                Pas de données disponibles
                            </TableCell>
                        </TableRow>
                    }

                </TableBody>
            </Table>

            {
                <nav className='paginationNav'>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <Link to="#" className='page-link'
                                onClick={prePage}
                            >Retour</Link>
                        </li>
                        {
                            numbers && numbers.map((n, i) => {
                                return (
                                    <li key={i} className={`page-item ${currentPage === n} ? 'active' : ''`}>
                                        <Link to="#" className='page-link'
                                            onClick={() => changePage(n)}
                                        >{n}</Link>
                                    </li>
                                )
                            })
                        }
                        <li className='page-item'>
                            <Link to="#" className='page-link'
                                onClick={nextPage}
                            >Suivant</Link>
                        </li>
                    </ul>

                    <AddDoc show={shwoModal} id={id} closeModal={closeModalFunction} />
                </nav>
            }

        </TableContainer>
    );

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function changePage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage !== nbPage) {
            setCurrentPage(currentPage + 1)
        }
    }
}