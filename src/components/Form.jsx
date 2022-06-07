import React, { useEffect, useState } from "react";

function Form() {
  const [isCheck, setIsCheck] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [userInput, setUserInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    courses: "",
  });

  function handelChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    // (name : value) if we write this way it add one new properties to preValue but we want change data inside ...preValue so --
    setUserInput({ ...userInput, [name]: value });
    console.log(userInput);
  }

  function handelClick(event) {
    event.preventDefault();
    setFormError(validate(userInput));
    setIsSubmit(true);
  }

  useEffect(
    function () {
      console.log(formError);
      if (Object.keys(formError).length === 0 && isSubmit) {
        console.log(userInput);
        setUserInput({
          fullname: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          courses: "",
        });
      }
    },
    [formError]
  );

  function validate(values) {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!values.fullname) {
      errors.fullname = "Fullname is Required.";
    }
    if (!values.email) {
      errors.email = "Email is Required.";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format! ";
    }

    if (!values.password) {
      errors.password = "Password is Required.";
    } else if (values.password.length < 4) {
      errors.password = "Password must be grater than 4 charecters ";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot be exceed more than 10 charecters ";
    }
    if (!values.phone) {
      errors.phone = "Phone No. is Required.";
    }
    if (!values.gender) {
      errors.gender = "Select your Gender";
    }
    if (!values.courses) {
      errors.courses = "Select a Courses";
    }
    if (isCheck === false) {
      alert("Please check term and condition");
    }
    return errors;
  }

  return (
    <section>
      <div className="form">
        {Object.keys(formError).length === 0 && isSubmit ? (
          <div className="uiMessage">SignUp Successfully</div>
        ) : null}

        <div className="heading">
          <h2>User Registration</h2>
        </div>
        <form onSubmit={handelClick}>
          <div>
            <label className="label">Fullname</label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter Your Name"
              name="fullname"
              value={userInput.fullname}
              onChange={handelChange}
              className="input"
              
            />
          </div>
          <p>{formError.fullname}</p>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              value={userInput.email}
              onChange={handelChange}
              className="input"
            />
            <div>
              <p>{formError.email}</p>
            </div>
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              id="password"
              value={userInput.password}
              onChange={handelChange}
              className="input"
            />
          </div>
          <p>{formError.password}</p>

          <div>
            <label className="label">Phone No.</label>
            <input
              type="number"
              placeholder="Enter Your Phone No."
              name="phone"
              id="phone"
              value={userInput.phone}
              onChange={handelChange}
              className="input"
            />
          </div>
          <p>{formError.phone}</p>

          <div onChange={handelChange}>
            <label className="label">Gender</label>
            <input
              type="radio"
              value="Male"
              name="gender"
              className="input"
            />{" "}
            <span>Male</span>
            <input
              type="radio"
              value="Female"
              name="gender"
              className="input"
            />{" "}
            <span>Female</span>
            <input
              type="radio"
              value="Other"
              name="gender"
              className="input"
            />{" "}
            <span>Other</span>
          </div>
          <p>{formError.gender}</p>

          <div>
            <label className="label">Courses</label>
            <select
              onChange={handelChange}
              className=" select input "
              name="courses"
              value={userInput.courses}
              id="courses"
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Node">Node</option>
              <option value="React">React</option>
              <option value="Express">Express</option>
            </select>
          </div>
          <p>{formError.courses}</p>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={isCheck}
              onChange={() => {
                setIsCheck(!isCheck);
              }}
            />
            <span>Terms and condition</span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </section>
  );
}

export default Form;
