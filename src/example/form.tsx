import {type ChangeEvent, type FormEventHandler, useState,} from "react";
import {useDebounce} from "../hooks/useDebounce";

/**
 * Controlled Component
 * Handle debounce
 */
export const Form = () => {
    const submitForm = () => {
        console.log(formData);
    };

    const debouncedSubmitForm = useDebounce(submitForm);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        // Call the last handler
        debouncedSubmitForm();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"username"}>Username</label>
            <input
                type="text"
                id={"username"}
                name={"username"}
                value={formData.username}
                onChange={handleChange}
            />
            <br/>
            <label htmlFor={"password"}>Password</label>
            <input
                type="password"
                id={"password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
            />
            <br/>
            <input type="submit"/>
        </form>
    );
};
