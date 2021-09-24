import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState({
    title: '',
    message: ''
  });

  const addUserHandler = (e) => {
    e.preventDefault();
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0){
      setError({
        title: 'invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
        return;
    }
    if(enteredAge <1){
      setError({
        title: 'invalid age',
        message: 'Please enter a valid age.'
      });
        return;
    }
    // console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = (e) =>{
      setEnteredUsername(e.target.value);
  };

  const ageChangeHandler = (e) =>{
    setEnteredAge(e.target.value);
  };

  const errorHandler = () =>{
    setError({
      title: '',
      message: ''
    });
  }

  return (
    <>
    
    {error.title !== '' ? <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/> : null}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>

          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler} />

          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
