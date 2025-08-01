import React, {useState} from "react";

/**
 * 1. Move state down
 * 2. Lift content up
 */
const ColorPicker = ({children}: React.PropsWithChildren) => {
    const [color, setColor] = useState("red")
    return <div style={{color}}>
        <input type="text" value={color} onChange={(event) => setColor(event.target.value)}/>
        {children}
    </div>
}

export const CompositionExample = () => {
    return <ColorPicker>
        <p>Hello World</p>
        <ExpensiveComponent/>
    </ColorPicker>
}

const ExpensiveComponent = () => {
    console.log("RENDER")
    return <div>Expensive Component</div>
}