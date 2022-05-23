import axios from "axios";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss"

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START"
    })
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details },)
      if (res.data.isAdmin) {
        navigate("/")
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "Admin değilsiniz!" } })
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
    console.log(`${process.env.REACT_APP_API_URL}/auth/login`)
  }

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          className="lInput"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          className="lInput"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
        {
          error && <span>{error.message}</span>
        }
      </div>
    </div>
  )
}

export default Login