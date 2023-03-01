import React, { useRef } from "react";
import styled from "styled-components";
import Background from "../office_char.jpg";

const StyledContatctForm = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${Background});
  background-size: cover;
  background-position: center;
  border: 1px solid #000;

  

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;


    input {
      width: 100%;
      height: 40px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(200, 220, 220);
      font-family: "Courier New", Courier, monospace;


      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      width: 100%;
      max-height: 900px;
      min-height: 200px;
      padding: 9px;
      outline: none;
      border-radius: 10px;
      border: 1px solid rgb(220, 220, 220);
      color: black;
      font-family: "Courier New", Courier, monospace;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="Send"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
      border-color: red;
    }
  }
`;

export default StyledContatctForm;