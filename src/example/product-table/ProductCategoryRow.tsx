import * as React from "react";

export const ProductCategoryRow = ({category}: { category: string }) => {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    )
}

export const StyledProductName = ({children, shouldStyled}: { children: React.ReactNode, shouldStyled: boolean }) => {
    return shouldStyled ? <span style={{color: "red"}}>{children}</span> : children
}