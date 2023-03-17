import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import JobHeader from '../components/JobHeader';


const Jobs = () => {
    const { jobs, isLoading, isError, error, searchText, salarySort } = useSelector(state => state.jobs)

    const handleSearch = (job) => {
        if (searchText) {
            return job.title.toLowerCase().includes(searchText.toLowerCase())
        }
        else {
            return true
        }
    }

    const handleSalary = (a, b) => {
        if (salarySort === "low") {
            return a.salary - b.salary
        }
        if (salarySort === "high") {
            return b.salary - a.salary
        }
        else {
            return true
        }
    }


    let content = null;

    if (isLoading) {
        content = <div>Loading....</div>
    }
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }

    if (!isLoading && !isError && jobs?.length === 0) {
        content = <div className="col-span-12">No jobs found!</div>
    }

    if (!isError && !isLoading && jobs?.length > 0) {
        content = jobs.filter(handleSearch).sort(handleSalary).map(job => <JobCard key={job.id} job={job}></JobCard>)
    }
    return (
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">
            <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
                <JobHeader></JobHeader>
                <div className="jobs-list">
                    {content}
                </div>
            </main>

        </div>
    );
};

export default Jobs;