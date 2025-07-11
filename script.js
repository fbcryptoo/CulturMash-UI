document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");
  const status = document.getElementById("status");
  const img = document.getElementById("memeImage");
  const download = document.getElementById("downloadBtn");

  generateBtn.addEventListener("click", async () => {
    const icon1 = document.getElementById("icon1").value;
    const icon2 = document.getElementById("icon2").value;
    const vibe = document.getElementById("vibe").value;

    // Reset image and download
    img.style.display = "none";
    download.style.display = "none";
    status.textContent = "🎨 Generating meme... please wait 10–20 seconds.";

    try {
      const response = await fetch("https://cultur-mash-backend.vercel.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ icon1, icon2, vibe })
      });

      if (!response.ok) {
        throw new Error("Image generation failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      img.src = url;
      img.style.display = "block";
      download.href = url;
      download.style.display = "inline-block";
      status.textContent = "✅ Meme generated!";
    } catch (err) {
      console.error("Error generating meme:", err);
      status.textContent = "❌ Failed to generate meme. Try again.";
    }
  });
});
