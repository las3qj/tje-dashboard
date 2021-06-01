import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { PinDropSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

    popup: {
        position: "fixed",
        top: "50% !important",
        left: "50%",
    }
}));

export default function AddPersonForm(props) {
    const classes = useStyles();
    const handleSubmit = () => {
        console.log("form submitted")
    }

    return (
        <Popup
            trigger={<button className="button"> Add a {props.personType} </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
        </button>
                    <div className="header"> Add a {props.personType} </div>
                    <div className="content">
                        form stuff

                    </div>
                    <div className="actions">

                        <button
                            className="button"
                            onClick={() => {
                                handleSubmit()
                                close();
                            }}
                        >
                            Submit
          </button>
                    </div>
                </div>
            )}
        </Popup>
    )




}