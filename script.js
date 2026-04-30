const API_URL = "https://livewatch.top/api/embed?type=tv";

async function loadChannels() {
  const search = document.getElementById("search").value;

  let url = API_URL;
  if (search) {
    url += "&search=" + encodeURIComponent(search);
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById("channels");
    container.innerHTML = "";

    data.forEach(channel => {
      const div = document.createElement("div");
      div.className = "channel";
      div.innerHTML = `
        <p>${channel.name}</p>
      `;

      div.onclick = () => playChannel(channel.id);

      container.appendChild(div);
    });

  } catch (err) {
    console.error("Erreur API:", err);
  }
}

function playChannel(id) {
  const player = document.getElementById("player");

  player.innerHTML = `
    <iframe
      src="https://livewatch.top/player?url=${id}"
      allow="autoplay; fullscreen; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}

// Chargement initial
loadChannels();
