import React from 'react';
import Candidate from './Candidate';
import CustomizedDialogs from './CustomizedDialogs';
import { useSelector } from 'react-redux';

export default function CandidateList() {
  const candidates = useSelector((state) => state.candidates);
  
  console.log(candidates);
  return (
      candidates.map(candidate => {
        return <Candidate key={candidate.id} candidate={candidate}/>
      })
  )
}
