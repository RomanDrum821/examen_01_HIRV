//
//Examen Hector Isaac Roman Vazquez
//
const express = require("express"); //Crear servidores HTTP - Apache, etc
const app = express();
const puerto = process.env.PORT || 3001;
//Habilitamos que el servidor acepte las solicitudes
app.use(express.json());

//Arreglo de objetos clientes potenciales
// ID (entero autoincremental)
// Nombre de la empresa (cadena de texto)
// Persona de contacto (cadena de texto)
// Correo electrónico (cadena de texto)
// Teléfono (cadena de texto)

let ClientesPot = [
  {
    id: 1,
    nombreEmp: "Google",
    contacto: "Willy ramirez",
    correo: "Will_ram@gmail.com",
    telefono: "4922561543",
  },
  {
    id: 2,
    nombreEmp: "Instituto Politecnico Nacional",
    contacto: "Hector Acuña",
    correo: "Acu_hector@gmail.com",
    telefono: "4921005619",
  },
  {
    id: 3,
    nombreEmp: "Apple",
    contacto: "Ricardo Martinez",
    correo: "Richy_M@gmail.com",
    telefono: "4926958461",
  },
  {
    id: 4,
    nombreEmp: "Oracle",
    contacto: "Claudio Marquez",
    correo: "ClauMar@gmail.com",
    telefono: "4922548543",
  },
  {
    id: 5,
    nombreEmp: "Nike",
    contacto: "Jesus Guijarro",
    correo: "Guija_J@gmail.com",
    telefono: "4922569673",
  },
  {
    id: 6,
    nombreEmp: "Lenovo",
    contacto: "Omar Montoya",
    correo: "Mon_r@gmail.com",
    telefono: "4922167443",
  },
  {
    id: 7,
    nombreEmp: "Liverpool",
    contacto: "Julia Hernandez",
    correo: "herjul@gmail.com",
    telefono: "4922758543",
  },
  {
    id: 8,
    nombreEmp: "KOM",
    contacto: "Hector Roman",
    correo: "Roman_h@gmail.com",
    telefono: "4922880432",
  },
  {
    id: 9,
    nombreEmp: "Conacyt",
    contacto: "Francisco Escobedo",
    correo: "Escob_F@gmail.com",
    telefono: "4922569843",
  },
  {
    id: 10,
    nombreEmp: "Samsung",
    contacto: "David Gutierrez",
    correo: "dgut@gmail.com",
    telefono: "4922566493",
  },
];

//-----------------------------------------------------------------

app.get("/socios/v1/clientesPotenciales", (req, res) => {
  //1. Verificarsi existen categorias
  if (ClientesPot) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existen clientes",
      ClientesPot: ClientesPot,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No existen clientes",
      ClientesPot: ClientesPot,
    });
  }
});

//-----------------------------------------------------------------

app.get("/socios/v1/clientesPotenciales/:id", (req, res) => {
  const id = req.params.id;
  //Obtenemos el Cliente potencial basado en el id
  const Clientes = ClientesPot.find((Clientes) => Clientes.id == id);

  if (Clientes) {
    res.status(200).json({
      estado: 1,
      mensaje: "Existe el cliente",
      Clientes: Clientes,
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No se encontro el Cliente",
      Clientes: Clientes,
    });
  }
  //Solo un clientee
});

//-----------------------------------------------------------------

app.post("/socios/v1/clientesPotenciales", (req, res) => {
  //Crear un recurso - crear un cliente
  //Requerimos
  //id = generar un numero aleatorio
  //nombre, descripcion , contacto, correo y telefono = req.body;
  const { nombreEmp, contacto, correo, telefono } = req.body;
  const id = Math.round(Math.random() * 1000);
  //Comprobar que el cliente = usuario = programador si envie
  if (!nombreEmp || !contacto || !correo || !telefono) {
    console.log("Memeti al primer if");
    res.status(400).json({
      estado: 0,
      mensaje: "Bad request - Faltan parametros en la solicitud",
    });
  } else {
    // El email es válido
    const Clientes = {
      id: id,
      nombreEmp: nombreEmp,
      contacto: contacto,
      correo: correo,
      telefono: telefono,
    };
    const longitudInicial = ClientesPot.length;
    ClientesPot.push(Clientes);
    if (ClientesPot.length > longitudInicial) {
      console.log("Memeti al tercer if");
      //Todo ok de parte del cliente y servidor
      res.status(201).json({
        estado: 1,
        mensaje: "Categoria creada",
        Clientes: Clientes,
      });
    } else {
      console.log("Memeti al segundo else");
      //Error del servidor
      res.status(500).json({
        estado: 0,
        mensaje: "La categoria no se pudo crear",
      });
    }
  }
});

//---------------------------------------------------------------------

app.put("/socios/v1/clientesPotenciales/:id", (req, res) => {
  //id viene ?= params
  //nombre y descripcion ?= body

  const { id } = req.params;
  const { nombreEmp, contacto, correo, telefono } = req.body;
  if (!nombreEmp || !contacto || !correo || !telefono) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parametros en la solicitud",
    });
  } else {
    const posActualizar = ClientesPot.findIndex(
      (Clientes) => Clientes.id == id
    );
    if (posActualizar != -1) {
      //si encontro la categoria
      //Actualizar la categoria
      ClientesPot[posActualizar].nombreEmp = nombreEmp;
      ClientesPot[posActualizar].contacto = contacto;
      ClientesPot[posActualizar].correo = correo;
      ClientesPot[posActualizar].telefono = telefono;
      res.status(200).json({
        estado: 1,
        mensaje: "Cliente actualizado correctamente",
        Clientes: ClientesPot[posActualizar],
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Cliente no encontrado",
      });
    }
  }
});

//-----------------------------------------------------------------

app.delete("/socios/v1/clientesPotenciales/:id", (req, res) => {
  //Eliminar un recurso del servidor - Eliminar una categoria
  const { id } = req.params;
  const indiceEliminar = ClientesPot.findIndex((Clientes) => Clientes.id == id);
  if (indiceEliminar != -1) {
    //Borrar el Clientes
    ClientesPot.splice(indiceEliminar, 1);
    res.status(201).json({
      estado: 1,
      mensaje: "Cliente Eliminado",
    });
  } else {
    //Categoria no encontrada
    res.status(404).json({
      estado: 0,
      mensaje: "Cliente no encontrado",
    });
  }
});

app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto: ", puerto);
});
