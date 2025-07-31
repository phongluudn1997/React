import {useState} from "react";
import {ProductTable} from "./ProductTable.tsx";
import {SearchBar} from "./SearchBar.tsx";
import type {Product} from "./data.tsx";

export const FilteredProductTable = ({products}: { products: Product[] }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [inStocked, setInStocked] = useState(false)

    return <>
        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            inStocked={inStocked}
            setInStocked={setInStocked}
        />
        <ProductTable
            products={products
                .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(product => inStocked ? product.stocked : true)
            }/>
    </>
}

function customReduce = (array: Array<any>) => {

}