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

// Función para sincronizar la lista de polinizadores
function syncPollinators() {
    const pollinatorList = document.getElementById('pollinator-list');
    pollinatorList.innerHTML = ''; // Limpiar la lista

    db.collection('pollinators').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const pollinator = doc.data();
            const pollinatorItem = document.createElement('div');
            pollinatorItem.className = 'pollinator-item';

            const thumbnail = document.createElement('img');
            thumbnail.src = pollinator.image;
            thumbnail.alt = pollinator.NamePollinator;

            const details = document.createElement('div');
            details.className = 'details';
            const name = document.createElement('h3');
            name.textContent = pollinator.NamePollinator;
            const description = document.createElement('p');
            description.textContent = pollinator.Description;

            details.appendChild(name);
            details.appendChild(description);

            const arrow = document.createElement('img');
            arrow.src = 'Imagenes/arrow.png';
            arrow.alt = 'Detalles';
            arrow.className = 'arrow';
            arrow.onclick = () => {
                location.href = `detailsPollinator.html?id=${doc.id}`;
            };

            pollinatorItem.appendChild(thumbnail);
            pollinatorItem.appendChild(details);
            pollinatorItem.appendChild(arrow);

            pollinatorList.appendChild(pollinatorItem);
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

// Sincronizar la lista al cargar la página
window.onload = syncPollinators;
