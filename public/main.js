const submit = document.getElementById('submit');

function uploadImage() {
  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];
    
  if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
          const base64String = e.target.result;

          fetch('/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64String })
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
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
    const dexEntry = document.getElementById('')
}
