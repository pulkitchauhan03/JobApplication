import Candidate from './Candidate';
import {useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CandidateList from './CandidateList';
import { Card, Container } from '@material-ui/core';
import { DataGrid } from "@mui/x-data-grid";
import { Rating } from "@mui/material";
import CustomizedDialogs from './CustomizedDialogs';
import CandidateForm from './AddCandidateForm';
import { Paper, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getCandidates } from '../actions/candidates';
import { Fab } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Home() {
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const style={
      margin: 0,
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 20,
      position: 'fixed',
      // backgroundColor: 'red',
      // color: 'black',
    };
    const dispatch = useDispatch();
    const classes = useStyles();
    const candidates = useSelector((state) => state.candidates);
    // console.log(candidates);
    useEffect(() => {
        dispatch(getCandidates());
        // console.log(candidates);
    }, [dispatch]);
      
    return (
      <>
        <Container>
            <div className="clearfix">
              <div className="row">
                <CandidateList candidates={candidates}/>
                <CustomizedDialogs
                  open={open}
                  setOpen={setOpen}
                  handleClickOpen={handleClickOpen}
                >
                  {/* <Paper className={classes.pageContent}> */}
                    <CandidateForm setOpen={setOpen}/>
                  {/* </Paper> */}
                </CustomizedDialogs>
              </div>
            </div> 
        </Container>
        <Fab style={style} color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon/>
        </Fab>
      </>
    );
  }
  
  export default Home;