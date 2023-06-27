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
import DetailImage from '../categories/DetailImage';

export default function DetailListClassification(props) {

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
                <h5>Détail de {data && data.nom}</h5>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="center">Photo</TableCell>
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
                            style={{ textAlign: "justify", fontWeight: "400", lineHeight: "1.6rem" }}>
                            {
                                data.description
                            }
                        </TableCell>
                        <TableCell align="center">
                            <div style={{
                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", textAlign:"center"
                            }}>
                                <Avatar
                                    style={{ cursor: "pointer" }}
                                    onClick={() => showImage(data)}
                                    alt={data && data.nom.toUpperCase()}
                                    src={baseUrlImage + "/" + data.url}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <span>Cliquer sur l'image pour <br/> l'agrandir</span>
                            </div>
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