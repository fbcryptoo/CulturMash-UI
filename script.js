
document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.getElementById("generateBtn");
  const status = document.getElementById("status");
  const img = document.getElementById("memeImage");
  const download = document.getElementById("downloadBtn");

  generateBtn.addEventListener("click", async () => {
    const icon1 = document.getElementById("icon1").value;
    const icon2 = document.getElementById("icon2").value;
    const vibe = document.getElementById("vibe").value;

    status.textContent = "🔄 Generating image... (not connected yet)";
    img.style.display = "none";
    download.style.display = "none";
  });
});
