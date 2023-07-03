import React from 'react'
import "./Accueil.css"
import { Link } from 'react-router-dom'

const Accueil = () => {
    return (
        <div className='configAccueil'>
            <h5>Accueil Site</h5>
            <div className='mainAcceuilSite'>
                <div className='btnsAccueil'>
                    <button className='btn btn-primary'>
                        <Link to={{
                            pathname: "/documents/add"
                        }}
                        >
                            Ajouter du text
                        </Link>
                    </button>
                    <button className='btn btn-primary'>Ajouter des images</button>
                </div>
            </div>
        </div>
    )
}

export default Accueil