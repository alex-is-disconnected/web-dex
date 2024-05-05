const chatArea = document.getElementById("chat");
const chatModal = document.getElementById("chat-modal");

const chat = new Typewriter(chatArea, {
  delay: 50,
  cursor: "",
});

const chatModal2 = document.getElementById("chat-modal-2");
const chat2Area = document.getElementById("chat-2");

const chat2 = new Typewriter(chat2Area, {
  delay: 50,
  cursor: "",
});

const strings = {
  start:
    "Hello and welcome to WebDex! Here, you can send photos of all kinds of creatures you come across and get useful information!",
  choice: "How would you like to send a photo?",
  upload: "Great! Upload the photo of your animal here",
  photo: "Make sure to get a good photo!",
};

chat
  .start()
  .typeString(strings["start"])
  .pauseFor(2000)
  .deleteAll(1)
  .callFunction(showInit)
  .pauseFor(1000)
  .typeString(strings["choice"]);

function showInit() {
  const chatModal = document.getElementById("chat-modal");
  chatModal.style.bottom = "var(--screen-edge-gap)";
  setTimeout(() => {
    const initModal = document.getElementById("init-modal");
    initModal.style.display = "flex";
  }, 1000);
}

const photoBtn = document.getElementById("photo");

photoBtn.addEventListener("click", () => {
  chatModal.style.display = "none";
  chatModal2.style.display = "block";
  chat2.start().typeString(strings["photo"]);

  const initModal = document.getElementById("init-modal");
  initModal.style.display = "none";

  const photoModal = document.getElementById("photo-modal");
  photoModal.style.display = "flex";

  initCamera();
});

let stream;
let frontFacing = true;

async function initCamera() {
  try {
    // Accessing user media (camera) with or without facingMode
    const constraints = {
      video: {
        facingMode: frontFacing ? "user" : "environment",
      },
    };
    stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Displaying the camera feed on canvas
    video.srcObject = stream;
  } catch (err) {
    // Handle OverconstrainedError
    if (
      err.name === "OverconstrainedError" ||
      err.name === "ConstraintNotSatisfiedError"
    ) {
      console.warn(
        "Camera facing mode constraint not supported, falling back to default."
      );
      // Retry without facingMode constraint
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } else {
      console.error("Error accessing camera:", err);
    }
  }
}

const cameraSwitch = document.getElementById("camera-switch");
cameraSwitch.addEventListener("click", switchCamera);

function switchCamera() {
  // Stopping the current stream
  stream.getTracks().forEach((track) => track.stop());

  // Toggle between front and back facing
  frontFacing = !frontFacing;

  // Reinitialize the camera with the new facing mode
  initCamera();
}

const uploadBtn = document.getElementById("upload");

uploadBtn.addEventListener("click", () => {
  chatModal.style.display = "none";
  chatModal2.style.display = "block";
  chat2.start().typeString(strings["upload"]);

  const initModal = document.getElementById("init-modal");
  initModal.style.display = "none";

  const uploadModal = document.getElementById("upload-modal");
  uploadModal.style.display = "flex";
});

function _resetPage() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("photo-loading").style.display = "none";

  document.getElementById("init-modal").style.display = "flex";

  document.getElementById("chat-modal").style.display = "block";
  document.getElementById("chat-modal-2").style.display = "none";

  document.getElementById("photo-modal").style.display = "none";
  document.getElementById("upload-modal").style.display = "none";
  document.getElementById("dex-modal").style.display = "none";

  document.getElementById("dex-list").innerHTML = `
  <div id="retry-outer" class="out-layer" onclick="resetPage()" >
    <div class="mid-layer">
      <div class="final-layer">
        <section id="retry">
          RETRY?
        </section>
      </div>
    </div>
  </div>
`;
}
