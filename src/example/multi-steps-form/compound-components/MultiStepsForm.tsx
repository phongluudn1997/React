import {
  Children,
  cloneElement,
  isValidElement,
  type ChangeEvent,
  type FormEvent,
  type PropsWithChildren,
} from "react";
import {
  MultiStepsFormProvider,
  useMultiStepsForm,
} from "./MultiStepsFormProvider";

interface SingleStepFormProps {
  step: number;
}

export const MultiStepsForm = ({
  children,
  onSubmit,
}: PropsWithChildren<{
  onSubmit: (formState: Record<string, string>) => void;
}>) => {
  const { formState } = useMultiStepsForm();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
  };
  return (
    <form onSubmit={handleSubmit}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        return cloneElement<SingleStepFormProps>(child, {
          key: index,
          step: index,
        });
      })}
    </form>
  );
};

const Step = ({
  children,
  step,
}: React.PropsWithChildren<{ step: number }>) => {
  const { currentStep } = useMultiStepsForm();
  return currentStep === step ? (
    <div>
      <h3>Current step: {currentStep}</h3>
      {children}
    </div>
  ) : null;
};

const NavigateButton = ({
  children,
  type,
}: PropsWithChildren<{ type: "next" | "previous" }>) => {
  const { setCurrentStep, currentStep } = useMultiStepsForm();

  const handleClick = () => {
    setCurrentStep((step) => (type === "next" ? step + 1 : step - 1));
  };

  return (
    <button
      disabled={
        (type === "previous" && currentStep === 0) ||
        (type === "next" && currentStep === 1)
      }
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

interface InputProps {
  name: string;
  validation?: {
    message: string;
    handler: (value: string) => boolean;
  };
}

const Input = ({ name, validation }: InputProps) => {
  const { formState, errorState, setFormState, setErrorState } =
    useMultiStepsForm();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((formState) => ({
      ...formState,
      [name]: event.target.value,
    }));
    if (validation) {
      const pass = validation.handler(event.target.value);
      setErrorState((errorState) => ({
        ...errorState,
        [name]: pass ? "" : validation.message,
      }));
    }
  };

  return (
    <label>
      {name}:
      <input
        type="text"
        value={formState[name] || ""}
        name={name}
        onChange={handleChange}
      />
      {errorState[name]}
    </label>
  );
};

const SubmitButton = ({ children }: PropsWithChildren) => {
  return <button type="submit">{children}</button>;
};

MultiStepsForm.Step = Step;
MultiStepsForm.Input = Input;
MultiStepsForm.NavigationButton = NavigateButton;
MultiStepsForm.SubmitButton = SubmitButton;

export const MultiStepsFormExample = () => {
  return (
    <MultiStepsFormProvider>
      <MultiStepsForm
        onSubmit={(formState) => {
          console.log(formState);
        }}
      >
        <Step>
          <Input name="username" />
          <br />
          <Input
            name="email"
            validation={{
              handler: (value) => /\S+@\S+\.\S+/.test(value),
              message: "Email must match the pattern",
            }}
          />
        </Step>
        <Step>
          <Input name="message" />
        </Step>
        <NavigateButton type="previous">Previous</NavigateButton>
        <NavigateButton type="next">Next</NavigateButton>
        <SubmitButton>Submit</SubmitButton>
      </MultiStepsForm>
    </MultiStepsFormProvider>
  );
};
