import React, {Children, cloneElement, isValidElement, useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";

type AccordionProps = {
    children: Array<React.ReactElement<AccordionChildProps>>
    defaultOpen?: boolean
}

type AccordionChildProps = React.PropsWithChildren<{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>

/**
 * Pass state to only 1st level children with cloneElement
 * Should
 */
export const BasicAccordion = ({children, defaultOpen = false}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    return <div>
        {Children.map<React.ReactElement, React.ReactElement<AccordionChildProps>>(children, child => {
            if (!isValidElement(child)) return child;
            return cloneElement(child, {isOpen, setIsOpen})
        })}
    </div>
}

BasicAccordion.Header = ({children, isOpen, setIsOpen}: AccordionChildProps) => {
    return <button onClick={() => setIsOpen(isOpen => !isOpen)}>
        <span>{children}</span>
        {isOpen ? <ChevronDown/> : <ChevronRight/>}
    </button>
}

BasicAccordion.Content = ({children, isOpen}: AccordionChildProps) => {
    return isOpen && <div>{children}</div>
}

export const AccordionExample = () => {
    return <BasicAccordion defaultOpen>
        <BasicAccordion.Header>
            Trigger button
        </BasicAccordion.Header>
        <BasicAccordion.Content>
            <p>Some Content</p>
        </BasicAccordion.Content>
    </BasicAccordion>
}