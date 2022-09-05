import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';  
import CardActionArea from '@mui/material/CardActionArea';
import axios from 'axios';
import BootstrapDialog from './controls/BootstrapDialog';
import Profile from './Profile';
import { makeStyles, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCandidates, getResume, updateStatus } from '../actions/candidates';
import { deleteCandidate } from '../actions/candidates';
// import download from 'downloadjs';
// import base64toBlob from './controls/GetResume';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

export default function Candidate({candidate}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleAccept() {
    const id = candidate.id;
    dispatch(updateStatus(id, {"status": "AC"}));
  }

  function handleReject() {
    const id = candidate.id;
    dispatch(updateStatus(id, {"status": "RE"}));
  }

  function handleDelete() {
    // axios.delete(`http://127.0.0.1:8000/api/delete/${candidate.id}/`).then(res => {
    //   console.log(res);
    // })
    dispatch(deleteCandidate(candidate.id));
    // dispatch(getCandidates());
  }

  function statusRender() {
    if(candidate.status === 'AP') {
      return(
        <>
        <div className="status-button" >
          <div className="approve-button">
            <IconButton sx={{width: 50, height: 50}} onClick={() => handleAccept()} aria-label="Approve Request" color="success"><CheckIcon/></IconButton>
          </div>
          <div className="decline-button">
            <IconButton sx={{width: 50, height: 50}} onClick={() => handleReject()} aria-label="Decline Request" color="error"><CloseIcon/></IconButton>
          </div>
          </div>
        </>
      );
    }
    else {
      if(candidate.status === 'AC') {
        return(
          <>
            <p>Accepted</p>
          </>
        );
      }
      if(candidate.status === 'RE') {
        return(
          <>
            <p>Rejected</p>
          </>
        );
      }
    }
  }

  return (
    // <div className="clearfix">
        // <div className="row">
    <Card className="card-candidate" sx={{ minWidth: 275, marginBottom: 2, borderRadius: 2 }} >
        <div className="col-md-4 animated fadeIn" >
          <div className="card">
            <div className="card-body">
              <div className="avatar">
                <img
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80/"
                  className="card-img-top"
                  alt=""
                />
              </div>

              <CardActionArea onClick={() => handleClickOpen()} style={{ height: "100%" }}>
                <div className="card-middle">
                  <div>
                    {candidate.name}
                  </div>
                  <div>
                    {candidate.summary.substring(0, 200)}...
                  </div>
                </div>
              </CardActionArea>
                    
              

              <div className="card-buttons">
                <div className="gender-icon">
                  {/* { candidate.gender === 'M' ? <MaleIcon style={{ color: "blue" }}/> : (candidate.gender === 'F' ? <FemaleIcon style={{ color: "pink" }}/> : <TransgenderIcon style={{ color: "black" }}/>)} */}
                  <IconButton sx={{width: 50, height: 50}} onClick={() => handleDelete()} aria-label="Delete Application" color="error"><DeleteIcon/></IconButton>
                </div>
                  {statusRender()}
              </div>
            </div>
          </div>
        </div>
        <div>
          <BootstrapDialog
          xlwidth="true"
          handleClose={handleClose}
          open={open}
          >
            {/* <Paper className={classes.pageContent}> */}
              <Profile id={candidate.id} statusRender={statusRender}/>
            {/* </Paper> */}
          </BootstrapDialog>
        </div>
    </Card>
    // </div>
    // </div> 
  );
}
