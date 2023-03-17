import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { fetchJobs } from '../features/jobs/JobsSlice';

const Sidebar = () => {
    const dispatch = useDispatch()

    const match = useMatch("/")
    const navigate = useNavigate()

    const [sort, setSort] = useState("")

    const handleSorting = (sort) => {
        setSort("")

        if (!match) {
            navigate("/")
        }
    }


    useEffect(() => {
        dispatch(fetchJobs(sort))
    }, [dispatch, sort])
    return (
        <div className="sidebar">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <a href="#" className="main-menu menu-active" id="lws-alljobs-menu" onClick={handleSorting}>
                            <i className="fa-solid fa-briefcase mr-2"></i>
                            <span> All Available Jobs</span>
                        </a>
                        <ul className="space-y-6 lg:space-y-2 ">
                            <li>
                                <a className="sub-menu" href="#" id="lws-internship-menu" onClick={() => setSort("Internship")}>
                                    <i className="fa-solid fa-stop !text-[#FF5757] mr-2"></i>
                                    Internship
                                </a>
                            </li>
                            <li>
                                <a className="sub-menu" href="#" id="lws-fulltime-menu" onClick={() => setSort("Full Time")}>
                                    <i className="fa-solid fa-stop !text-[#FF8A00] mr-2"></i>
                                    Full Time
                                </a>
                            </li>
                            <li>
                                <a className="sub-menu" href="#" id="lws-remote-menu" onClick={() => setSort("Remote")}>
                                    <i className="fa-solid fa-stop !text-[#56E5C4] mr-2"></i>
                                    Remote
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="addJob" className="main-menu" id="lws-addJob-menu">
                            <i className="fa-solid fa-file-circle-plus mr-2"></i>
                            <span>Add NewJob</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;