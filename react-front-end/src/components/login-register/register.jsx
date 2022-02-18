import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register(props) {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, updateFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    unit_number: "",
    building_code: ""
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    if (formData.first_name && formData.last_name && formData.email && formData.password && formData.phone_number && formData.building_code && formData.unit_number) {
      axios
        .post('http://localhost:8080/api/users/register', { formData })
        .then((res) => {
          const {
            data: { userCreated, userId },
          } = res;

          // If user successfully created.

          if (userCreated === "Successful") {
            console.log(userId);
            navigate(`/login`);
          } else {
            setError("Please enter correct user information");
            return navigate(`/register`);
          }
        })
        .catch(err => {
          console.error(err);
        });

    } else {
      setError("Field cannot be blank.")
      return;
    }

  };



  return (
    <div className="register-container">
      <br />
      <h6>Register</h6>
      <form autoComplete="off" onSubmit={handleSubmit}>

        <label for="First Name" id="title_label">First Name:</label>
        <input
          placeholder="First Name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required

        /> <br />


        <label for="Last Name" id="title_label">Last Name :</label>
        <input
          placeholder="Last Name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
          required

        />  <br />

        <label for="Email" id="title_label">Email :</label>
        <input
          placeholder="Email"
          type="text"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required

        />  <br />

        <label for="Password" id="title_label">Password :</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required

        />  <br />


        <label for="Phone Number" id="title_label">Phone Number :</label>
        <input
          placeholder="Phone Number"
          type="text"
          name="phone_number"
          onChange={handleChange}
          value={formData.phone_number}
          required

        />  <br />

        <label for="Building Code" id="title_label">Building Code :</label>
        <input
          placeholder="Building Code"
          name="building_code"
          onChange={handleChange}
          value={formData.building_code}
          required

        />  <br />

        <label for="Unit Number" id="title_label">Unit Number :</label>
        <input
          placeholder="Unit Number"
          name="unit_number"
          onChange={handleChange}
          value={formData.unit_number}
          required

        />  <br />

        <section className="registration_validation">{error}</section>

        <button type="submit" id="btn_submit">
          Submit
        </button>

      </form>
    </div>
  );
}

export default Register;