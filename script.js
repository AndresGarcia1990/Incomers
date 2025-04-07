// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBk038Zx83YW4ciSfkJA7COa3inBC_tATY",
    authDomain: "incomers-bee7d.firebaseapp.com",
    projectId: "incomers-bee7d",
    storageBucket: "incomers-bee7d.firebasestorage.app",
    messagingSenderId: "821388332213",
    appId: "1:821388332213:web:0170ab2584f136fa5682fc",
    measurementId: "G-88PT3PBF1N"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Función para obtener y mostrar los polinizadores
function getPollinators() {
    db.collection("pollinator").get().then((querySnapshot) => {
        const pollinatorList = document.getElementById("pollinator-list");
        querySnapshot.forEach((doc) => {
            const pollinator = doc.data();
            const pollinatorItem = document.createElement("div");
            pollinatorItem.textContent = `${pollinator.name}: ${pollinator.description}`;
            pollinatorList.appendChild(pollinatorItem);
        });
    });
}

// Llamar a la función para obtener los polinizadores al cargar la página
window.onload = getPollinators;

// Función para subir una foto
document.getElementById("upload-button").addEventListener("click", () => {
    const file = document.getElementById("photo-upload").files[0];
    if (file) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`images/${file.name}`).put(file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Progreso de la subida
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                // Manejo de errores
                console.error('Upload failed:', error);
            }, 
            () => {
                // Subida completada
                console.log('Upload successful!');
            }
        );
    } else {
        alert("Please select a file to upload.");
    }
});
