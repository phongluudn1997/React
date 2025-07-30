import './App.css'
import {FilteredProductTable} from "./example/product-table/FilteredProducTable.tsx";
import {PRODUCTS} from "./example/product-table/data.tsx";

function App() {
    return (
        <>
            <FilteredProductTable products={PRODUCTS}/>
        </>
    )
}

export default App
