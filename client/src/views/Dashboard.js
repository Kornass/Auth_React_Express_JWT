import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { getRequestConfig } from '../utils/userUtils'
import { UserContext  } from '../context/UserContext'
import { URL } from '../config'

function Dashboard() {
  const [userData, setUserData] = useState(null)

const {currentUser} = useContext(UserContext)


const getUser = async () => {
try {
 const config =  getRequestConfig(currentUser.token)
 debugger
let res = axios.get(`${URL}/users/currentUser`)
console.log(res);
} catch (error) {
  console.log(error);
}
}

useEffect(()=>{
  // at first render state is empty ??
 console.log(currentUser);
},[currentUser])

  return (
    <div className='wrapper'>
      <h2>User data</h2>
      {currentUser && Object.entries(currentUser).map((ele,idx)=>{
      if(ele[0] === "token") {
        return null
      } 
     return <p key={idx}>
        <span>{ele[0]}</span><span>{ele[1]}</span>
        </p>})}
    </div>
  )
}

export default Dashboard