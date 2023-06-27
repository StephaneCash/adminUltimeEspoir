import * as React from 'react';
import { baseUrlImage } from '../../bases/basesUrl';
import LoaderBlue from '../../components/loader/LoaderBlue';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deleteClassification } from '../../features/Classifications';
import { dateParserFunction } from '../../utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Classifications.css"
import { Avatar } from '@mui/material';

export default function ListClassification(props) {
    let data = props.data && props.data.value;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);

    const [cunt, setCunt] = React.useState(5);

    const [currentPage, setCurrentPage] = React.useState(1);
    const lastIndex = currentPage * cunt;
    const firstIndex = lastIndex - cunt;
    const records = data && data.length > 0 && data.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(data && data.length > 0 && data.length / cunt);
    const numbers = [...Array(data && nbPage + 1).keys()].slice(1);

    let dispatch = useDispatch();

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer cette classification ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteClassification(id));
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleCheckBox = (id) => {
        setShowBtnAddInf(!showBtnAddInf);
        console.log(id)
    };

    React.useEffect(() => {
        setShowBtnAddInf(false);
    }, []);

    return (
        <TableContainer component={Paper}
            style={{

            }}
        >
            <div className='alert alert-primary headTable' style={{
                background: '#ddd', color: "#000",
                border: "1px solid #ddd", padding: "1rem", display: "flex",
                justifyContent: "space-between", alignItems: "center", borderRadius: "5px"
            }}>
                <div>
                    <span>Pages</span> / <span>Actualités {data && data.length > 0 ? `(${data.length})` : `(0)`}</span>
                    <br />
                    <h6>Actualités</h6>
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

                    {
                        data ? data.length > 0 ? records.filter(val => {
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
                                                onClick={() => handleCheckBox(row && row.id)}
                                                style={{ border: "2px solid silver", width: 20, height: 20 }}
                                            />
                                        </TableCell>
                                        <TableCell width={20}>{i + 1}</TableCell>
                                        <TableCell width={220}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <div>
                                                    <Avatar alt={row && row.nom} sx={{ width: 40, height: 40 }} src={baseUrlImage + "/" + row.url} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: "600", }}>{row.nom}</div>
                                                </div>
                                            </div>
                                            
                                        </TableCell>
                                        <TableCell align="left" width={500} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                            {
                                                row.description.split(".") ? row.description.split(".")[0] + "..." : row.description
                                            }
                                        </TableCell>
                                        <TableCell align="left" width={240}>
                                            {dateParserFunction(row.createdAt)}
                                        </TableCell>
                                        <TableCell align="left" width={150}>
                                            <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                                <FaInfo size={18} />
                                            </Link>
                                            <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                                <FaRegEdit size={18} />
                                            </Link>
                                            <FaRegTrashAlt size={18} style={{ cursor: 'pointer' }} onClick={() => deleteCategorie(row.id)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            ) :
                            data && data.value && data.value.length === 0 ?
                                <TableCell colSpan="6px"
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
                                        colSpan="7px"
                                    >
                                        <LoaderBlue />
                                    </TableCell>
                                </TableRow> :
                            <TableRow
                            >
                                <TableCell
                                    align='center'
                                    colSpan="7px"
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
