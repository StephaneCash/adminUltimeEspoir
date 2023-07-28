import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { addDoc } from '../../features/Magazines';

const AddDoc = (props) => {

    const show = props.show;
    let data = props.id;

    const isLoading = useSelector(state => state.magazines.loading);
    const dispatch = useDispatch();

    const [file, setFile] = useState('')

    const addDocHandle = () => {
        let formData = new FormData();
        formData.append('file', file);

        let form = {};
        form.form = formData;
        form.id = data && data.id;

        dispatch(addDoc(form))
    }

    return (
        <Modal show={show} className='modalImage'>
            <Modal.Header style={{ backgroundColor: '#ddd', color: '#111' }}>
                Magazine {data && data.nom && data.nom}
            </Modal.Header>
            <Modal.Body>
                <input type='file' className="form-control" onChange={(e) => setFile(e.target.files[0])} />
                <br />
                <button className='btn btn-primary' onClick={() => addDocHandle()} disabled={file ? false : true}>
                    {
                        isLoading ? <Loader /> : "Ajouter"
                    }

                </button>
            </Modal.Body>
            <Modal.Footer>
                <button style={{ border: "1px solid #ddd", padding: "5px", borderRadius: "4px" }} onClick={props.closeModal}>Fermer</button>
            </Modal.Footer>
        </Modal>
    )
}
export default AddDoc;