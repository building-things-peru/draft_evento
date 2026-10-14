// Configuración del recorrido.
//
// Sin Firebase (firebase: null) la página funciona en "modo local":
// cada persona ve solo las notas que guardó en su propio navegador.
//
// Para que todo el equipo vea las notas en vivo, pega aquí la
// configuración de tu app web de Firebase (ver README, paso 3).
// Estos valores son públicos por diseño: lo que protege la base
// son las reglas de firestore.rules.

window.LOFT_CONFIG = {
  firebase: null

  // firebase: {
  //   apiKey: "AIza...",
  //   authDomain: "tu-proyecto.firebaseapp.com",
  //   projectId: "tu-proyecto",
  //   appId: "1:000000000000:web:xxxxxxxxxxxx"
  // }
};
