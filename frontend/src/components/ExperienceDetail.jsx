import React from 'react'

export default function ExperienceDetail(exp) {
  return (
    <div>
      <div className="academic-detail">
        <div className="dates">
            <p className="school-date">{exp.exp.current ? "Current" : exp.exp.toDate}</p>
            {/* <p className="school-date">to</p> */}
            <p className="school-date">{exp.exp.fromDate}</p>
        </div>
        <div className="school-detail">
            <p className="school-name">{exp.exp.organization}</p>
            <p className="course-name">&nbsp;&nbsp;&nbsp;&nbsp;{exp.exp.position}</p>
            <p className="description">{exp.exp.description}</p>
        </div>
      </div> 
    </div>
  )
}
