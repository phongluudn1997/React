import {
  type ChangeEvent,
  type FormEventHandler,
  useCallback,
  useState,
} from "react";
import { delay } from "../utils/delay.ts";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "../hooks/useMutation.ts";

const submitForm = async (formData: FormData) => {
  await delay(1000);
  if (formData.username.includes("test")) {
    throw new Error("Failed form submission");
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
  const { formData, handleChange } = useForm();

  const { mutate, isLoading } = useMutation(submitForm);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    await mutate(formData);
  };

  if (isLoading) {
    return <LoaderCircle />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={"username"}>Username</label>
        <input
          type="text"
          id={"username"}
          name={"username"}
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor={"password"}>Password</label>
        <input
          type="password"
          id={"password"}
          name={"password"}
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

const useForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }, []);

  return { handleChange, formData };
};
