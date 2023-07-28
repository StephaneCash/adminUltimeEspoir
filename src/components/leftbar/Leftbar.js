import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Leftbar.css";
import {  FaCogs, FaGraduationCap, FaHospital, FaInfo, FaList, FaRegListAlt, FaTasks } from "react-icons/fa"
import { FiBarChart, FiImage, FiMenu } from 'react-icons/fi';
import { GoComment, GoTextSize } from "react-icons/go"
import { GrUserAdmin } from "react-icons/gr";

const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className='menu-item'>
                <NavLink to="/dashboard">
                    <div className='item'>
                        <FiBarChart />
                        <span>Dashboard</span>
                    </div>
                </NavLink>

                <NavLink to="/categories">
                    <div className='item'>
                        <FaRegListAlt />
                        <span>Catégorie Navbar</span>
                    </div>
                </NavLink>

                <NavLink to="/categoriesActus">
                    <div className='item'>
                        <FiMenu />
                        <span>Catégorie actualités</span>
                    </div>
                </NavLink>

                <NavLink to="/categories-magazines">
                    <div className='item'>
                        <FaList />
                        <span>Catégorie magazine</span>
                    </div>
                </NavLink>

                <NavLink to="/actualites">
                    <div className='item'>
                        <FaTasks />
                        <span>Actualités</span>
                    </div>
                </NavLink>

                <NavLink to="/ecole">
                    <div className='item'>
                        <FaGraduationCap />
                        <span>Ecole</span>
                    </div>
                </NavLink>

                <NavLink to="/hopital">
                    <div className='item'>
                        <FaHospital />
                        <span>Hôpital</span>
                    </div>
                </NavLink>

                <NavLink to="/magazines">
                    <div className='item'>
                        <FaInfo />
                        <span>Magazines</span>
                    </div>
                </NavLink>

                
                <NavLink to="/publications">
                    <div className='item'>
                        <GoComment />
                        <span>Publications</span>
                    </div>
                </NavLink>

                <NavLink to="/medias">
                    <div className='item'>
                        <FiImage />
                        <span>Médiathèque</span>
                    </div>
                </NavLink>

                <NavLink to="/documents">
                    <div className='item'>
                        <GoTextSize />
                        <span>Documents Texts</span>
                    </div>
                </NavLink>
                <NavLink to="/users">
                    <div className='item'>
                        <GrUserAdmin />
                        <span>Utilisateurs</span>
                    </div>
                </NavLink>
                <NavLink to="/config">
                    <div className='item'>
                        <FaCogs />
                        <span>Configuration</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Leftbar