import {type ChangeEvent, type FormEventHandler, useState,} from "react";
import {delay} from "../utils/delay.ts";
import {LoaderCircle} from "lucide-react";

const submitForm = async (formData: FormData) => {
    await delay(1000)
    if (formData.username.includes("test")) {
        throw new Error("Failed form submission")
    } else {
        return formData;
    }
};

interface FormData {
    username: string;
    password: string;
}

/**
 * Controlled Component
 */
export const Form = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        // Call the last handler
        try {
            await submitForm(formData)
            setFormData({
                username: "",
                password: ""
            })
        } catch (error: unknown) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    };

    if (isLoading) {
        return <LoaderCircle/>
    }

    return (
        <>
            <span>{errorMessage}</span>
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
        </>
    );
};
