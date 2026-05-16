# inspira

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Guardar el formulario en Google Sheets (Apps Script)

Este proyecto envía el formulario (componente `FormularioSection.vue`) a un **Google Apps Script** publicado como **Web App**, que luego escribe una fila en Google Sheets.

### 1) Crear la hoja en Google Sheets

- Crea una hoja (por ejemplo: **Inspira Leads**) y dentro una pestaña/Sheet llamada `Leads` (puedes cambiar el nombre en el script).
- En la hoja ve a **Extensiones → Apps Script**.

### 2) Pegar el script

En el editor de Apps Script, pega esto (reemplaza `SPREADSHEET_ID` y `Leads` si corresponde):

```js
// ID del documento (está en la URL de Google Sheets):
// https://docs.google.com/spreadsheets/d/<ESTE_ES_EL_ID>/edit#gid=0
const SPREADSHEET_ID = "PON_AQUI_EL_ID_DE_TU_SHEET";

const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    const p = e && e.parameter ? e.parameter : {};
    const row = [
      new Date(),
      p.nombre || "",
      p.correo || "",
      p.telefono || "",
      p.servicio || "",
      p.descripcion || "",
      p.page || "",
      p.sentAt || "",
    ];

    // Encabezados (solo si la hoja está vacía)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "createdAt",
        "nombre",
        "correo",
        "telefono",
        "servicio",
        "descripcion",
        "page",
        "sentAt",
      ]);
    }

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Importante:

- Después de pegar el script y poner `SPREADSHEET_ID`, ve a **Deploy → Manage deployments → Edit (lapicito) → Deploy** para que el `/exec` use el código nuevo.

### 3) Desplegar como Web App

- Click en **Deploy → New deployment**
- Tipo: **Web app**
- **Execute as:** _Me_
- **Who has access:** _Anyone_ (o “Anyone with the link” si te aparece)
- Copia la URL que termina en `/exec`

### 4) Configurar la URL en Vite

Crea un archivo `.env.local` en la raíz (no se commitea) y pega:

```env
VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

Puedes usar `.env.example` como referencia.

Notas:

- El frontend usa `fetch(..., { mode: 'no-cors' })` para evitar problemas de CORS con Apps Script; por eso el navegador no puede leer la respuesta, pero el POST se envía.
- Si vas a publicar el sitio, considera agregar mitigación de spam (por ejemplo reCAPTCHA o un backend intermedio), porque una Web App pública puede recibir envíos automáticos.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
