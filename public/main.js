const submit = document.getElementById('submit');

function uploadImage() {
  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];
    
  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const base64String = e.target.result;
        console.log('uploading')
          fetch('/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64String })
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              renderDexEntry(data)
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      };

      reader.readAsDataURL(file);
  } else {
      console.log("No file selected");
  }
}

submit.addEventListener('click', uploadImage);

function renderDexEntry (data) {
    const dexList = document.getElementById('dex-list')
    const dexEntry = document.createElement('article');
    dexList.appendChild(dexEntry);
    dexEntry.classList.add('dex-entry');

    dexEntry.innerHTML = `
    <h2 class="main-name">${data.name}</h2>
    <h3 class="sci-name">${data.sciName}</h3>
    <section class="typing">
      <h4>Types:</h4>
      <p class="type ${data.typing[0]}">${data.typing[0]}</p>
      <p class="type ${data.typing[1]}">${data.typing[1]}</p>
    </section>
    <section class="physical">
      <h4>Phyiscal Characteristics:</h4>
      <p class="height">${data.height.imperial}</p>
      <p class="weight">${data.weight.imperial}</p>
    </section>
    <section class="environment">
      <h4>Environment:</h4>
      <p class="region">${data.region}</p>
      <p class="habitat">${data.habitat}</p>
    </section>
    <section class="desc-container">
      <h4>Description:</h4>
      <p class="description">${data.description}</p>
    </section>
    `
}
