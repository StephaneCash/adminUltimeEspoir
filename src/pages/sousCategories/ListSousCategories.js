import * as React from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { deleteSousCategory } from '../../features/SousCategories';
import { baseUrlImage } from '../../bases/basesUrl';
import { toast } from 'react-toastify';

export default function ListSousCategories(props) {
    let data = props.data;

    let dispatch = useDispatch();

    const deleteCategorie = (id) => {
        swal({
            text: "Etes-vous sûr de vouloir supprimer cette cette image ?",
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

    const copyElement = async (val) => {
        const value = baseUrlImage + "/" + val;
        navigator.clipboard.writeText(value)
        toast.success("L'url copié avec succès")
    }

    return (
        <div>
            <div className='alert headTable' style={{
                background: '#ddd', color: "#000",
                border: "1px solid #ddd", padding: "1rem", display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <div>
                    <span>Pages</span> / <span>Médiathèque {data && data && data.length > 0 ? `(${data.length})` : `(0)`}</span>
                    <br />
                    <h6>Médias</h6>
                </div>
            </div>

            <div className='images'>
                <div className='grilleImages'>
                    {
                        data && data.length > 0 ?
                            data.map(val => {
                                return <div className='card'>
                                    <div className='card-header'>{val && val.nom}</div>
                                    <div className='card-body'>
                                        <img src={val && baseUrlImage + "/" + val.url} alt="" />
                                    </div>
                                    <div className='card-footer' onClick={() => copyElement(val.url)}>
                                        <button className='btn btn-success'>Copier l'url</button>
                                    </div>
                                </div>
                            })
                            : "Chargement"
                    }
                </div>
            </div>
        </div>
    );
}