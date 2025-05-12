// Configuración de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para guardar el nuevo polinizador
function savePollinator() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const habitat = document.getElementById('habitat').value;
    const importance = document.getElementById('importance').value;
    const image = document.getElementById('image').files[0];

    if (name && description && habitat && importance && image) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageData = event.target.result;

            db.collection('pollinators').add({
                NamePollinator: name,
                Description: description,
                Habitat: habitat,
                Importance: importance,
                image: imageData
            }).then(() => {
                alert('Pollinator saved successfully!');
                location.href = 'Pollinator.html';
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        };
        reader.readAsDataURL(image);
    } else {
        alert('Please fill out all fields and select an image.');
    }
}
