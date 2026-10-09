# Vivelhoy Propiedades

Página web de **Clarisa Candia**, corredora de propiedades. Venta, arriendo y administración de arriendos en Santiago.

**Página en línea:** https://vivelhoy.cl/
**Guía de marca (logo, colores, tipografías):** https://vivelhoy.cl/marca.html

Para verla en el computador sin internet, haz doble clic en `index.html` o en `Abrir pagina.html`. No hay que instalar nada. Lo único que necesita internet es el botón de WhatsApp.

## Qué tiene

- **Arriendos y ventas por separado.** Cada propiedad muestra su estado: *Disponible*, *Arrendada* o *Vendida*.
- **Ficha completa para las disponibles**: precio, dormitorios, baños, metros, características, galería de fotos y un botón para agendar visita por WhatsApp con el mensaje ya escrito.
- **Servicios para propietarios**: venta, arriendo y administración de arriendos, con sus honorarios.
- **Sobre Clarisa**, **preguntas frecuentes** y **contacto** con un formulario que arma el mensaje de WhatsApp.
- Botón fijo de WhatsApp, versión para celular, animaciones suaves (se desactivan si el teléfono lo pide) y tipografías incluidas en la carpeta.

## Cómo agregar, cambiar o cerrar una propiedad

Todo está en un solo archivo: **`js/propiedades.js`**. La página se arma sola a partir de esa lista.

**Cerrar una propiedad** (se arrendó o se vendió): busca su bloque y cambia
`estado: "disponible"` por `estado: "arrendada"` o `estado: "vendida"`. Pasa sola a la lista de cerradas.

**Agregar una propiedad nueva:**

1. Prepara las fotos. Lo más fácil es usar la herramienta incluida, desde la carpeta de la página:
   ```bash
   python3 herramientas/preparar_fotos.py ~/Downloads/fotos-casa-macul casa-macul
   ```
   Achica las fotos, las endereza, las guarda en `assets/img/propiedades/casa-macul/` y te imprime el bloque `fotos` para pegar.
   Si no puedes usarla, copia tus fotos JPG (idealmente de menos de 2 MB) a esa carpeta y escribe el nombre con extensión, por ejemplo `archivo: "01-fachada.jpg"`.
2. En `js/propiedades.js`, copia el bloque completo de una propiedad (desde `{` hasta `},`), pégalo al principio de la lista y cambia los datos: `id`, `operacion`, `estado`, `tipo`, `titulo`, `comuna`, `precio`, `datos`, `caracteristicas`, `descripcion`, `carpeta` y `fotos`.
3. Abre `index.html` para revisar que se vea bien.

Los datos que no tengas se pueden borrar: la ficha muestra solo lo que esté escrito. Si no hay precio, aparece «Precio a consultar».

## Publicar los cambios

La página se publica con GitHub Pages desde la rama `main`, con el dominio `vivelhoy.cl` (comprado en NIC Chile, DNS en Cloudflare con 4 registros A a GitHub y `www` como CNAME a `garbanzo96.github.io`, todos en «Solo DNS»). Cada cambio que se sube al repositorio aparece en línea en uno o dos minutos.

- Desde el computador: `git add -A && git commit -m "Nueva propiedad en Macul" && git push`
- Desde el navegador: en GitHub, botón **Add file → Upload files** para subir fotos, y el lápiz ✏️ para editar `js/propiedades.js`.

## Enlaces útiles para compartir

- **Fotos de una propiedad específica:** agrega `#fotos-` y el `id` de la propiedad al final del enlace. Ejemplo:
  https://vivelhoy.cl/#fotos-san-bernardo-villa-pucara
- **Saber de dónde llegan los mensajes:** agrega `?origen=` al enlace que pongas en cada red. Por ejemplo, en Instagram usa
  `https://vivelhoy.cl/?origen=instagram`. Los mensajes de WhatsApp que salgan de esa visita terminan con «(Llegué desde instagram)». No usa cookies ni seguimiento.

## Cambiar teléfono, correo u horario

- El número de WhatsApp está en `js/app.js` (línea `var WHATSAPP = '56985131516'`) y en los enlaces `tel:` de `index.html`.
- Correo, horario, honorarios y textos están en `index.html`.

## Archivos

| Archivo o carpeta | Para qué sirve |
| --- | --- |
| `index.html` | La página: textos, secciones y datos de contacto. |
| `js/propiedades.js` | La lista de propiedades. Es el archivo que más se edita. |
| `js/app.js` | Galería, menú, mensajes de WhatsApp y animaciones. |
| `css/styles.css` | Colores, tipografía, formas y versión para celular. |
| `assets/img/` | Fotos de Clarisa, de las propiedades y la imagen para compartir el enlace. |
| `assets/logo/` | Logo en SVG y PNG (horizontal, vertical, versión clara, perfil de redes, ícono). |
| `assets/fonts/` | Tipografías Fraunces y Figtree, con sus licencias (SIL Open Font License). |
| `marca.html` | Guía de marca: logo, colores con sus códigos, proporciones y tipografías. |
| `herramientas/preparar_fotos.py` | Prepara las fotos de una propiedad nueva. |

## Próximos pasos recomendados

1. **Perfil de Google (Google Business Profile)** con el enlace de la página, el teléfono, el horario y las comunas como área de servicio. Es lo que más ayuda a que la encuentren cuando alguien busca «corredora de propiedades La Florida».
2. **Foto de perfil de WhatsApp Business e Instagram** con `assets/logo/vivelhoy-perfil-redes.png`.
3. **Testimonios reales**: cuando un cliente acepte, se pueden agregar a la página. No conviene inventarlos ni redactarlos por ellos.
