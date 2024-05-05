const submit = document.getElementById("submit");
const fileInput = document.getElementById("image-input");
const loading = document.getElementById("loading");
const photoLoading = document.getElementById("photo-loading");
const video = document.getElementById("video");

const canvas = document.createElement("canvas");

document.getElementById("capture").addEventListener("click", cameraSubmit);

function cameraSubmit() {
  photoLoading.style.display = "flex";
  const context = canvas.getContext("2d");
  canvas.width = 640;
  canvas.height = 480;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const base64Image = canvas.toDataURL("image/jpeg");

  sendToAPI(base64Image);
  stopVideoStream(video);
}

function stopVideoStream(videoElement) {
  const stream = videoElement.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  videoElement.srcObject = null;
}

function uploadImage() {
  const file = fileInput.files[0];
  loading.style.display = "flex";
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64String = e.target.result;
      sendToAPI(base64String);
    };

    reader.readAsDataURL(file);
  } else {
    console.log("No file selected");
  }
}

function sendToAPI(base64String) {
  console.log("uploading");
  fetch("/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64String }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      renderDexEntry(data, base64String);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

submit.addEventListener("click", uploadImage);
fileInput.addEventListener("change", uploadImage);
function renderDexEntry(data, userImage) {
  const dexList = document.getElementById("dex-list");
  const dexEntry = document.createElement("article");
  const dexModal = document.getElementById("dex-modal");
  dexList.appendChild(dexEntry);
  dexEntry.classList.add("dex-entry");
  if (data.success === true) {
    dexEntry.innerHTML = `
    <div class="out-layer">
            <div class="mid-layer">
              <div class="final-layer">
                <div class="dex-upper final-layer">
                <div class="dex-image"><figure><img src="${userImage}"></figure></div>
                <div class="dex-info">
                  <h2 class="main-name">${data.name}</h2>
                  <h2 class="sci-name">${data.sciName}</h2>
                  <section class="typing">
                    <figure class="type"><img src="assets/types/${data.typing[0].toLowerCase()}.png"></figure>
                    <figure class="type"><img src="assets/types/${data.typing[1].toLowerCase()}.png"></figure>
                  </section>
                  <section class="physical">
                    <h2 class="height">HEIGHT: ${data.height.imperial}</h2>
                    <h2 class="weight">WEIGHT: ${data.weight.imperial}</h2>
                  </section>
                  <section class="environment">
                    <h2 class="region">REGION: ${data.region}</h2>
                    <h2 class="habitat">HABITAT: ${data.habitat}</h2>
                  </section>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="out-layer">
            <div class="mid-layer">
              <div class="dex-lower final-layer">
                <section class="desc-container">
                  <p class="description">${data.description}</p>
                </section>
              </div>
            </div>
          </div>
    `;
  } else {
    dexEntry.innerHTML = `
      <div class="out-layer">
        <div class="mid-layer">
          <div class="final-layer">
            <div class="dex-error">
              Oh no, it seems there was a problem analyzing your photo! <br>
              Remember that you can only take photos of animals or objects and not other trainers!
            </div>
          </div>
        </div>
      </div>`;
  }
  dexModal.style.display = "flex";
}
