import { Button, Card, Grid, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MaleIcon from "@mui/icons-material/Male";
import { useDispatch } from "react-redux";
import { getResume } from "../actions/candidates";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./profile.css";
import AcademicDetail from "./AcademicDetail";
import ExperienceDetail from "./ExperienceDetail";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import { getCandidate } from "../api";
import axios from "axios";
import AcademicDetailList from "./AcademicDetailList";
import ExperienceDetailList from "./ExperienceDetailList";

export default function Profile({ id, statusRender }) {
  const dispatch = useDispatch();
  const [currCandidate, setCurrCandidate] = useState([]);
  const acads = currCandidate.academic;
  const exps = currCandidate.experience;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/details/${id}/`).then(res => {
      console.log(res.data);
      setCurrCandidate(res.data);
      // console.log(currCandidate);
    })
    // console.log(id);
    // setCandidate(getCandidate(id));
    // console.log(getCandidate(id));
}, []);

  function handleReject() {
    console.log("Rejected");
  }

  function handleDownload() {
    dispatch(getResume(id));
  }

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <div className="profile-container">
            <Paper>
              <div className="details-container">
                <div className="avatar-profile">
                  <img
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80/"
                    className="card-img-top-profile"
                    alt=""
                  />
                </div>
                <div className="details">
                  <h3 className="title-h3">{currCandidate.name}</h3>
                  <span className="gender-icon-class">
                    {currCandidate.gender === "M" ? (
                      <MaleIcon style={{ color: "blue" }} />
                    ) : currCandidate.gender === "F" ? (
                      <FemaleIcon style={{ color: "pink" }} />
                    ) : (
                      <TransgenderIcon style={{ color: "black" }} />
                    )}
                  </span>
                </div>
                <div className="about-info">
                  <p className="phone-info">{currCandidate.phone}</p>
                  <p className="email-info">{currCandidate.email}</p>
                </div>
                <div className="summary">
                  <p className="summary-text">{currCandidate.summary}</p>
                </div>
                  {statusRender()}
              </div>
            </Paper>
            
            <div>
              <Button onClick={() => handleDownload()} variant="contained" startIcon={<DownloadIcon />}>
                Resume
                {/* <DownloadIcon /> */}
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="right-container">
            <Card className="academic-container">
              <h3> Academic </h3>
              {/* {console.log(acads)} */}
              <AcademicDetailList acads={acads} />
            </Card>
            <Card className="academic-container">
              <h3> Experience </h3>
              <ExperienceDetailList exps={exps}/>
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
