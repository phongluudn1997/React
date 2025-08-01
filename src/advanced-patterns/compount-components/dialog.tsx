import { X } from "lucide-react";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";

export const DialogExample = () => {
  return (
    <Dialog>
      <Trigger>Open Dialog!</Trigger>
      <Container>
        <Header>
          Header
          <DialogCloseButton />
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Container>
    </Dialog>
  );
};

const DialogContext = React.createContext<DialogContextProps | undefined>(
  undefined
);

type DialogContextProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DialogCloseButton = () => {
  const { setIsOpen } = useDialog();
  return (
    <button onClick={() => setIsOpen(false)}>
      <X />
    </button>
  );
};

const Dialog = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = () => {
  const value = useContext(DialogContext);
  if (!value) {
    throw new Error("useDialog hook must be used inside DialogProvider!");
  }
  return value;
};

const Container = ({ children }: React.PropsWithChildren) => {
  const { isOpen } = useDialog();
  return isOpen
    ? createPortal(
        <div className="bg-black fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-white max-w-lg w-3/4 p-8 rounded-xl">
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

const Header = ({ children }: React.PropsWithChildren) => {
  return <div className="flex justify-between items-center">{children}</div>;
};

const Content = ({ children }: React.PropsWithChildren) => {
  return <div className="pt-8 pb-8">{children}</div>;
};

const Footer = ({ children }: React.PropsWithChildren) => {
  return children;
};

const Trigger = ({ children }: React.PropsWithChildren) => {
  const { setIsOpen } = useDialog();

  const handleClick = () => {
    setIsOpen(true);
  };

  return <button onClick={handleClick}>{children}</button>;
};

Dialog.Trigger = Trigger;
Dialog.Container = Container;
Dialog.Header = Header;
Dialog.Content = Content;
Dialog.Footer = Footer;
