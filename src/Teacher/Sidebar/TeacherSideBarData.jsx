import React from 'react'
import * as MdIcons from "react-icons/md";
import * as TfiIcons from "react-icons/tfi";

const TeacherSideBarData = [
    {
        title: 'Dashboard',
        path: '/Teacher/Dashboard',
        icon: <MdIcons.MdDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Announcements',
        path: '/Teacher/Announcements',
        icon: <TfiIcons.TfiAnnouncement />,
        cName: 'nav-text'
    },
    {
        title: 'Events',
        path: '/Teacher/Events',
        icon: <MdIcons.MdEventAvailable />,
        cName: 'nav-text'
    },
    {
        title: 'Articles',
        path: '/Teacher/Articles',
        icon: <MdIcons.MdArticle />,
        cName: 'nav-text'
    }
]

export default TeacherSideBarData