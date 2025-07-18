import {StyledProductName} from "./ProductCategoryRow.tsx";
import type {Product} from "./data.tsx";

export const ProductRow = ({product}: { product: Product }) => {
    const {name, price, stocked} = product;
    return <tr>
        <td>
            <StyledProductName shouldStyled={stocked}>{name}</StyledProductName>
        </td>
        <td>{price}</td>
    </tr>
}