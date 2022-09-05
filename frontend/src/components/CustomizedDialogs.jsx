import * as React from 'react';
import Button from '@mui/material/Button';
import BootstrapDialog from './controls/BootstrapDialog';
import { Card } from '@material-ui/core';

export default function CustomizedDialogs(props) {

  const { open, setOpen, handleClickOpen, children } = props;

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="contained" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        xlWidth="false"
        handleClose={handleClose}
        children={children}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
