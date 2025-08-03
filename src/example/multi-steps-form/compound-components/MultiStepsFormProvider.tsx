import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type Dispatch,
  type EventHandler,
  type FormEvent,
  type FormEventHandler,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

const MultiStepsFormContext = createContext<
  | {
      currentStep: number;
      setCurrentStep: Dispatch<SetStateAction<number>>;
      formState: Record<string, string>;
      setFormState: Dispatch<SetStateAction<Record<string, string>>>;
      errorState: Record<string, string>;
      setErrorState: Dispatch<SetStateAction<Record<string, string>>>;
    }
  | undefined
>(undefined);

export const MultiStepsFormProvider = ({ children }: PropsWithChildren) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({});
  const [errorState, setErrorState] = useState({});

  return (
    <MultiStepsFormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        setFormState,
        formState,
        setErrorState,
        errorState,
      }}
    >
      {children}
    </MultiStepsFormContext.Provider>
  );
};

export const useMultiStepsForm = () => {
  const value = useContext(MultiStepsFormContext);
  if (!value) {
    throw new Error("Should only be used in side Provider");
  }
  return value;
};
