import React from 'react'
import AdminContent from '../../Admin/Pages/AdminContent';
import { Link, useParams } from 'react-router-dom';
import '../../Admin/Pages/Admin.css'; // Adjust the path as needed



function TeacherAnnouncement() {
  const {adminID} = useParams();
  return (
    <div>
      <div className='title'>
      <h1> ANNOUNCEMENTS</h1>
      </div>
      <div>
      <AdminContent/>
      </div>
    </div>

  )
}

export default TeacherAnnouncement