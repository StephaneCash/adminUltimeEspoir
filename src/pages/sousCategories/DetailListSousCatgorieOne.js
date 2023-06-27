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
import { Link } from 'react-router-dom';
import DetailImage from './DetailImage';

export default function DetailListSousCatgorieOne(props) {

    let data = props.data;
    const [showModal, setShowModal] = React.useState(false);

    const showImage = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <TableContainer component={Paper} style={{ borderTop: "1px solid #ddd" }}>
            <div className='alert alert-secondary'>
                <h5>
                    Détail de <span style={{ fontWeight: "bold" }}>{data && data.nom + " "}</span>
                    de la catégorie <span style={{ fontWeight: "bold" }}>{data.categorie && data.categorie.nom}
                    </span>
                </h5>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Photo</TableCell>
                        <TableCell align="left">Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={data.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={200}>{data.nom}</TableCell>
                        <TableCell
                            align="left"
                            style={{  textAlign: "justify", fontWeight: "400", lineHeight: "1.6rem" }}>
                            {
                                data.description
                            }
                        </TableCell>
                        <TableCell align="left">
                            <Avatar
                                style={{ cursor: "pointer" }}
                                onClick={() => showImage(data)}
                                alt={data && data.nom.toUpperCase()}
                                src={baseUrlImage + "/" + data.url}
                                sx={{ width: 100, height: 100 }}
                            />
                            Cliquer pour agrandir
                        </TableCell>
                        <TableCell align="left" width={200}>
                            <button className='btnList'>
                                <Link to={{ pathname: "addListProduits" }} state={{ data: data }} style={{ color: "#111" }}>
                                    Ajouter des produits
                                </Link>
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <DetailImage
                show={showModal}
                data={data && data}
                closeModal={closeModal}
            />
        </TableContainer>
    );
}