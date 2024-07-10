import { useEffect, useState } from "react";

function App() {
  const [joke, setJoke] = useState("Click the below button to get a joke");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleJoke() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("https://icanhazdadjoke.com/slack");
      const data = await res.json();
      setJoke(data.attachments[0].text);
      setCount((c) => c + 1);
    } catch (e) {
      console.log("Error fetching joke: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleJoke();
  }, []);

  return (
    <div className="container">
      <p className="joke">{joke}</p>
      <button onClick={handleJoke}>
        {loading ? "loading..." : "Get jokes"}
      </button>
      <p className="count">
        You have read <b>{count}</b> {count <= 1 ? "piece" : "pieces"} of jokes
      </p>
    </div>
  );
}

export default App;
