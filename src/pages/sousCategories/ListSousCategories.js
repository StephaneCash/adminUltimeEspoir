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
import { FaInfo, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deleteSousCategory } from '../../features/SousCategories';
import { dateParserFunction } from '../../utils';

export default function ListSousCategories(props) {
    let data = props.data;
    let valueSearch = props.valueSearch && props.valueSearch.toLowerCase();

    const [showBtnAddInf, setShowBtnAddInf] = React.useState(true);
    const [cunt, setCunt] = React.useState(5);
    const [categories, setCategories] = React.useState([]);

    let dispatch = useDispatch();

    React.useEffect(() => {
        setCategories(data && data.value && data.value)
    }, [data]);

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer cette sous-catégorie ?",
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteSousCategory(id));
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

    const [currentPage, setCurrentPage] = React.useState(1);
    const lastIndex = currentPage * cunt;
    const firstIndex = lastIndex - cunt;
    const records = categories && categories.length > 0 && categories.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(categories && categories.length > 0 && categories.length / cunt);
    const numbers = [...Array(categories && nbPage + 1).keys()].slice(1);

    return (
        <TableContainer component={Paper}>
            <div className='alert headTable' style={{
                background: '#ddd', color: "#000",
                border: "1px solid #ddd", padding: "1rem", display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <div>
                    <span>Pages</span> / <span>Médiathèque {data && data.value && data.value.length > 0 ? `(${data.value.length})` : `(0)`}</span>
                    <br />
                    <h6>Médias</h6>
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
                        <TableCell align="left">Catégorie</TableCell>
                        <TableCell align="left">Date création</TableCell>
                        <TableCell align="left">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {records ? records.length > 0 ? records.filter(val => {
                        const nom = val && val.nom !== undefined && val.nom.toLowerCase();
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
                                <TableCell width={40}>{i + 1}</TableCell>
                                <TableCell width={230}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div>
                                            <Avatar alt={row && row.nom} sx={{ width: 40, height: 40 }} src={baseUrlImage + "/" + row.url} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: "600", }}>{row.nom}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="left" width={400} style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.4rem" }}>
                                    {
                                        row.description.split(".") ? row.description.split(".")[0] + "..." : row.description
                                    }
                                </TableCell>
                                <TableCell align="left" width={150} style={{ color: "#0b6cc7d0" }}>
                                    {
                                        row && row.categorie && row.categorie.nom
                                    }
                                </TableCell>
                                <TableCell align="left" width={200}>
                                    {dateParserFunction(row.createdAt)}
                                </TableCell>
                                <TableCell align="left" width={130}>
                                    <Link to={{ pathname: "detail" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                        <FaInfo size={18} />
                                    </Link>
                                    <Link to={{ pathname: "add" }} state={{ data: row }} style={{ color: "#111" }} className="me-1">
                                        <FaRegEdit size={18} />
                                    </Link>
                                    <FaRegTrashAlt size={18} style={{ cursor: 'pointer' }} onClick={() => deleteCategorie(row.id)} />
                                </TableCell>
                            </TableRow>
                        )) :
                        data && data.value && data.value.length === 0 ?
                            <TableCell colSpan="6px"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Pas de données disponibles.
                            </TableCell> :
                            <TableRow>
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