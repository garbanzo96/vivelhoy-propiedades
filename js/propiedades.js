/*
  PROPIEDADES DE VIVELHOY
  =======================
  Este es el único archivo que hay que tocar para agregar, cambiar o cerrar una propiedad.
  La página se arma sola a partir de esta lista.

  Cada propiedad es un bloque entre llaves { ... }. Para agregar una nueva, copia un bloque
  completo, pégalo al principio de la lista y cambia sus datos. Las fotos van en
  assets/img/propiedades/<carpeta>/ (en la guía del README está explicado paso a paso).

  operacion:  "arriendo" o "venta"
  estado:     "disponible", "arrendada" o "vendida"
              (cuando se cierra, basta con cambiar "disponible" por "arrendada" o "vendida")
  tipo:       "Casa" o "Departamento"
  precio:     texto tal como quieres que se vea, por ejemplo "$600.000" o "UF 4.200"
  datos:      si no tienes un dato, bórralo o déjalo en null y no aparece
*/

window.PROPIEDADES = [
  {
    id: "san-bernardo-villa-pucara",
    operacion: "arriendo",
    estado: "disponible",
    tipo: "Casa",
    titulo: "Casa en Villa Pucará",
    comuna: "San Bernardo",
    sector: "Villa Pucará",
    precio: "$600.000",
    periodo: "al mes",
    datos: {
      dormitorios: 3,
      banos: 3,
      detalleBanos: "2 completos y 1 de visita",
      pisos: 3,
      m2Construidos: 83,
      m2Totales: 91
    },
    caracteristicas: ["Cocina independiente", "Logia", "Antejardín", "Patio"],
    descripcion: "Casa de tres pisos con living y comedor conectados, cocina independiente con logia, tres dormitorios, dos baños completos y uno de visita. Tiene antejardín y patio.",
    carpeta: "assets/img/propiedades/san-bernardo-villa-pucara/",
    // Fotos del mosaico principal (número de la foto en la lista de abajo, partiendo en 0).
    // La segunda conviene que sea vertical, como la fachada.
    mosaico: [0, 1, 3, 5],
    fotos: [
      { archivo: "01-living-comedor", texto: "Living y comedor conectados" },
      { archivo: "02-fachada", texto: "Fachada de la casa" },
      { archivo: "03-antejardin", texto: "Antejardín y acceso" },
      { archivo: "04-comedor", texto: "Comedor" },
      { archivo: "05-sala-de-estar", texto: "Sala de estar junto a la escalera" },
      { archivo: "06-cocina", texto: "Cocina independiente" },
      { archivo: "07-cocina-2", texto: "Cocina, vista hacia la logia" },
      { archivo: "08-logia", texto: "Logia" },
      { archivo: "09-escalera", texto: "Escalera a los pisos superiores" },
      { archivo: "10-dormitorio-principal", texto: "Dormitorio principal" },
      { archivo: "11-bano-principal", texto: "Baño completo" },
      { archivo: "12-dormitorio-3", texto: "Dormitorio" },
      { archivo: "13-dormitorio-2", texto: "Dormitorio" },
      { archivo: "14-bano", texto: "Baño completo" },
      { archivo: "15-bano-visita", texto: "Baño de visita" },
      { archivo: "16-patio", texto: "Patio" }
    ]
  },
  {
    id: "la-florida",
    operacion: "arriendo",
    estado: "arrendada",
    tipo: "Casa",
    titulo: "Casa en La Florida",
    comuna: "La Florida",
    descripcion: "Casa con antejardín y patio.",
    carpeta: "assets/img/propiedades/la-florida/",
    fotos: [
      { archivo: "01-jardin", texto: "Patio con pasto" },
      { archivo: "02-fachada", texto: "Fachada y reja de acceso" },
      { archivo: "03-acceso", texto: "Acceso a la casa" },
      { archivo: "04-living", texto: "Living con ventanal" },
      { archivo: "05-cocina", texto: "Cocina" },
      { archivo: "06-dormitorio", texto: "Dormitorio con clóset" },
      { archivo: "07-bano", texto: "Baño" }
    ]
  },
  {
    id: "las-condes",
    operacion: "arriendo",
    estado: "arrendada",
    tipo: "Departamento",
    titulo: "Departamento en Las Condes",
    comuna: "Las Condes",
    descripcion: "Departamento en edificio con piscina.",
    carpeta: "assets/img/propiedades/las-condes/",
    fotos: [
      { archivo: "01-living", texto: "Living con ventanal" },
      { archivo: "02-dormitorio", texto: "Dormitorio con ventanal" },
      { archivo: "03-closet", texto: "Clóset" },
      { archivo: "04-bano", texto: "Baño" },
      { archivo: "05-pasillo", texto: "Pasillo" },
      { archivo: "06-piscina", texto: "Piscina del edificio" },
      { archivo: "07-sala-de-cine", texto: "Sala de cine del edificio" }
    ]
  },
  {
    id: "la-reina",
    operacion: "venta",
    estado: "vendida",
    tipo: "Casa",
    titulo: "Casa en La Reina",
    comuna: "La Reina",
    descripcion: "Casa con jardín, piscina y quincho.",
    carpeta: "assets/img/propiedades/la-reina/",
    fotos: [
      { archivo: "01-jardin", texto: "Jardín con piscina" },
      { archivo: "02-fachada", texto: "Fachada" },
      { archivo: "03-piscina", texto: "Piscina y terraza" },
      { archivo: "04-living", texto: "Living" },
      { archivo: "05-comedor", texto: "Comedor con vista al jardín" },
      { archivo: "06-quincho", texto: "Quincho" }
    ]
  },
  {
    id: "san-bernardo-casa-vendida",
    operacion: "venta",
    estado: "vendida",
    tipo: "Casa",
    titulo: "Casa en San Bernardo",
    comuna: "San Bernardo",
    descripcion: "Casa de dos pisos con patio.",
    carpeta: "assets/img/propiedades/san-bernardo-casa-vendida/",
    fotos: [
      { archivo: "01-fachada", texto: "Fachada" },
      { archivo: "02-patio", texto: "Patio" },
      { archivo: "03-living", texto: "Living y comedor" },
      { archivo: "04-comedor", texto: "Comedor" },
      { archivo: "05-dormitorio", texto: "Dormitorio" }
    ]
  }
];
