import {useState, useContext} from 'react'
import { URL } from '../config'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { clearMessageAsync } from '../utils/userUtils'

function SignUp() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
})
const [message,setMessage] = useState('')

const { login } = useContext(UserContext);

const navigate = useNavigate()

const handleChange = (e) => {
setFormData(prevState=>({...prevState,[e.target.name]:e.target.value}))
}

const handleSubmit = async (e) => {
e.preventDefault()
try {
    let res = await axios.post(`${URL}/users/login`, formData )
if(res.status === 200 && res.data && res.data.token) {
        setMessage({type:"success",textContent:`Welcome back ${res.data.email} !!`})
        login(res.data.token)
        setTimeout(()=>{
            navigate('/dashboard')
        },2000)
    } else {
        e.target.reset()
        setMessage({type:'error', textContent:'Something went wrong: HTTP Response corrupted!'})
       clearMessageAsync(setMessage)
    }
} catch (error) {
    console.log(error);
    if(error.response && error.response.data && error.response.data.message) {
        setMessage({type:'error', textContent:error.response.data.message})
    }
    clearMessageAsync(setMessage)
}
}

return (
<form onSubmit={handleSubmit}>
    <label>Email</label>
    <input name='email' onChange={handleChange} required value={formData.email}  />
    <label>Password</label>
    <input name='password' onChange={handleChange} required value={formData.password} />
    <button>Log in!</button>
    <p style={{color:message.type === 'error' ? 'red' : 'green', fontWeight:'bold'}}>{message.textContent}</p>
</form>
)
}

export default SignUp