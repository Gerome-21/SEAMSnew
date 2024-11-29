import React, { useState, useEffect } from 'react';
import './Updatefirstyear.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Updatefirstyear = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        student_id: '',
        password: '',
        gender: '',
        course: '',
        messenger_link: '',
        skill: '',
        year_level: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();
    const { id } = useParams();

    // useEffect(() => {
    //     axios.get(`http://localhost:8081/firstyearlist/updatefrstyear/${id}`)
    //         .then((res) => {
    //             console.log("Fetched data:", res.data); // Debugging fetched data
    //             setFormData(res.data); // Populate form with fetched data
    //             setLoading(false); // Set loading to false
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching student data:", err);
    //             setMessage('Failed to fetch student data.');
    //             setLoading(false); // Stop loading on error
    //         });
    // }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8081/firstyearlist/updatefrstyear/${id}`)
            .then((res) => {
                setFormData(res.data);
                setLoading(false); // Data is loaded
            })
            .catch((err) => {
                console.error("Error fetching student data:", err);
                setMessage('Error fetching student data.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.put(`http://localhost:8081/firstyearlist/updatefrstyear/${id}`, formData)
            .then(() => {
                alert('Update successful!');
                navigate('/firstyearlist');
            })
            .catch((err) => {
                console.error("Error updating student:", err);
                setMessage('Error connecting to backend API.');
            });
    };

    if (loading) return <p>Loading...</p>; // Show loading while fetching data

    return (
        <div className='studentform-box'>
            <div className='studentform-blue-box'>
                <h2 className='studentform-welcomeH2'>Good Day Admin</h2>
                <h4 className='studentform-helloH4'>
                    Hello, and welcome to Student Engagement 
                    and Activity Management System for LCC-B<br/> 
                    <span className='studentform-yellowtxt'>School of Business and Information<br/> 
                    Technology</span>
                </h4>
            </div>

            <div className='studentform-white-box'>
                <div className='studentform-txtandlogo-box'>
                    <h2 className='studentform-stdnth2'>Update Student Information</h2>
                </div>
                <form className="studentform-simple-form" onSubmit={handleSubmit}>
                    <div className="studentform-form-row">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="student_id">Student ID</label>
                        <input
                            type="text"
                            id="student_id"
                            name="student_id"
                            value={formData.student_id || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="year_level">Year Level</label>
                        <select
                            id="year_level"
                            name="year_level"
                            value={formData.year_level || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Year Level</option>
                            <option value="1st_year">1st Year</option>
                            <option value="2nd_year">2nd Year</option>
                            <option value="3rd_year">3rd Year</option>
                            <option value="4th_year">4th Year</option>
                            <option value="5th_year">5th Year</option>
                        </select>
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="course">Course</label>
                        <select
                            id="course"
                            name="course"
                            value={formData.course || ''}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="BSIT">Bachelor of Science in Information Technology</option>
                            <option value="BLIS">Bachelor of Library and Information Science</option>
                            <option value="BSBA">Bachelor of Science in Business Management</option>
                        </select>
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="messenger_link">Messenger Link</label>
                        <input
                            type="text"
                            id="messenger_link"
                            name="messenger_link"
                            value={formData.messenger_link || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="gender">Gender</label>
                        <div className="studentform-gender-options">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="studentform-form-row">
                        <label htmlFor="skill">Skill/Talent/Sport</label>
                        <input
                            type="text"
                            id="skill"
                            name="skill"
                            value={formData.skill || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='studentform-submitbtn' type="submit">Update</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Updatefirstyear;



