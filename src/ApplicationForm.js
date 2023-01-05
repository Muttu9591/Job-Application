import React, { useEffect, useState } from "react";
import axios from "axios";

function ApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    job: "",
    experience: "",
    skills: ""
  });

  function handleChange(event) {
    form({ value: event.target.value });
    // console.log(handleChange);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      name: form.name,
      email: form.email,
      contact: form.contact,
      jobTitle: form.job,
      experience: form.experience,
      skills: form.skills
    };

    console.log(formData);

    // useEffect(() => {
    //   const formData = {
    //     name: form.name,
    //     email: form.email,
    //     contact: form.contact,
    //     jobTitle: form.job,
    //     experience: form.experience,
    //     skills: form.skills
    //   };
    axios
      .post("/users/application-form", formData)
      .then((response) => {
        console.log("resole", response.data);
        if (response.data.hasOwnProperty("error")) {
          alert(response.data.message);
        } else {
          alert("Your Application has been submitted");
          setForm({
            name: "",
            email: "",
            contact: "",
            job: "",
            experience: "",
            skills: ""
          });
        }
      })
      .catch((error) => {
        console.log("reject", error);
      });
  }
  // }, []);

  return (
    <div>
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name :</label>
        <input
          type="text"
          id="fullName"
          name="name"
          value={form.name}
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <label htmlFor="fullName">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          placeholder="example@example.com"
          onChange={handleChange}
        />
        <br /> <br />
        <label htmlFor="fullName">Contact :</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={form.contact}
          placeholder="+91 9591958789"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <label>Applying for job</label>
        <select value={form.job} name="job" onChange={handleChange}>
          <option value="">Fontend Developer </option>
          <option value="">fullStack Developer </option>
          <option value="">Devops Engineer </option>
          <option value="">Cloud Infrastructure Engineer</option>
        </select>
        <br /> <br />
        <label htmlFor="experience">experience :</label>
        <input
          type="text"
          id="experience"
          name="experience"
          value={form.experience}
          placeholder="experience(2 years 3months)"
          onChange={handleChange}
        />
        <br /> <br />
        <label htmlFor="skills">skills :</label>
        <textarea
          type="text"
          id="skills"
          name="skills"
          value={form.skills}
          placeholder="Technical skills"
          onChange={handleChange}
        />
        <br /> <br />
        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
}
export default ApplicationForm;
