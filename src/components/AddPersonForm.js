import React from 'react';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { PinDropSharp } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import { FormControl, InputLabel, FormHelperText, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../App.css';


export default function AddPersonForm(props) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [address, setAddress] = useState("")
    const [homeroom, setHomeroom] = useState([""])
    const [phone, setPhone] = useState("")
    const [allClasses, setAllClasses] = useState([])
    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = () => {
        const url = new URL("http://localhost:8000/classes");
        const axios = require('axios');
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setAllClasses(response.data)
            }, error => {
                console.log(error);
            });


    }
    const handleSubmit = () => {
        console.log("form submitted")
        const axios = require('axios');
        let url = ""
        if (props.personType == "student") {
            url = 'http://localhost:8000/students'
        }
        else {
            url = 'http://localhost:8000/teachers'
        }
        axios.post(url, {
            firstName,
            lastName,
            classes: homeroom,
            birthday,
            address,
            phone
        })
            .then((response) => {
                console.log(response);

            }, (error) => {
                console.log(error);
            });

    }

    return (
        <Popup
            trigger={<Button className="button"> Add a {props.personType} </Button>}

            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                     </button>
                    <div className="header"> Add a {props.personType} </div>
                    <div className="content" style={{ display: "flex" }}>

                        <TextField id="my-input" value={firstName} label="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                        <TextField id="my-input" value={lastName} label="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                        <TextField id="my-input" value={birthday} label="Birthday" onChange={(e) => { setBirthday(e.target.value) }} />
                        <TextField id="my-input" value={address} label="Address" onChange={(e) => { setAddress(e.target.value) }} />
                        <TextField id="my-input" value={phone} label="Home Phone" onChange={(e) => { setPhone(e.target.value) }} />
                        <Autocomplete
                            id="combo-box-demo"
                            options={allClasses}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            onChange={(e, v) => {
                                console.log(v)
                                setHomeroom(v.id)
                            }}
                            renderInput={(params) => <TextField {...params} label="Homeroom" variant="outlined" />}
                        />
                        <Button
                            className="button"
                            onClick={() => {
                                handleSubmit()
                                close();
                            }}
                        >
                            Submit
                             </Button>


                    </div>



                </div>
            )}
        </Popup>
    )




}