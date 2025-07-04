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

Tracking element visibiliy
External system: browser DOM.
```tsx
function useIntersectionObserver(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false)
    useEffect(() => {
        const div = ref.current
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0];
            setIsIntersecting(entry.intersecting)
        }, {
            threshold: 1.0
        });
        observer.observe(div);
        return () => observer.disconnect()
    }, [ref])
}
```

Fetch data with useEffect
```tsx
function Page() {
    const [person, setPerson] = useState("Alice");
    const [bio, setBio] = useState()

    useEffect(() => {
        // race condition
        let ignore = false
        async function startFetching() {
            const result = await fetchBio(person);
            if (!ignore) {
                setBio(result)
            }
        }
        startFetching()
        return () => {
            ignore = true
        }
    }, [person])

    return (
        <select value="Alice" onChange={event => setPerson(event.target.value)}>
            <option value="Alice">Alice</option>
            <option value="Bob">Alice</option>
            <option value="Taylor">Alice</option>
        </select>
    )
}
```
Pitfalls of data fetching in Effects
* Effects don't run on the server: Client computer will have to download Javascript only to dicover that now it needs to load data.
* Network waterfalls: Parent component fetch data, redern child components - start fetching their own data. If network is not very fast, this is significantly slower than fetching all data in parallel.
* No preload or cache data: If component unmounts and then mounts again, data is fetching again
* No ergonoic: A lot of boilerplate to handle bugs like race conditions.
Solution:
* Use React framework
* Client-side cache: React Query, useSWR, React Router