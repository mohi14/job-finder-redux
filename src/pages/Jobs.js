import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import JobHeader from '../components/JobHeader';
import { fetchJobs } from '../features/jobs/JobsSlice';

const Jobs = () => {
    const { jobs, isLoading, isError, error } = useSelector(state => state.jobs)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchJobs())
    }, [dispatch])

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
        content = jobs.map(job => <JobCard key={job.id} job={job}></JobCard>)
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