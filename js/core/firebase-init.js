/**
 * firebase-init.js
 * NOTA: Para conectar Firebase, reemplaza los valores de firebaseConfig
 * con los de tu proyecto en https://console.firebase.google.com
 * Si NO configuras Firebase, el sitio usa los datos locales (products.data.js)
 */
window.JYC_Firebase = {
  db: null,
  isConfigured: false,
  init() {
    const firebaseConfig = {
      apiKey:            "TU_API_KEY",
      authDomain:        "TU_PROYECTO.firebaseapp.com",
      projectId:         "TU_PROYECTO_ID",
      storageBucket:     "TU_PROYECTO.appspot.com",
      messagingSenderId: "TU_SENDER_ID",
      appId:             "TU_APP_ID"
    };
    if (firebaseConfig.apiKey === "TU_API_KEY") {
      console.info('[J&C] Firebase no configurado — usando datos locales.');
      return;
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      this.isConfigured = true;
      console.info('[J&C] Firebase conectado.');
    } catch (err) {
      console.warn('[J&C] Error Firebase, usando datos locales.', err);
    }
  }
};
window.JYC_Firebase.init();
