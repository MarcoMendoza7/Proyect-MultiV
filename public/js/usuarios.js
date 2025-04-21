document.addEventListener("DOMContentLoaded", () => {
    // Cuando se hace clic en el menú, se actualiza la tabla
    const menuLinks = document.querySelectorAll('a[data-tabla]');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabla = e.target.getAttribute('data-tabla');
        
            if (tabla === "clientesTotales") {
                cargarClientesTotales();  // Tabla general
            } else {
                cargarTabla(tabla);       // Tabla específica
            }
        
            actualizarActivo(tabla);
        });
        
    });

   

    // Función para cargar la tabla estática de "Clientes Totales"
    const cargarClientesTotales = async () => {
        try {
            const response = await fetch("http://localhost:3000/usuarios");  // Asumiendo que esta URL devuelve los usuarios totales
            const usuarios = await response.json();

            const tablaUsuarios = document.getElementById("tablaUsuarios");
            tablaUsuarios.innerHTML = '';  // Limpiar la tabla antes de cargar los nuevos datos

            // Crear las filas de la tabla
            usuarios.forEach(usuario => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.domicilio}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.correo}</td>
                    <td>
                        <button onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                `;
                tablaUsuarios.appendChild(fila);
            });
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };
     // Cargar la tabla de Clientes Totales de forma estática
     cargarClientesTotales();
    // Función para cargar la tabla dinámica
    const cargarTabla = async (tabla) => {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${tabla}`);  // Cambia según tu API
            const usuarios = await response.json();

            const tablaUsuarios = document.getElementById("tablaUsuarios");
            tablaUsuarios.innerHTML = '';  // Limpiar la tabla antes de cargar los nuevos datos

            // Crear las filas de la tabla
            usuarios.forEach(usuario => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.domicilio}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.correo}</td>
                    <td>
                        <button onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                `;
                tablaUsuarios.appendChild(fila);
            });
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Función para actualizar el enlace activo del menú
    const actualizarActivo = (tabla) => {
        // Eliminar la clase 'active' de todos los enlaces
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        // Agregar la clase 'active' al enlace correspondiente
        const activeLink = document.querySelector(`a[data-tabla="${tabla}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

});

// Función para eliminar un usuario
function eliminarUsuario(id) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar usuario");
            return response.json();
        })
        .then(() => {
            alert("Usuario eliminado correctamente");
            location.reload();
        })
        .catch(error => {
            console.error(error);
            alert("Error al eliminar el usuario");
        });
    }
}

// Función para editar un usuario
function editarUsuario(id) {
    window.location.href = `editarUsuario.html?id=${id}`;
}

const editar_usuario = dispatchEvent.getElementById('usuario.id'[id]);
function editarUsuario(id, datosActualizados) {
    if (confirm("¿Estás seguro de actualizar este usuario?")) {
        fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al actualizar usuario");
            return response.json();
        })
        .then(() => {
            alert("Usuario actualizado correctamente");
            location.reload();
        })
        .catch(error => {
            console.error(error);
            alert("Error al actualizar el usuario");
        });
    }
}


