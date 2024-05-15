import React, { useEffect, useState } from 'react'
import './TeacherDashboard.css';
import axios from 'axios';

function TeacherDashboard({ teacherId }) {
  const [teachers, setTeachers] = useState([]);
  const [events, setEvents] = useState([]);
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:8080/getallteachers')
        .then(response => {
            setTeachers(response.data);
        })
        .catch(error => {
            console.error('Error fetching teachers:', error);
        });
}, []);

useEffect(() => {
  // Fetch events from backend API
  axios.get('http://localhost:8080/getEvents')
    .then(response => {
      setEvents(response.data);
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}, []);

useEffect(() => {
  axios.get('http://localhost:8080/getAllSections')
    .then(response => {
      setSections(response.data);
      console.log("Sections:", response.data); // Check if sections are properly fetched
    })
    .catch(error => {
      console.error('Error fetching sections:', error);
    });
}, []);

useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/articles/getall');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  fetchArticles();

  return () => {
    setArticles([]);
  };
}, []);

// Function to get section name for a given teacher
const getSectionName = (teacher) => {
  const section = sections.find(section => section.sectionID === teacher.sectionID);
  return section ? section.sectionName : 'No Section Assigned';
};


// Function to get number of students for a given section
const getNumberOfStudents = (sectionID) => {
  const section = sections.find(section => section.sectionID === sectionID);
  return section && section.students ? section.students.length : 0;
};


  return (
    <div className='teacherDashboard'>
      <h1>
        <strong>TEACHER DASHBOARD</strong>
      </h1>
        <div className='teacherDashboard-articles-container'>
        <h1><strong>Articles</strong></h1> 
          <div className='teacherDashboard-category-item'>
            <h3>Total Articles</h3>
            <p>{articles.length}</p>
          </div>
          <div className='teacherDashboard-category-item'>
            <h3>Published Articles</h3>
            <ul>
                    {articles.map((article, index) => (
                            <li key={article.articleID}>
                              <strong>{index + 1}.    {article.prevArticles}</strong>
                            </li>
                        ))}
                    </ul>
          </div>
          <div className='teacherDashboard-category-item'>
            <h3>Important Articles</h3>
            <p>List of Important Articles</p>
          </div>
        </div>     
  
        <div className='teacherDashboard-events-container'>
                <h1><strong>Events</strong></h1>
                <div className='teacherDashboard-category-item'>
                    <h3>Total Events</h3>
                    <p>{events.length}</p>
                </div>
                <div className='teacherDashboard-category-item'>
                    <h3>Upcoming Events</h3>
                    <ul>
                    {events.map((event, index) => (
                            <li key={event.eventID}>
                              <strong>{index + 1}.    {event.eventTitle}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='teacherDashboard-category-item'>
                    <h3>Past Events</h3>
                    <p>Display the number of past events here.</p>
                </div>
            </div>
        
        <div className='teacherDashboard-teachers-container'>
                <h1><strong>Teachers</strong></h1>
                <div className='teacherDashboard-category-item'>
                    <h3>Total Teachers</h3>
                    <p>{teachers.length}</p>
                </div>
                <div className='teacherDashboard-category-item'>
                    <h3>Active Teachers</h3>
                    <ul>
                    {teachers.map((teacher, index) => {
  console.log("Teacher section ID:", teacher.sectionID); // Check the section ID for each teacher
  return (
    <li key={teacher.userid}>
      <strong>{index + 1}. {teacher.firstName} {teacher.lastName} - {getSectionName(teacher)} ({getNumberOfStudents(teacher.sectionID)} Students)</strong>
    </li>
  );
})}

                    </ul>
                </div>
            </div>
    </div>
  )
}

export default TeacherDashboard