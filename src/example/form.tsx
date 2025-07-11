import {type ChangeEvent, type FormEventHandler, useState} from "react";

/**
 * Controlled Component
 * Handle debounce
 */
export const Form = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        debounceFunction()
    }

    const debounceFunction = () => {
        console.log(formData)
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Username</label>
            <input type="text" id={"username"} name={"username"} value={formData.username} onChange={handleChange}/>
            <br/>
            <label htmlFor={"password"}>Password</label>
            <input type="password" id={"password"} name={"password"} value={formData.password} onChange={handleChange}/>
            <br/>
            <button type="submit">Submit</button>
        </form>
    )
}
