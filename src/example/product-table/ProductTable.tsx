import type {Product} from "./data.tsx";
import {ProductCategoryRow} from "./ProductCategoryRow.tsx";
import {ProductRow} from "./ProductRow.tsx";

export const ProductTable = ({products}: { products: Product[] }) => {
    const productsByCategoryMap = products.reduce((acc, product) => {
        const categoryProducts = acc.get(product.category);
        if (!categoryProducts) {
            acc.set(product.category, [product]);
        } else {
            categoryProducts.push(product)
        }
        return acc
    }, new Map<string, Product[]>())


    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {Array.from(productsByCategoryMap).map(([category, products]) => {
            return <>
                <ProductCategoryRow category={category} key={category}/>
                {products.map(product => <ProductRow key={product.name} product={product}/>)}
            </>
        })}
        </tbody>
    </table>
}