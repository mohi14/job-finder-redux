import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            <div class="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
                <Sidebar></Sidebar>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Main;