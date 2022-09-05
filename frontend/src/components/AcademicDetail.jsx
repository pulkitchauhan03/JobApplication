import React from "react";

export default function AcademicDetail(acad) {
  return (
      <div className="academic-detail">
        {/* {console.log(acad.acad.date)} */}
        <p className="school-date">{acad.acad.date}</p>
        <div className="school-detail">
            <p className="school-name">{acad.acad.institute}</p>
            <p className="course-name">&nbsp;&nbsp;&nbsp;&nbsp;{acad.acad.course}</p>
        </div>
      </div>
  );
}
