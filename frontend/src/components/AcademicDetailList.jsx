import React from 'react'
import AcademicDetail from './AcademicDetail'

export default function AcademicDetailList({ acads }) {
  return (
    acads && acads.map(acad => {
        return <AcademicDetail key={acad.id} acad={acad}/>
    })
  )
}
