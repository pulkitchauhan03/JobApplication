import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActionArea,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Paper,
} from "@material-ui/core";
import { Form } from "./useForm";
import Controls from "./controls/Controls";
import axios from "axios";
import { createCandidate, getCandidates } from "../actions/candidates";
import { useDispatch } from "react-redux";
import AddAcademic from "./AddAcademic";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import AcademicDetailList from "./AcademicDetailList";
import ExperienceDetailList from "./ExperienceDetailList";
import FileBase from "react-file-base64";

const current = new Date();
const cDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

const genderItems = [
  { id: "M", title: "Male" },
  { id: "F", title: "Female" },
  { id: "O", title: "Other" },
];

const statusItems = [
  { id: "AP", title: "Applied" },
  { id: "AC", title: "Accepted" },
  { id: "RE", title: "Rejected" },
];

const initialAValues = {
  current: false,
  date: cDate,
  course: "",
  institute: "",
};

const initialEValues = {
  current: false,
  fromDate: null,
  toDate: cDate,
  organization: "",
  position: "",
  description: "",
};

const initialFValues = {
  selectedFile: null,
  name: "",
  email: "",
  phone: "",
  summary: "",
  gender: "M",
  status: "AP",

  academic: [],

  experience: [],
};

export default function CandidateForm({ setOpen }) {
  const [values, setValues] = useState(initialFValues);
  const [academic, setAcademic] = useState(initialAValues);
  const [experience, setExperience] = useState(initialEValues);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const dispatch = useDispatch();
  const acads = values.academic;
  const exps = values.experience;

  const changeHandler = (e) => {
    setValues({
      ...values,
      selectedFile: e.target.files[0],
    });
    setIsFilePicked(true);
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAcademicInputChange = (e) => {
    const { name, value } = e.target;
    setAcademic({
      ...academic,
      [name]: value,
    });
  };

  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
    console.log(experience);
  };

  const handleAcademicCheckInputChange = (e) => {
    const { name, value } = e.target;
    setAcademic({
      ...academic,
      [name]: value === "true" ? false : true,
    });
  };

  const handleExperienceCheckInputChange = (e) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value === "true" ? false : true,
    });
    console.log(experience);
  };

  const handleAddAcademic = () => {
    console.log(academic);
    setValues({
      ...values,
      academic: [...values.academic, { ...academic }],
    });
    setAcademic(initialAValues);
  };

  const handleAddExperience = () => {
    setValues({
      ...values,
      experience: [...values.experience, { ...experience }],
    });
    setExperience(initialEValues);
  };

  const handleSubmit = () => {
    dispatch(createCandidate(values));
    setValues(initialFValues);
    setOpen(false);
  };

  function acadDatepicker() {
    if (!academic.current) {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="date"
            label="Date of Completion"
            value={academic.date}
            onChange={(date) =>
              handleAcademicInputChange({
                target: { value: date.format("YYYY-MM-DD"), name: "date" },
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    }
  }

  function expToDatepicker() {
    if (!experience.current) {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="toDate"
            label="Till Date"
            value={experience.toDate}
            onChange={(date) =>
              handleExperienceInputChange({
                target: { value: date.format("YYYY-MM-DD"), name: "toDate" },
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    }
  }

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Full Name"
            value={values.name}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="phone"
            label="Phone"
            value={values.phone}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="summary"
            label="Summary"
            value={values.summary}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.MyRadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          {/* <Button variant="contained">
            <input type="file" name="file" onChange={changeHandler} />
          </Button> */}
          {/* {console.log(selectedFile)} */}
          {/* <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo" 
              name="upload-photo"
              type="file"
            />
            <Button color="secondary" variant="contained" component="span" onClick={({ base64 }) =>
                setValues({ ...values, selectedFile: base64 })
              }>
              Upload button
            </Button>{" "}
          </label> */}
          <Card>
            <h4>Upload Resume</h4>
            <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setValues({ ...values, selectedFile: base64 })
                  }
                />
            </div>
            <br/>
            </Card>
          {/* <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={changeHandler}
            />
            <Button color="secondary" variant="contained" component="span">
              Upload Resume 
            </Button>
          </label> */}
        </Grid>

        <Grid style={{ width: "100%" }}>
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 1,
            }}
          />
          <div className="experience-input-container">
            <h3>Academic Details</h3>

            <Card>
              <AcademicDetailList acads={acads} />
            </Card>
            <Controls.Input
              name="institute"
              label="Institute"
              value={academic.institute}
              onChange={handleAcademicInputChange}
            />
            <Controls.Input
              name="course"
              label="Course"
              value={academic.course}
              onChange={handleAcademicInputChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={academic.current.toString()}
                  name="current"
                  onChange={handleAcademicCheckInputChange}
                />
              }
              label="Currently Studying"
              labelPlacement="start"
            />
            {acadDatepicker()}
            <div className="add-button">
              <Button
                variant="contained"
                style={{ display: "block" }}
                color="primary"
                onClick={() => handleAddAcademic()}
              >
                Add Academic
              </Button>
            </div>
          </div>
        </Grid>

        <Grid className="experience-input-container">
          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              height: 1,
            }}
          />
          {/* <Paper> */}
          <h3>Experience Details</h3>
          <Card>
            <ExperienceDetailList exps={exps} />
          </Card>
          <Controls.Input
            name="organization"
            label="Organization"
            value={experience.organization}
            onChange={handleExperienceInputChange}
          />
          <Controls.Input
            name="position"
            label="Position"
            value={experience.position}
            onChange={handleExperienceInputChange}
          />
          <Controls.Input
            name="description"
            label="Description"
            value={experience.description}
            onChange={handleExperienceInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={experience.current}
                name="current"
                onChange={handleExperienceCheckInputChange}
              />
            }
            label="Currently Working"
            labelPlacement="start"
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="toDate"
              label="Till Date"
              value={experience.toDate}
              onChange={(date) =>
                handleExperienceInputChange({
                  target: { value: date.format("YYYY-MM-DD"), name: "toDate" },
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
          {expToDatepicker()}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="toDate"
              label="From Date"
              value={experience.fromDate}
              onChange={(date) =>
                handleExperienceInputChange({
                  target: {
                    value: date.format("YYYY-MM-DD"),
                    name: "fromDate",
                  },
                })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div className="add-button">
            <Button
              variant="contained"
              style={{ display: "block" }}
              color="primary"
              onClick={() => handleAddExperience()}
            >
              Add Experience
            </Button>
          </div>
          {/* <IconButton
            onClick={() => handleAddExperience()}
            aria-label="Add Experience"
          >
            <AddIcon />
          </IconButton> */}
          {/* </Paper> */}
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
