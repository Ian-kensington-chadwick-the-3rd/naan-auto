import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { SIGN_IN } from "../utils/querys";
import { useNavigate } from 'react-router-dom';

// create form test signin mutation test token auth test add car.

const login = () => {
    const [signIn] = useMutation(SIGN_IN)
    const [loggedInSuccess, setLoggedInSuccess] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        passwordInput: ''
    })

    const navigate = useNavigate()

    useEffect(()=>{
        if(loggedInSuccess === true){
        const timeout = setTimeout(() => {
            navigate('/inventory')
        }, 1000); 
        return () => clearTimeout(timeout)
        }
    },[loggedInSuccess])

    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value
        console.log(name, value)
        setFormData((data)=>({
            ...data,
            [name]: value
        }))
        console.log(formData)
    }


    async function handleSubmit(e) {
        e.preventDefault()
        try{
        const {data} =  await signIn({
            variables:{
                username: formData.username,
                passwordInput: formData.passwordInput
            }
        })
        console.log(data) 
        localStorage.setItem('token', data.signIn.token)
        console.log(data.signIn.success)
        if(data.signIn.success === true){
           setLoggedInSuccess(true)
        } 
         alert(data.signIn.message)

        } catch(error){
            console.log(error)
        }
        
        
    }
    return (

        <div className="log-in_container">
            <form onSubmit={e => handleSubmit(e)} className="log-in_form">

                <label htmlFor='usernameId' className="">
                    <input type="text"
                     value={formData.username}
                     name="username"
                     onChange={handleChange} 
                     placeholder="Username"
                     className="log-in_input"></input>
                </label>
                
                <label htmlFor="passwordInputId">
                    <input type='text' 
                    id="passwordInputId" 
                    value={formData.passwordInput} 
                    name="passwordInput"
                    onChange={handleChange} 
                    placeholder="Password"
                    className="log-in_input"></input>
                </label>

                <input type='submit' value='submit' className="log-in_button"></input>
            </form>
        </div>

    )
}

export default login;
