// Contador para dar un id único a cada ventana que se abre
let contadorVentanas = 0;

// Datos de ejemplo para el buscador de clientes.
// Cuando tengas la lista real (de una base de datos, API, etc.) simplemente
// reemplazá este array por los datos reales, respetando el formato { value, texto }.
const listaClientes = [
  { value: 'c1', texto: 'Edgar Gabriel Arca Arias' },
  { value: 'c2', texto: 'Oscar Marcelo Arca Da Rosa' },
  { value: 'c3', texto: 'Nilse Micaela Roman Arias' }
];

// Datos de ejemplo para el buscador de vendedores.
const listaVendedores = [
  { value: 'v1', texto: 'Juan Pérez' },
  { value: 'v2', texto: 'María López' },
  { value: 'v3', texto: 'Carlos Gómez' }
];

// Datos de ejemplo para el buscador de productos.
const listaProductos = [
  { value: 'p1', texto: 'Coca Cola 1.5L', precio: 8500 },
    { value: 'p2', texto: 'Arroz Preferido 1kg', precio: 6200 },
    { value: 'p3', texto: 'Aceite Girasol 900ml', precio: 12900 }
];

// Define aquí el contenido (HTML) de cada ventana según la sección.
// El campo "onAbrir" es opcional: una función que se ejecuta justo después
// de insertar la ventana en la pantalla (útil para inicializar componentes
// como el combo buscador, que necesitan que el HTML ya esté en el DOM).
const contenidoVentanas = {
  'Venta': {
    titulo: 'Operaciones > Venta',
    body: `
      <label for="venta-input-cliente" id="venta-lab-cliente">Cliente:</label>
      <div class="combo-buscador" id="combo-venta-cliente">
        <input type="text" id="venta-input-cliente" placeholder="Buscar cliente..." autocomplete="off">
        <input type="hidden" id="venta-select-clientes-valor">
        <div class="combo-lista" id="venta-lista-clientes"></div>
      </div>

      <label for="venta-input-vendedor" id="venta-lab-vendedor">- Vendedor:</label>
      <div class="combo-buscador" id="combo-venta-vendedor">
        <input type="text" id="venta-input-vendedor" placeholder="Buscar vendedor..." autocomplete="off">
        <input type="hidden" id="venta-select-vendedor-valor">
        <div class="combo-lista" id="venta-lista-vendedores"></div>
      </div>
      <hr class="venta-linea-venta-1">
      <label for="venta-input-producto" id="venta-lab-producto">Producto:</label>
      <div class="combo-buscador" id="combo-venta-producto">
        <input type="text" id="venta-input-producto" placeholder="Buscar producto..." autocomplete="off">
        <input type="hidden" id="venta-select-producto-valor">
        <div class="combo-lista" id="venta-lista-productos"></div>
      </div>
      <label for="venta-select-cantidad" id="venta-lab-cantidad">- Cantidad:</label>
      <div class="combo-buscador" id="combo-venta-cantidad">
        <input type="text" id="venta-input-cantidad" placeholder="Cantidad..." autocomplete="off">
      </div>
      <label for="venta-select-precio-unitario" id="venta-lab-precio-unitario">- Precio Unitario:</label>
     <div class="combo-buscador" id="combo-venta-preciounitario">
        <input type="text" id="venta-input-preciounitario" placeholder="Precio..." autocomplete="off">
      </div>
      <button class="venta-btn-anadir">Añadir</button>
      <button class="venta-btn-borrar">Borrar</button>

      <table class="venta-tabla">
        <colgroup>
          <col class="col-venta-id">
          <col class="col-venta-producto">
          <col class="col-venta-cantidad">
          <col class="col-venta-precio">
          <col class="col-venta-total">
          <col class="col-venta-funciones">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Funciones</th>
          </tr>
        </thead>
        <tbody id="venta-tabla-body">
        </tbody>
      </table>
      <div class = "venta-final-total">
        <label for="venta-input-condicion" id="venta-lab-condicion">Metodo de Pago:</label>
        <div class="combo-buscador" id="combo-venta-condicion">
          <input type="text" id="venta-input-condicion" placeholder="..." autocomplete="off">
          <input type="hidden" id="venta-select-condicion-valor">
          <div class="combo-lista" id="venta-lista-condicion"></div>
        </div>
        <div class = "venta-final-total-container">
          <label for="venta-select-total" id="venta-lab-total">Total:</label>
          <label for="venta-select-total-numero" id="venta-lab-total-numero">100.000.000</label>
        </div>
      </div>
      <div class = "venta-final">
        <label for="venta-select-extra" id="venta-lab-extra">Gasto Extra:</label>
        <div class="combo-buscador" id="combo-venta-extra">
          <input type="text" id="venta-input-extra" placeholder="..." autocomplete="off">
        </div>
        <label for="venta-select-obs" id="venta-lab-obs">- Observacion:</label>
        <div class="combo-buscador" id="combo-venta-obs">
          <input type="text" id="venta-input-obs" placeholder="..." autocomplete="off">
        </div>
        <button class="venta-btn-procesar">Procesar</button>
      </div>
    `,
    onAbrir: function () {
      initComboBuscador({
        inputId: 'venta-input-cliente',
        listaId: 'venta-lista-clientes',
        hiddenId: 'venta-select-clientes-valor',
        opciones: listaClientes
      });

      initComboBuscador({
        inputId: 'venta-input-vendedor',
        listaId: 'venta-lista-vendedores',
        hiddenId: 'venta-select-vendedor-valor',
        opciones: listaVendedores
      });

      initComboBuscador({
        inputId: 'venta-input-producto',
        listaId: 'venta-lista-productos',
        hiddenId: 'venta-select-producto-valor',
        opciones: listaProductos
      });

      configurarVenta();

    }
  },
  'Presupuesto': {
    titulo: 'Operaciones > Presupuesto',
    body: `
    <label for="venta-input-cliente" id="venta-lab-cliente">Cliente:</label>
      <div class="combo-buscador" id="combo-venta-cliente">
        <input type="text" id="venta-input-cliente" placeholder="Buscar cliente..." autocomplete="off">
        <input type="hidden" id="venta-select-clientes-valor">
        <div class="combo-lista" id="venta-lista-clientes"></div>
      </div>

      <label for="venta-input-vendedor" id="venta-lab-vendedor">- Vendedor:</label>
      <div class="combo-buscador" id="combo-venta-vendedor">
        <input type="text" id="venta-input-vendedor" placeholder="Buscar vendedor..." autocomplete="off">
        <input type="hidden" id="venta-select-vendedor-valor">
        <div class="combo-lista" id="venta-lista-vendedores"></div>
      </div>
      <hr class="venta-linea-venta-1">
      <label for="venta-input-producto" id="venta-lab-producto">Producto:</label>
      <div class="combo-buscador" id="combo-venta-producto">
        <input type="text" id="venta-input-producto" placeholder="Buscar producto..." autocomplete="off">
        <input type="hidden" id="venta-select-producto-valor">
        <div class="combo-lista" id="venta-lista-productos"></div>
      </div>
      <label for="venta-select-cantidad" id="venta-lab-cantidad">- Cantidad:</label>
      <div class="combo-buscador" id="combo-venta-cantidad">
        <input type="text" id="venta-input-cantidad" placeholder="Cantidad..." autocomplete="off">
      </div>
      <label for="venta-select-precio-unitario" id="venta-lab-precio-unitario">- Precio Unitario:</label>
     <div class="combo-buscador" id="combo-venta-preciounitario">
        <input type="text" id="venta-input-preciounitario" placeholder="Precio..." autocomplete="off">
      </div>
      <button class="venta-btn-anadir">Añadir</button>
      <button class="venta-btn-borrar">Borrar</button>

      <table class="venta-tabla">
        <colgroup>
          <col class="col-venta-id">
          <col class="col-venta-producto">
          <col class="col-venta-cantidad">
          <col class="col-venta-precio">
          <col class="col-venta-total">
          <col class="col-venta-funciones">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Funciones</th>
          </tr>
        </thead>
        <tbody id="venta-tabla-body">
        </tbody>
      </table>
      <div class = "venta-final-total">
        <label for="venta-select-total" id="venta-lab-total">Total:</label>
        <label for="venta-select-total-numero" id="venta-lab-total-numero">100.000.000</label>
      </div>
      <div class = "venta-final">
        <label for="venta-select-extra" id="venta-lab-extra">Gasto Extra:</label>
        <div class="combo-buscador" id="combo-venta-extra">
          <input type="text" id="venta-input-extra" placeholder="..." autocomplete="off">
        </div>
        <label for="venta-select-obs" id="venta-lab-obs">- Observacion:</label>
        <div class="combo-buscador" id="combo-venta-obs">
          <input type="text" id="venta-input-obs" placeholder="..." autocomplete="off">
        </div>
        <button class="venta-btn-procesar">Procesar</button>
      </div>
    `,
    onAbrir: function () {
      initComboBuscador({
        inputId: 'venta-input-cliente',
        listaId: 'venta-lista-clientes',
        hiddenId: 'venta-select-clientes-valor',
        opciones: listaClientes
      });

      initComboBuscador({
        inputId: 'venta-input-vendedor',
        listaId: 'venta-lista-vendedores',
        hiddenId: 'venta-select-vendedor-valor',
        opciones: listaVendedores
      });

      initComboBuscador({
        inputId: 'venta-input-producto',
        listaId: 'venta-lista-productos',
        hiddenId: 'venta-select-producto-valor',
        opciones: listaProductos
      });

      configurarPresupuesto();

    }
  }
};

function irA(seccion) {
  const datos = contenidoVentanas[seccion];

  // Si la sección todavía no tiene una ventana definida, mostramos un aviso simple.
  if (!datos) {
    alert('La ventana de "' + seccion + '" todavía no está definida.');
    return;
  }

  abrirVentana(datos.titulo, datos.body, datos.onAbrir);
}

function abrirVentana(titulo, bodyHTML, onAbrir) {
  contadorVentanas++;
  const idVentana = 'ventana-' + contadorVentanas;

  const ventana = document.createElement('div');
  ventana.className = 'gestion-ventana';
  ventana.id = idVentana;

  ventana.innerHTML = `
    <div class="gestion-header">
      <span class="gestion-header-titulo">${titulo}</span>
      <button class="gestion-header-btn" title="Opciones">☰</button>
      <button class="gestion-header-cerrar" onclick="cerrarVentana('${idVentana}')">X</button>
    </div>
    <div class="gestion-body">
      ${bodyHTML}
    </div>
  `;

  document.getElementById('content').appendChild(ventana);

  // Si la ventana necesita inicializar algo en JS (como el combo buscador),
  // lo hacemos recién ahora que el HTML ya está insertado en la página.
  if (typeof onAbrir === 'function') {
    onAbrir();
  }
}

function cerrarVentana(idVentana) {
  const ventana = document.getElementById(idVentana);
  if (ventana) {
    ventana.remove();
  }
}

function toggleMenu(titleEl) {
  const items = titleEl.nextElementSibling;
  items.style.display = (items.style.display === 'none') ? 'flex' : 'none';
}

/* =========================================================
   COMBO BUSCADOR (input de texto + lista filtrable)
   Funciona como el buscador de YouTube: escribís y la lista
   se filtra en tiempo real. Al hacer clic en una opción, el
   texto queda en el input y el "value" real queda guardado
   en un input oculto (hiddenId), listo para leer con JS.

   Es reutilizable: para usarlo en otro campo (Vendedor,
   Producto, etc.) solo hace falta:
   1. Poner el mismo HTML (input + input hidden + div de lista)
      con ids distintos.
   2. Armar el array de opciones [{ value, texto }, ...].
   3. Llamar a initComboBuscador({ inputId, listaId, hiddenId, opciones }).
   ========================================================= */
function initComboBuscador(config) {
  const input = document.getElementById(config.inputId);
  const lista = document.getElementById(config.listaId);
  const hidden = document.getElementById(config.hiddenId);
  const opciones = config.opciones;

  function renderLista(filtro) {
    const texto = filtro.trim().toLowerCase();
    const filtradas = opciones.filter(op => op.texto.toLowerCase().includes(texto));

    if (filtradas.length === 0) {
      lista.innerHTML = '<div class="combo-item combo-item-vacio">Sin resultados</div>';
    } else {
      lista.innerHTML = filtradas.map(op =>
        `<div class="combo-item" data-value="${op.value}">${op.texto}</div>`
      ).join('');
    }

    lista.style.display = 'block';
  }

  // Mostrar todas las opciones al hacer foco (o clic) en el input
  input.addEventListener('focus', function () {
    renderLista(input.value);
  });

  // Filtrar mientras se escribe
  input.addEventListener('input', function () {
    hidden.value = ''; // si edita el texto, invalidamos la selección anterior
    renderLista(input.value);
  });

  // Elegir una opción de la lista
  lista.addEventListener('click', function (e) {
    const item = e.target.closest('.combo-item');
    if (!item || !item.dataset.value) return;

    input.value = item.textContent;
    hidden.value = item.dataset.value;
    lista.style.display = 'none';

    // Avisar que se seleccionó una opción
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Cerrar la lista al hacer clic afuera del combo
  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !lista.contains(e.target)) {
      lista.style.display = 'none';
    }
  });
}

function configurarVenta() {

    // Crear las 5 filas vacías
    inicializarTablaVenta();


    const btnAnadir = document.querySelector('.venta-btn-anadir');

    const inputProducto = document.getElementById(
        'venta-input-producto'
    );

    const inputCantidad = document.getElementById(
        'venta-input-cantidad'
    );

    const inputPrecio = document.getElementById(
        'venta-input-preciounitario'
    );

    const hiddenProducto = document.getElementById(
        'venta-select-producto-valor'
    );


    // =====================================================
    // CUANDO SE SELECCIONA UN PRODUCTO
    // =====================================================
    inputProducto.addEventListener('change', function () {

        const producto = listaProductos.find(
            p => p.value === hiddenProducto.value
        );

        if (producto) {

            inputPrecio.value = producto.precio;

        }

    });


    // =====================================================
    // DETECTAR CAMBIO MEDIANTE BLUR
    // =====================================================
    inputProducto.addEventListener('blur', function () {

        const producto = listaProductos.find(
            p => p.value === hiddenProducto.value
        );

        if (producto) {

            inputPrecio.value = producto.precio;

        }

    });


    // =====================================================
    // BOTÓN AÑADIR
    // =====================================================
    btnAnadir.addEventListener('click', function () {

        const productoId = hiddenProducto.value;

        const productoTexto = inputProducto.value.trim();

        const cantidad = parseFloat(
            inputCantidad.value
        );

        const precio = parseFloat(
            inputPrecio.value
        );


        // =================================================
        // VALIDAR PRODUCTO
        // =================================================
        if (!productoId) {

            alert('Seleccione un producto.');

            return;
        }


        // =================================================
        // VALIDAR CANTIDAD
        // =================================================
        if (!cantidad || cantidad <= 0) {

            alert('Ingrese una cantidad válida.');

            inputCantidad.focus();

            return;
        }


        // =================================================
        // VALIDAR PRECIO
        // =================================================
        if (!precio || precio <= 0) {

            alert('Ingrese un precio válido.');

            inputPrecio.focus();

            return;
        }


        // =================================================
        // AGREGAR PRODUCTO A LA TABLA
        // =================================================
        agregarProductoTablaVenta(
            productoId,
            productoTexto,
            cantidad,
            precio
        );


        // =================================================
        // LIMPIAR CAMPOS
        // =================================================
        inputProducto.value = '';

        hiddenProducto.value = '';

        inputCantidad.value = '';

        inputPrecio.value = '';

        

    });
}

// =========================================================
// CREAR LAS 5 FILAS INICIALES
// =========================================================
function inicializarTablaVenta() {

    const tbody = document.getElementById('venta-tabla-body');

    if (!tbody) return;

    tbody.innerHTML = '';

    // Crear 5 filas vacías inicialmente
    for (let i = 0; i < 6; i++) {

        const fila = document.createElement('tr');

        fila.dataset.posicion = i;

        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;

        tbody.appendChild(fila);
    }
}


// =========================================================
// AGREGAR PRODUCTO A LA TABLA
// =========================================================
function agregarProductoTablaVenta(productoId, producto, cantidad, precio) {

    const tbody = document.getElementById('venta-tabla-body');

    if (!tbody) return;

    const filas = tbody.querySelectorAll('tr');

    let filaDisponible = null;
    let posicion = -1;

    // Buscar la primera fila vacía
    filas.forEach((fila, index) => {

        if (!fila.dataset.ocupada && !filaDisponible) {

            filaDisponible = fila;
            posicion = index;

        }

    });


    // =====================================================
    // SI NO HAY FILAS VACÍAS, CREAR UNA NUEVA
    // =====================================================
    if (!filaDisponible) {

        filaDisponible = document.createElement('tr');

        posicion = filas.length;

        filaDisponible.dataset.posicion = posicion;

        tbody.appendChild(filaDisponible);

    }


    // =====================================================
    // CALCULAR TOTAL
    // =====================================================
    const total = cantidad * precio;


    // =====================================================
    // MARCAR FILA COMO OCUPADA
    // =====================================================
    filaDisponible.dataset.ocupada = 'true';

    filaDisponible.dataset.productoId = productoId;


    // =====================================================
    // COLOCAR DATOS DEL PRODUCTO
    // =====================================================
    filaDisponible.innerHTML = `
        <td>${posicion + 1}</td>

        <td>${producto}</td>

        <td>${cantidad}</td>

        <td>${formatearNumero(precio)}</td>

        <td>${formatearNumero(total)}</td>

        <td>
            <img 
                src="icons/editar.png"
                class="icono-funcion"
                alt="Editar"
                title="Editar"
                onclick="editarProducto(this)"
            >

            <img 
                src="icons/borrar.png"
                class="icono-funcion"
                alt="Borrar"
                title="Borrar"
                onclick="borrarProductoVenta(this)"
            >
        </td>
    `;
}


// =========================================================
// BORRAR PRODUCTO
// =========================================================
function borrarProductoVenta(icono) {

    const fila = icono.closest('tr');

    if (!fila) return;

    if (confirm('¿Desea eliminar este producto?')) {

        // Vaciar la fila
        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;

        // Volver a marcarla como disponible
        delete fila.dataset.ocupada;
        delete fila.dataset.productoId;
    }
}


// =========================================================
// FORMATEAR NÚMEROS
// =========================================================
function formatearNumero(numero) {

    return Number(numero).toLocaleString('es-PY');
}