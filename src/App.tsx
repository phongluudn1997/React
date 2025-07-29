import './App.css'
import {FilteredProductTable} from "./example/product-table/FilteredProducTable.tsx";
import {PRODUCTS} from "./example/product-table/data.tsx";
import {AccordionExample} from "./advanced-patterns/compount-components/accordion.tsx";

function App() {
    return (
        <>
            <FilteredProductTable products={PRODUCTS}/>
            <AccordionExample/>
        </>
    )
}

export default App
