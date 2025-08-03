import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
} from "react";

const useMultiStepsForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurretStepIndex] = useState(0);
  const next = () => {
    setCurretStepIndex((prevStepIndex) =>
      prevStepIndex >= steps.length - 1 ? prevStepIndex : prevStepIndex + 1
    );
  };

  const previous = () => {
    setCurretStepIndex((prevStepIndex) =>
      prevStepIndex <= 0 ? prevStepIndex : prevStepIndex - 1
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    }
  };

  const step = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return {
    step,
    onSubmit,
    previous,
    isFirstStep,
    isLastStep,
  };
};

const UserForm = ({ formState, onFieldChange }) => {
  return (
    <>
      <label htmlFor="userName">User name</label>
      <input
        type="text"
        id="userName"
        name="userName"
        required
        value={formState["userName"] || ""}
        onChange={onFieldChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        required
        value={formState["email"] || ""}
        name="email"
        onChange={onFieldChange}
      />
    </>
  );
};

const MessageForm = ({ formState, onFieldChange }) => {
  return (
    <>
      <label htmlFor="message">Mesage</label>
      <textarea
        id="message"
        value={formState["message"] || ""}
        name="message"
        onChange={onFieldChange}
      />
    </>
  );
};

export const MultiStepsForm = () => {
  const [formState, setFormState] = useState({});

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));

  const { step, onSubmit, previous, isFirstStep, isLastStep } =
    useMultiStepsForm([
      <UserForm formState={formState} onFieldChange={onFieldChange} />,
      <MessageForm formState={formState} onFieldChange={onFieldChange} />,
    ]);
  return (
    <div>
      <form
        onSubmit={(e) => {
          onSubmit(e);
          console.log(formState);
        }}
      >
        {step}
        {isFirstStep ? null : <button onClick={previous}>Previous</button>}
        <button type="submit">{isLastStep ? "Submit" : "Next"}</button>
      </form>
    </div>
  );
};
