import type {Dispatch, SetStateAction} from "react";

export const SearchBar = (props: {
    searchTerm: string,
    setSearchTerm: Dispatch<SetStateAction<string>>,
    inStocked: boolean,
    setInStocked: Dispatch<SetStateAction<boolean>>
}) => {
    return <form>
        <input type="text" value={props.searchTerm} onChange={e => props.setSearchTerm(e.target.value)}/>
        <label>
            <input type="checkbox" checked={props.inStocked} onChange={e => props.setInStocked(e.target.checked)}/>
            Only show products in stock
        </label>
    </form>
}