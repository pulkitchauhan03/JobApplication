import React from 'react'
import ExperienceDetail from './ExperienceDetail'

export default function ExperienceDetailList({ exps }) {
    const sorted = exps ? [...exps].sort((a, b) => b["fromDate"] - a["fromDate"]).reverse() : null;
  return (
    sorted && sorted.map(exp => {
        return <ExperienceDetail key={exp.id} exp={exp}/>
    })
  )
}
