const chatArea = document.getElementById('chat');
const chatModal = document.getElementById('chat-modal');

const chat = new Typewriter (chatArea, {
  delay: 50,
  cursor: '',
})

const chatModal2 = document.getElementById('chat-modal-2');
const chat2Area = document.getElementById('chat-2');

const chat2 = new Typewriter (chat2Area, {
  delay: 50,
  cursor: '',

})

const strings = {
  start: 'Hello and welcome to WebDex! Here, you can send photos of all kinds of creatures you come across and get useful information.',
  choice: 'How would you like to send a photo?',
  upload: 'Great! Upload the photo of your animal here',
  photo: 'Make sure to get a good photo!'
}

chat
  .start()
  .typeString(strings['start'])
  .pauseFor(2000)
  .deleteAll(1)
  .callFunction(showInit)
  .pauseFor(1000)
  .typeString(strings['choice'])

function showInit () {
  const chatModal = document.getElementById('chat-modal')
  chatModal.style.bottom = 'var(--screen-edge-gap)';
  setTimeout(() => {
    const initModal = document.getElementById('init-modal')
    initModal.style.display = 'flex'
  }, 1000);
}

const photoBtn = document.getElementById('photo');

photoBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
  chatModal2.style.display = 'block'
  chat2
    .start()
    .typeString(strings['photo'])

  const initModal = document.getElementById('init-modal')
  initModal.style.display = 'none';

  const video = document.getElementById('video');
  
  const photoModal = document.getElementById('photo-modal')
  photoModal.style.display = 'flex';

  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
          video.srcObject = stream;
      })
      .catch(console.error);
})

const uploadBtn = document.getElementById('upload');

uploadBtn.addEventListener('click', () => {
  chatModal.style.display = 'none';
  chatModal2.style.display = 'block'
  chat2
    .start()
    .typeString(strings['upload'])
  
  const initModal = document.getElementById('init-modal')
  initModal.style.display = 'none';

  const uploadModal = document.getElementById('upload-modal')
  uploadModal.style.display = 'flex';


})


function resetPage() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('photo-loading').style.display = 'none';

  document.getElementById('init-modal').style.display = 'flex';

  document.getElementById('chat-modal').style.display = 'block';
  document.getElementById('chat-modal-2').style.display = 'none';

  document.getElementById('photo-modal').style.display = 'none';
  document.getElementById('upload-modal').style.display = 'none';
  document.getElementById('dex-modal').style.display = 'none';

  document.getElementById('dex-list').innerHTML = `
  <div id="retry-outer" class="out-layer" onclick="resetPage()" >
    <div class="mid-layer">
      <div class="final-layer">
        <section id="retry">
          RETRY?
        </section>
      </div>
    </div>
  </div>
`
}