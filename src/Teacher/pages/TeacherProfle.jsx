import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';

function TeacherProfile({ teacherId }) {
    const [teacher, setTeacher] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Fetch teacher data
        axios.get(`http://localhost:8080/getTeacherById/${teacherId}`)
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.error('Error fetching teacher:', error);
            });
    }, [teacherId]);

    const deleteTeacher = (userid) => {
        axios.delete(`http://localhost:8080/deleteteacher/${userid}`)
            .then(response => {
                // Handle deletion
            })
            .catch(error => {
                // Handle error
            });
    };

    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
        <div className="teacher-profile">
            <div className="header">
                <h1>Teacher Profile</h1>
            </div>
            <div className="teacher-details">
                <div className="image">
                    <img src={`data:image/png;base64,${teacher.profile}`} alt={teacher.firstName} />
                </div>
                <div className="info">
                    <p>Name: {teacher.firstName} {teacher.lastName}</p>
                    <p>Email: {teacher.email}</p>
                    <p>Assigned Year: {teacher.assignedYear}</p>
                    <button onClick={() => setModalOpen(true)}>
                        View Details
                    </button>
                    <button onClick={() => deleteTeacher(teacher.userid)}>
                        <FontAwesomeIcon icon={faUserXmark} />
                    </button>
                </div>
            </div>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        {/* Add more details about the teacher here */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherProfile;
