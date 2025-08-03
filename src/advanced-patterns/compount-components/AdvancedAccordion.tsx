import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useState,
} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const AdvancedAccordionContext = createContext<
  | {
      isOpen: (key: number) => boolean;
      toggleItem: (key: number) => void;
    }
  | undefined
>(undefined);

type AdvancedAccordionProps = React.PropsWithChildren<{
  defaultOpen?: boolean;
}>;

type AdvancedAccordionItemProps = React.PropsWithChildren<{ index: number }>;

const useAccordionContext = () => {
  const context = useContext(AdvancedAccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within an AdvancedAccordion"
    );
  }
  return context;
};

const AdvancedAccordion = ({
  children,
  defaultOpen = false,
}: AdvancedAccordionProps) => {
  const [openItems, setOpenItems] = useState(defaultOpen ? [0] : []);
  const toggleItem = (index: number) => {
    setOpenItems((openItems) =>
      openItems.includes(index)
        ? openItems.filter((item) => index === item)
        : [...openItems, key]
    );
  };
  const isOpen = (index: number) => {
    return openItems.includes(index);
  };
  return (
    <AdvancedAccordionContext.Provider value={{ isOpen, toggleItem }}>
      {Children.map(children, (child, index) =>
        cloneElement(child, { key: index, index })
      )}
    </AdvancedAccordionContext.Provider>
  );
};

const AdvancedAccordionItem = ({
  children,
  index,
}: AdvancedAccordionItemProps) => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }
    return cloneElement(child, { index });
  });
};

const AdvancedAccordionHeader = ({
  children,
  index,
}: AdvancedAccordionItemProps) => {
  const { isOpen, toggleItem } = useAccordionContext();
  return (
    <button onClick={() => toggleItem(index)}>
      <span>{children}</span>
      {isOpen(index) ? <ChevronDown /> : <ChevronRight />}
    </button>
  );
};

const AdvancedAccordionContent = ({
  children,
  index,
}: AdvancedAccordionItemProps) => {
  const { isOpen } = useAccordionContext();
  return isOpen(index) && children;
};

AdvancedAccordion.Item = AdvancedAccordionItem;
AdvancedAccordion.Header = AdvancedAccordionHeader;
AdvancedAccordion.Content = AdvancedAccordionContent;

// API
export const AdvancedAccordionExample = () => {
  return (
    <>
      <AdvancedAccordion>
        <AdvancedAccordion.Item>
          <AdvancedAccordion.Header>Header trigger</AdvancedAccordion.Header>
          <AdvancedAccordion.Content>
            <p>Some Content</p>
          </AdvancedAccordion.Content>
        </AdvancedAccordion.Item>

        <AdvancedAccordion.Item>
          <AdvancedAccordion.Header>Header trigger</AdvancedAccordion.Header>
          <AdvancedAccordion.Content>
            <p>Some Content 2</p>
          </AdvancedAccordion.Content>
        </AdvancedAccordion.Item>
      </AdvancedAccordion>
    </>
  );
};
