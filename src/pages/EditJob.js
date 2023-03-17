import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeJob } from '../features/jobs/JobsSlice';

const EditJob = () => {
    const { editing } = useSelector(state => state.jobs)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const options = ["Software Engineer", "Software Developer", "Full Stack Developer", "MERN Stack Developer", "DevOps Engineer", "QA Engineer", "Product Manager", "Social Media Manager", "Senior Executive", "Junior Executive", "Android App Developer", "IOS App Developer", "Frontend Developer", "Frontend Engineer"]

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;

        const title = form.lwsJobTitle.value;
        const type = form.lwsJobType.value;
        const salary = form.lwsJobSalary.value;
        const deadline = form.lwsJobDeadline.value;

        // const data = {
        //     title,
        //     type,
        //     salary,
        //     deadline
        // }

        dispatch(changeJob({
            id: editing?.id,
            data: {
                title: title,
                type: type,
                salary: salary,
                deadline: deadline
            }
        }))
        // form.reset()
        navigate("/")
    }


    return (
        <div class="lg:pl-[14rem] mt-[5.8125rem]">
            <main class="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
                <h1 class="mb-10 text-center lws-section-title">Edit Job</h1>

                <div class="max-w-3xl mx-auto">
                    <form class="space-y-6" onSubmit={handleSubmit}>
                        <div class="fieldContainer">
                            <label for="lws-JobTitle" class="text-sm font-medium text-slate-300">Job Title</label>
                            <select id="lws-JobTitle" name="lwsJobTitle" required>
                                <option hidden >Select Job</option>
                                {options.map(option => <option selected={option === editing.title}>{option}</option>)}


                            </select>
                        </div>

                        <div class="fieldContainer">
                            <label for="lws-JobType">Job Type</label>
                            <select id="lws-JobType" name="lwsJobType" required>
                                <option hidden >Select Job Type</option>
                                <option selected={editing.type === "Full Time"}>Full Time</option>
                                <option selected={editing.type === "Internship"}>Internship</option>
                                <option selected={editing.type === "Remote"}>Remote</option>
                            </select>
                        </div>

                        <div class="fieldContainer">
                            <label for="lws-JobSalary">Salary</label>
                            <div class="flex border rounded-md shadow-sm border-slate-600">
                                <span class="input-tag">BDT</span>
                                <input type="number" name="lwsJobSalary" id="lws-JobSalary" required class="!rounded-l-none !border-0"
                                    placeholder="20,00,000" Value={editing.salary} />
                            </div>
                        </div>

                        <div class="fieldContainer">
                            <label for="lws-JobDeadline">Deadline</label>
                            <input type="date" name="lwsJobDeadline" id="lws-JobDeadline" required Value={editing.deadline} />
                        </div>

                        <div class="text-right">
                            <button type="submit" id="lws-submit" class="cursor-pointer btn btn-primary w-fit">
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditJob;