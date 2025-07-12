import { useState } from "react";

export default function Home() {
  const [icon1, setIcon1] = useState("");
  const [icon2, setIcon2] = useState("");
  const [vibe, setVibe] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleGenerate = async () => {
    setStatus("🎨 Generating meme... please wait 10–20 seconds.");
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ icon1, icon2, vibe })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("❌ Error:", err);
        setStatus("❌ Failed to generate meme. Try again.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      setStatus("✅ Meme generated!");
    } catch (err) {
      console.error("❌ Exception:", err);
      setStatus("❌ Error generating meme.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: "2rem" }}>🎭 CultureMash Generator</h1>

      <div style={{ marginTop: "2rem" }}>
        <input placeholder="Icon 1" value={icon1} onChange={(e) => setIcon1(e.target.value)} />
        <input placeholder="Icon 2" value={icon2} onChange={(e) => setIcon2(e.target.value)} />
        <input placeholder="Vibe / Setting" value={vibe} onChange={(e) => setVibe(e.target.value)} />
      </div>

      <button style={{ marginTop: "1rem", padding: "0.5rem 1rem" }} onClick={handleGenerate}>
        🚀 Generate CultureMash
      </button>

      <div style={{ marginTop: "1rem" }}>{status}</div>

      {imageUrl && (
        <div style={{ marginTop: "2rem" }}>
          <img src={imageUrl} alt="Generated meme" style={{ maxWidth: "100%", border: "2px solid #ccc" }} />
          <br />
          <a href={imageUrl} download="culturemash.png">
            ⬇️ Download
          </a>
        </div>
      )}
    </div>
  );
}
