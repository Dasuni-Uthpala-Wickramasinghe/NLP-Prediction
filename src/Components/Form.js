import React from 'react';
import { TextField, Button } from "@material-ui/core";

export const Form = ({ userInput, onFormChange, onFormSubmit, isDisabled }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    return (
        <div style={{width:'100%',height:'100%',display:'flex', justifyContent:'center', alignItems:'center'}} >
        <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Your Complain"
          multiline="10"
          color="primary"
          variant="outlined"
          fullWidth
          value={userInput}
          style={{width:'600px'}}
          onChange={handleChange}
        />
        <Button disabled={isDisabled} type='submit' style={{ width: '100px', height: '50px', marginTop: '20px' }} variant="contained" color="primary">
          Continue
        </Button>
        </form>
        </div>
    )
}

export default Form;