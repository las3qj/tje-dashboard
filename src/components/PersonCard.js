import {Card, Grid, TextField, IconButton, Button} from '@material-ui/core' 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { PinDropSharp } from '@material-ui/icons';

function PersonCard({personType,person,reload,classList, accessCode}){

  const [fName,setFName] = useState(person.firstName);
  const [lName,setLName] = useState(person.lastName);
  const dob = person.birthday;
  const [addr,setAddr] = useState(person.address);
  const [number,setNumber] = useState(person.phone);
  const { role, isLoggedIn } = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  const saveChanges = (()=>{
    const firstName = fName;
    const lastName = lName;
    const birthday = dob;
    const id = person.id;
    const classes = person.classes;
    const address = addr;
    const phone = number;

    if(personType==="teacher"){
      fetch("/teachers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id,firstName,lastName,birthday,classes,address,phone})
      })
      .then(()=>{reload()})
    } else{
      fetch("/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id,firstName,lastName,birthday,classes,address,phone})
      })
      .then(()=>{reload()})
    }
    setEdit(false)
  })

  const removePerson=(()=>{
    if(personType==="teacher"){
      fetch("/teachers?id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
    else{
      fetch("/students?id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
  })

    const formatClasses = (classes) => {
      if (classes) {
        let result = "";
        let x = 0;
        for (x = 0; x < classes.length; x++) {
          if (x === 0) {
            for (let y = 0; y < classList.length; y++) {
              if (classList[y].id === classes[x]) {
                result = classList[y].name;
              }
            }
          } else {
            for (let y = 0; y < classList.length; y++) {
              if (classList[y].id === classes[x]) {
                result = result + ", " + classList[y].name;
              }
            }
          }
        }
        return result;
      } else {
        return "No Classes";
      }
    };

    let classSize = 8;
    if (role === "admin") classSize = 4;
    if (role === "teacher") classSize = 6;
    
    return (
      <div style={{ padding: 2, justifyContent: "center"}}>
        <Card elevation={2} style={{ width: "90vw", height: "5vw" }}>
          <Grid container item xs={12} spacing={1} style={{alignItems: "center", height: "100%" }}>
            <Grid item xs={2}>
              {edit ? (
                <div style={{ paddingTop: 12, paddingLeft: 10 }}>
                  <TextField
                    onChange={(evt) => {
                      setLName(evt.target.value);
                    }}
                    id="outlined-basic"
                    label="Last Name"
                    size="small"
                    variant="outlined"
                    defaultValue={lName}
                  />
                </div>
              ) : (
                <p style={{ textAlign: "center", fontSize: 18 }}>{lName}</p>
              )}
            </Grid>
            <Grid item xs={2}>
              {edit ? (
                <div style={{ paddingTop: 12, paddingLeft: 10 }}>
                  <TextField
                    onChange={(evt) => {
                      setFName(evt.target.value);
                    }}
                    id="outlined-basic"
                    label="First Name"
                    size="small"
                    variant="outlined"
                    value={fName}
                  />
                </div>
              ) : (
                <p style={{ textAlign: "center", fontSize: 18 }}>{fName}</p>
              )}
            </Grid>
            {isLoggedIn && (<Grid item xs={1.5}>
              <Popup contentStyle={edit?{width: "30%"}:{width: "30%"}} trigger={<Button variant="contained">Contact Info</Button>} position="right center">
                <div style={{padding:5}}>
          {edit?(<TextField onChange={(evt)=>{
          setNumber(evt.target.value)
          }} id="outlined-basic" label="Phone Number" size="small" variant="outlined" defaultValue={number}/>):<p>{person.phone===undefined?"Phone Number Unavailable":("Phone Number: "+number)}</p>}
          {edit&&<br/>}
          {edit&&<br/>}
          {edit?(<TextField onChange={(evt)=>{
          setAddr(evt.target.value)
          }} id="outlined-basic" label="Address" size="small" variant="outlined" defaultValue={addr}/>):<p>{person.address===undefined?"Address Unavailable":("Address: "+addr)}</p>}
                  {accessCode && (<p>Access Code: {accessCode}</p>)}
                </div>
              </Popup>
            </Grid>)}

            {role === "admin" && (
              <Grid item xs={1} style={{paddingLeft:"6%"}}> 
                {dob}
              </Grid>
            )}

            <Grid item xs={classSize}>
              <p style={{textAlign:"center",fontSize:18}}>{formatClasses(person.classes)}</p>
            </Grid>

            {role === "admin" && (
              <>
                <Grid item xs={.5}>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      removePerson();
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={.5}>
                  {edit ? (
                    <Button style={{backgroundColor:"#FDFD96"}} onClick={() => saveChanges()} variant="contained">Save</Button>
                  ) : (
                    <Button style={{backgroundColor:"#FDFD96"}} onClick={() => setEdit(true)} variant="contained">Edit</Button>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Card>
      </div>
    );
}
export default PersonCard;
