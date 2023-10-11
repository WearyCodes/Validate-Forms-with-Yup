import logo from './logo.svg';
import * as yup from "yup"
import './App.css';
import { useState, useEffect } from 'react';

const schema = yup.object().shape({
  user: yup.string().required('Username is required!').min(6, "Username too short!"),
  state: yup.string().oneOf(['AL', 'AK', 'AZ', 'AR'], 'Pick a state!'),
  ageRange: yup.string().oneOf(['a', 'b', 'c'], 'What is your age?'),
  isGoing: yup.boolean().oneOf([true, false], 'You goin or nah?')
})


export default function App() {
  // The state `form.isGoing` will drive a checkbox and is a boolean, whereas the rest are strings
  const [form, setForm] = useState({ user: '', ageRange: '', state: '', isGoing: false });
  const [errors, setErrors] = useState({ user: '', ageRange: '', state: '', isGoing: '' })
  const [disabled, setDisabled] = useState(true)

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({...errors, [name] : ''}))
    .catch(err => setErrors({...errors, [name] : err.errors[0]}))
  }

const handleChange = event => {
    // Pull out the info of interest
    const { name, type, value, checked } = event.target;
    // Find out which value to use (the actual "value" of the target or its "checked" in the case of a checkbox)
    const updatedInfo = type === 'checkbox' ? checked : value;
    // Update state
    setFormErrors(name, updatedInfo)
    setForm({ ...form, [name]: updatedInfo });
  }

  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])

  return (
    <div className="App">
      <div style={{color: 'red'}}>
      <div>{errors.user}</div><div>{errors.state}</div><div>{errors.ageRange}</div><div>{errors.isGoing}</div>
      </div>
      <form>
        <label>User Name:
          <input value={form.user} name="user" type="text" onChange={handleChange} />
        </label>      </form>
        <label>13-18
    <input
      name="ageRange" type="radio" value="a"
      checked={form.ageRange === "a"} onChange={handleChange}
    />
  </label>

  <label>19-24
    <input
      name="ageRange" type="radio" value="b"
      checked={form.ageRange === "b"} onChange={handleChange}
    />
  </label>

  <label>25+
    <input name="ageRange" type="radio" value="c"
    checked={form.ageRange === "c"} onChange={handleChange}
  />
  </label>
  <label>State:
  <select value={form.state} name="state" onChange={handleChange}>
    <option value="">--select a state--</option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
  </select>
</label>
<label>RSVP:
  <input
    name="isGoing"
    type="checkbox"
    checked={form.isGoing}
    onChange={handleChange}
  />
</label>    
<button disabled={disabled}>Submit</button>
</div>

  );
}
