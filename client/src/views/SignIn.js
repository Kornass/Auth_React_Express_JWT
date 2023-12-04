import {useState} from 'react'
import { URL } from '../config'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SignIn() {
    const [formData, setFormData] = useState({
        login:'',
        email:'',
        password:'',
        password2:'',
    })
    const [message,setMessage] = useState('')

    const navigate = useNavigate()
    
const handleChange = (e) => {
    setFormData(prevState=>({...prevState,[e.target.name]:e.target.value}))
}

const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        let res = await axios.post(`${URL}/users/register`, formData )
        debugger
        if(res.status == 200 && res.data && res.data.token && res.data.email && res.data._id) {
            setMessage({type:"success",textContent:`User ${res.data.email} successfully registered!!`})
            setTimeout(()=>{
                navigate('/dashboard')
            },2500)
        } else {
            setMessage({type:'error', textContent:'Something went wrong: HTTP Response corrupted!'})
        }
    } catch (error) {
console.log(error);
if(error.response && error.response.data && error.response.data.message) {
setMessage({type:'error', textContent:error.response.data.message})
}
}
}


  return (
    <form onSubmit={handleSubmit}>
        <label>Login</label>
        <input name='login' onChange={handleChange} required value={formData.login}/>
        <label>Email</label>
        <input name='email' onChange={handleChange} required value={formData.email}  />
        <label>Password</label>
        <input name='password' onChange={handleChange} required value={formData.password} />
        <label>Repeat password</label>
        <input name='password2' onChange={handleChange} required value={formData.password2} />
        <button>Sign in!</button>
        <p style={{color:message.type === 'error' ? 'red' : 'green', fontWeight:'bold'}}>{message.textContent}</p>
    </form>
  )
}

export default SignIn