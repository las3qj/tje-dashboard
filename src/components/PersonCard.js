import {Card, Grid, TextField, IconButton, Button} from '@material-ui/core' 
import { CodeSharp, PinDropSharp } from '@material-ui/icons';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, { useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function PersonCard({personType,person,reload,classList}){

  const [fName,setFName] = useState(person.firstName);
  const [lName,setLName] = useState(person.lastName);
  const [dob,setDOB] = useState(person.birthday);
  const [addr,setAddr] = useState(person.address);
  const [number,setNumber] = useState(person.phone);
  const { role } = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  const saveChanges = (()=>{
    const firstName = fName;
    const lastName = lName;
    const birthday = dob;
    const id=person.id;
    const classes = person.classes;
    const address = addr;
    const phone = number;

    if(personType==="teacher"){
      fetch("http://localhost:8000/teachers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id,firstName,lastName,birthday,classes,address,phone})
      })
      .then(()=>{reload()})
    }
    else{
      fetch("http://localhost:8000/students", {
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
      fetch("http://localhost:8000/teachers?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
    else{
      fetch("http://localhost:8000/students?"+"id="+person.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(()=>{reload()})
    }
  })

    const formatClasses = ((classes)=>{
            if(classes){
              let result = "";
              let x = 0;
              for(x=0;x<classes.length;x++){
                if(x===0){
                  for(let y=0;y<classList.length;y++){
                    if(classList[y].id===classes[x]){
                      result=classList[y].name
                    }  
                  }
                }
                else{
                  for(let y=0;y<classList.length;y++){
                    if(classList[y].id===classes[x]){
                      result = result+", "+classList[y].name;
                    }  
                  }
                }
              }
              return result;
            }
            else{
              return "No Classes"
      
            }
        })
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
            <Grid item xs={2}>
              <Popup contentStyle={edit?{height: "17%",width: "30%"}:{height: "15%",width: "30%"}} trigger={<Button variant="outlined">Contact Info</Button>} position="right center">
                <div style={{padding:5}}>
          {edit?(<TextField onChange={(evt)=>{
          setNumber(evt.target.value)
          }} id="outlined-basic" label="Phone Number" size="small" variant="outlined" defaultValue={number}/>):<p>{person.phone===undefined?"Phone Number Unavailable":("Phone Number: "+number)}</p>}
          {edit&&<br/>}
          {edit&&<br/>}
          {edit?(<TextField onChange={(evt)=>{
          setAddr(evt.target.value)
          }} id="outlined-basic" label="Address" size="small" variant="outlined" defaultValue={addr}/>):<p>{person.address===undefined?"Address Unavailable":("Address: "+addr)}</p>}
                </div>
              </Popup>
            </Grid>
            <Grid item xs={4}>
              <p style={{textAlign:"center",fontSize:18}}>{formatClasses(person.classes)}</p>
            </Grid>

            {role === "admin" && (
              <>
                <Grid item xs={1}>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      removePerson();
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  {edit ? (
                    <Button onClick={() => saveChanges()} variant="outlined">Save</Button>
                  ) : (
                    <Button onClick={() => setEdit(true)} variant="outlined">Edit</Button>
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
