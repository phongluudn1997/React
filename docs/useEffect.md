# useEffect
An Effect lets you keep your component synchronized with some external systems (like a chat service). Here, external systems means any piece of code that's not controlled by React, such as:
* A timer managed with `setInterval()` and `clearInterval()`.
* An event subscription using `window.addEventListener()` and `window.removeEventListener()`.
* A third-party animation library with an API like `animation.start()` and `animation.reset()`.

### Example
Connecting to a chat server
```tsx
function useChatRoom({serverUrl, roomId}) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => {
            connection.disconnect();
        }
    }, [serverUrl, roomId])
}
function ChatRoom({roomId}) {
    const [serverUrl, setServerUrl] = useState("https://localhost:1234")
    useChatRoom({serverUrl, roomId})
}

function App() {
    const [roomId, setRoomId] = useState("general")
    const [show, setShow] = useState(false)
    const handleChange = (event) => setRoomId(event.target.value)
    const handleClick = () => setShow(prevShow => !prevShow)
    return(
        <label>
            Choose the chat room
            <select value={roomId} onChange={handleChange}>
                <option value="general">general<option/>
                <option value="travel">travel<option/>
                <option value="music">music<option/>
            </select>
        </label>
        <button onClick={handleClick}>show</button>
        {show ? <ChatRoom roomId={roomId} />}
    )
}
```