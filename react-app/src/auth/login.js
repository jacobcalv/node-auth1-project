import React, {useState} from 'react';
import axios from 'axios';
import './login.css'

const Login = (props) => {
    const [data, setData] = useState({
		username: "",
		password: "",
    })
    
    const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		})
    }
    
    const handleSubmit = (event) => {
		  event.preventDefault()
      axios.post("http://localhost:5000/api/login", data)
			  .then(result => {
				  console.log(result)
			  })
			  .catch(err => {
          console.log(err)
          console.log(data)
			  })
	}
    return(
    <div>
     <form className='reg' onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="username" name="username" placeholder="Username" value={data.username} onChange={handleChange} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />

        <button className='submit' type="submit">Sign In</button>
      </form>
    </div>
    )
}

export default Login;