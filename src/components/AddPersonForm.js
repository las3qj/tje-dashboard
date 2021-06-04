import React from 'react';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import 'reactjs-popup/dist/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { PinDropSharp } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import { FormControl, InputLabel, FormHelperText, Button, TextField, IconButton } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../App.css';
import CloseIcon from '@material-ui/icons/Close';


export default function AddPersonForm(props) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")



    const handleSubmit = () => {
        console.log("form submitted")
        const axios = require('axios');
        let url = ""
        if (props.personType === "student") {
            url = 'http://localhost:8000/students'
        }
        else {
            url = 'http://localhost:8000/teachers'
        }
        axios.post(url, {
            firstName,
            lastName,
            birthday,
            address,
            phone
        })
            .then((response) => {
                props.reload();
                setFirstName("")
                setLastName("")
                setBirthday("")
                setAddress("")
                setPhone("")

            }, (error) => {
                console.log(error);
            });

    }

    return (
        <Popup
            trigger={<Button className="button"> Add a {props.personType} </Button>}
            contentStyle={{ height: "450px", width: "700px" }}

            modal
            nested
        >
            {close => (
                <div className="modal">
                    <IconButton className="close" onClick={close}>
                        <CloseIcon />
                    </IconButton>
                    <FormControl style={{ paddingLeft: "2vw" }}>
                        <div className="header">
                            <h1>Add a {props.personType}.</h1>
                        </div>
                        <div className="content">

                            <TextField id="my-input" style={{ paddingRight: 40 }} value={firstName} label="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                            <TextField id="my-input" value={lastName} label="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                            <br />
                            <br />
                            <TextField id="my-input" style={{ paddingRight: 40 }} value={birthday} label="Birthday" onChange={(e) => { setBirthday(e.target.value) }} />
                            <TextField id="my-input" style={{ paddingRight: 40 }} value={address} label="Address" onChange={(e) => { setAddress(e.target.value) }} />
                            <TextField id="my-input" style={{ paddingRight: 40 }} value={phone} label="Home Phone" onChange={(e) => { setPhone(e.target.value) }} />
                            <br />
                            <br />


                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "7em", backgroundColor: "#2E3B55" }}
                                className="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit()
                                    close();
                                }}
                            >
                                Submit
                             </Button>


                        </div>
                    </FormControl>
                </div>
            )}
        </Popup>
    )




}