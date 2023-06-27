import React from 'react'
import { Modal } from "react-bootstrap";
import { baseUrlImage } from '../../bases/basesUrl';

const DetailImage = (props) => {

    const show = props.show;
    let data = props.data;

    return (
        <Modal show={show} className='modalImage' style={{ marginTop: "50px" }}>
            <Modal.Header style={{ backgroundColor: '#ddd', color: '#111' }}>
                Image {data && data.nom && data.nom}
            </Modal.Header>
            <Modal.Body>
                <img src={`${baseUrlImage}/${data.url}`} alt={data.nom} style={{ width: "100%" }} />
            </Modal.Body>
            <Modal.Footer>
                <button style={{ border: "1px solid #ddd", padding: "5px", borderRadius: "4px" }} onClick={props.closeModal}>Fermer</button>
            </Modal.Footer>
        </Modal>
    )
}
export default DetailImage;