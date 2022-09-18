import React, { useState } from "react";
// import styled from "styled-components";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

// #78 Watch again, complex one
// #78 Components returned by the styled components function forward all the props we set on them to the underlying div (here on to the <FormControl>)

// const FormControl = styled.div` #80,#81 => Now commenting out that styled approach to css-modules approach
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "black")};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     /* border: 1px solid #ccc;  #78*/
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     background: ${(props) => (props.invalid ? "#ffd7d7" : "transparent")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
//   /*
//   #78 Watch for why they are commented out
//   &.invalid input {
//     border-color: red;
//     background: rgb(215, 169, 169);
//   }

//   &.invalid label {
//     color: rgba(150, 58, 58, 0.758);
//   } */
// `;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      //#75, this checks if the user entered anything or not, trim removes the white spaces from front and back of the string and if nothing was entered we get a string of length 0 and set the isValid to false
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/* #76 We will now work to implement the functionality of adding classes dynamically such that the div will either contain "form-control" or "form-control invalid" and for that we need to use template strings in javascript */}
      {/* <div className={styles.form-control}> can't be used bcz form-control name type so we've to use styles['form-control'] #81, 1.05-1.11*/}
      {/* <div className={styles['form-control']}> #81, 3.07: Here the thing that occurs is now we cannot add that invalid class when no input is provided so below now we've to use template strings */}
      <div
        className={`${styles["form-control"]} ${!isValid && styles.invalid}`}
      >
        {/* Thus on #78, we saw that we defined this inValid prop on FormControl and thus this can be used inside those backticks where we defined this FormControl styled element */}
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
