# Loft del Evento

Recorrido 3D del local del evento, reconstruido a partir del video del lugar. Se camina por la terraza, la fachada, la sala a doble altura, la cocina, la sala de reuniones y el mezzanine, y se dejan notas pegadas en cualquier punto (una mesa, una pared, una puerta). Con Firebase configurado, todo el equipo ve las notas y a los demás caminando en tiempo real.

Es una sola página HTML con [three.js](https://threejs.org) desde CDN: no hay build ni dependencias que instalar.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa: escena 3D, controles y notas |
| `config.js` | Configuración de Firebase (vacía = modo local) |
| `firestore.rules` | Reglas de seguridad de la base de notas |

## 1. Probar en tu computadora

```bash
npx serve .
```

Abre el link que muestra la terminal. También funciona abriendo `index.html` directamente, pero un servidor local evita problemas del navegador.

Sin configurar Firebase la página corre en **modo local**: las notas se guardan solo en tu navegador.

## 2. Publicar en GitHub Pages

1. Crea un repo nuevo en GitHub y sube estos archivos a la rama `main`:
   ```bash
   git init
   git add .
   git commit -m "Recorrido 3D del local"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/loft-del-evento.git
   git push -u origin main
   ```
2. En el repo: **Settings → Pages → Build and deployment**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
3. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/loft-del-evento/`.

## 3. Activar notas compartidas en vivo (Firebase, plan gratuito)

1. Entra a [console.firebase.google.com](https://console.firebase.google.com) y crea un proyecto (puedes desactivar Analytics).
2. **Compilación → Firestore Database → Crear base de datos**. Elige una ubicación cercana (por ejemplo `southamerica-east1`) y modo **producción**.
3. En la pestaña **Reglas** de Firestore, reemplaza todo por el contenido de `firestore.rules` y pulsa **Publicar**.
4. En **Configuración del proyecto → General → Tus apps**, agrega una app **Web** (`</>`). Copia el objeto `firebaseConfig` que te muestra.
5. Pégalo en `config.js`:
   ```js
   window.LOFT_CONFIG = {
     firebase: {
       apiKey: "AIza...",
       authDomain: "tu-proyecto.firebaseapp.com",
       projectId: "tu-proyecto",
       appId: "1:...:web:..."
     }
   };
   ```
6. Haz commit y push. Al recargar, arriba a la izquierda dirá **En vivo**.

### Sobre la seguridad

- La `apiKey` de Firebase es pública por diseño; lo que protege la base son las reglas.
- No hay login: **cualquiera con el link puede leer, dejar y borrar notas**. Comparte el link solo con tu equipo. Si necesitas más control, agrega Firebase Authentication y ajusta las reglas.
- Las reglas solo aceptan notas con la forma que usa la página (texto de hasta 600 caracteres, tipo válido, coordenadas numéricas).

## Cómo se usa

| Acción | Cómo |
|---|---|
| Mirar | Arrastrar con el mouse o el dedo |
| Caminar | `W A S D` o flechas · `Shift` para ir rápido · joystick en celular |
| Saltar a un ambiente | Botones de abajo o tocar el plano |
| Subir al mezzanine | La escalera junto a la cocina |
| Dejar una nota | **+ Nota** (o tecla `N`), tocar el punto, elegir tipo y guardar |
| Ver todas las notas | Botón **Notas**: agrupadas por zona, con respuestas y "Marcar hecho" |
| Vista general | **Vista aérea** (sin techo, arrastrar para girar, rueda para zoom) |

Tipos de nota: **Recordatorio**, **Tarea**, **Idea** y **Ojo aquí**.

## Datos en Firestore

| Colección | Campos |
|---|---|
| `pins` | `x y z` (punto), `nx ny nz` (orientación), `text`, `type`, `zone`, `by`, `byName`, `at`, `done` |
| `replies` | `pin`, `text`, `by`, `byName`, `at` |
| `presence` | `x y z r`, `id`, `name`, `color`, `t` (se borra al cerrar la pestaña) |

## Modificar el local

Toda la geometría está en `buildWorld()` dentro de `index.html`, construida en metros con cajas `B(x0, x1, y0, y1, z0, z1, material)`. El modelo se refleja en el eje X al final, así que en ese bloque la terraza está en `z < 0`, la fachada en `z = 0`, la cocina bajo el mezzanine lateral (`x < -4.5`, que tras el reflejo queda a la izquierda al entrar) y la escalera pegada a la pared de al lado (`z ≈ 9`), subiendo desde la esquina de la cocina. Las zonas de salto rápido están en `JUMPS` y los nombres de zona en `zoneAt()`.
