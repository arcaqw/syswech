// Contador para dar un id único a cada ventana que se abre
let contadorVentanas = 0;

// Usuario actual (simulado para este ejemplo). En un caso real, este dato vendría de la sesión del usuario logueado.
const usuario = "ADM";

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

const listaProveedores = [
  { value: 'v1', texto: 'Coca Cola' },
  { value: 'v2', texto: 'Nescafe' },
  { value: 'v3', texto: 'Pechugon' }
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
    <label for="presupuesto-input-producto" id="presupuesto-lab-producto">Producto:</label>
    <div class="combo-buscador" id="combo-presupuesto-producto">
      <input type="text" id="presupuesto-input-producto" placeholder="Buscar producto..." autocomplete="off">
      <input type="hidden" id="presupuesto-select-producto-valor">
      <div class="combo-lista" id="presupuesto-lista-productos"></div>
    </div>
    <label for="presupuesto-select-cantidad" id="presupuesto-lab-cantidad">- Cantidad:</label>
    <div class="combo-buscador" id="combo-presupuesto-cantidad">
      <input type="text" id="presupuesto-input-cantidad" placeholder="Cantidad..." autocomplete="off">
    </div>
    <label for="presupuesto-select-precio-unitario" id="presupuesto-lab-precio-unitario">- Precio Unitario:</label>
    <div class="combo-buscador" id="combo-presupuesto-preciounitario">
      <input type="text" id="presupuesto-input-preciounitario" placeholder="Precio..." autocomplete="off">
    </div>
    <button class="presupuesto-btn-anadir">Añadir</button>
    <button class="presupuesto-btn-borrar">Borrar</button>
    <table class="presupuesto-tabla">
        <colgroup>
          <col class="col-presupuesto-id">
          <col class="col-presupuesto-producto">
          <col class="col-presupuesto-cantidad">
          <col class="col-presupuesto-precio">
          <col class="col-presupuesto-total">
          <col class="col-presupuesto-funciones">
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
        <tbody id="presupuesto-tabla-body">
        </tbody>
      </table>
      <div class = "presupuesto-final-total">
        <label for="presupuesto-input-condicion" id="presupuesto-lab-condicion">Metodo de Pago:</label>
        <div class="combo-buscador" id="combo-presupuesto-condicion">
          <input type="text" id="presupuesto-input-condicion" placeholder="..." autocomplete="off">
          <input type="hidden" id="presupuesto-select-condicion-valor">
          <div class="combo-lista" id="presupuesto-lista-condicion"></div>
        </div>
        <div class = "presupuesto-final-total-container">
          <label for="presupuesto-select-total" id="presupuesto-lab-total">Total:</label>
          <label for="presupuesto-select-total-numero" id="presupuesto-lab-total-numero">100.000.000</label>
        </div>
      </div>
      <div class = "presupuesto-final">
        <label for="presupuesto-select-extra" id="presupuesto-lab-extra">Gasto Extra:</label>
        <div class="combo-buscador" id="combo-presupuesto-extra">
          <input type="text" id="presupuesto-input-extra" placeholder="..." autocomplete="off">
        </div>
        <label for="presupuesto-select-obs" id="presupuesto-lab-obs">- Observacion:</label>
        <div class="combo-buscador" id="combo-presupuesto-obs">
          <input type="text" id="presupuesto-input-obs" placeholder="..." autocomplete="off">
        </div>
        <button class="presupuesto-btn-procesar">Procesar</button>
      </div>
      
    `,
    onAbrir: function () {
      initComboBuscador({
        inputId: 'presupuesto-input-producto',
        listaId: 'presupuesto-lista-productos',
        hiddenId: 'presupuesto-select-producto-valor',
        opciones: listaProductos
      });

      configurarPresupuesto();

    }
  },
  'Compra': {
    titulo: 'Operaciones > Compra',
    body: `
    <label for="compra-input-factura" id="compra-lab-factura">Factura:</label>
    <div class="combo-buscador" id="combo-compra-factura">
      <input type="text" id="compra-input-factura" placeholder="..." autocomplete="off">
      <input type="hidden" id="compra-select-factura-valor">
      <div class="combo-lista" id="compra-lista-factura"></div>
    </div>
    <label for="compra-select-nota" id="compra-lab-nota">- Nota:</label>
    <div class="combo-buscador" id="combo-compra-nota">
      <input type="text" id="compra-input-nota" placeholder="..." autocomplete="off">
    </div>
    <label for="compra-input-proveedor" id="compra-lab-proveedor">- Proveedor:</label>
    <div class="combo-buscador" id="combo-compra-proveedor">
      <input type="text" id="compra-input-proveedor" placeholder="..." autocomplete="off">
      <input type="hidden" id="compra-select-proveedor-valor">
      <div class="combo-lista" id="compra-lista-proveedor"></div>
    </div>
    <label id="compra-lab-nota-numero">Nota:</label>
    <label id="compra-lab-nota-numero-2">9999</label>
    <hr class="compra-linea-venta-1">
    <label for="compra-input-producto" id="compra-lab-producto">Producto:</label>
    <div class="combo-buscador" id="combo-compra-producto">
      <input type="text" id="compra-input-producto" placeholder="Buscar producto..." autocomplete="off">
      <input type="hidden" id="compra-select-producto-valor">
      <div class="combo-lista" id="compra-lista-productos"></div>
    </div>
    <label for="compra-select-cantidad" id="compra-lab-cantidad">- Cantidad:</label>
    <div class="combo-buscador" id="combo-compra-cantidad">
      <input type="text" id="compra-input-cantidad" placeholder="Cantidad..." autocomplete="off">
    </div>
    <label for="compra-select-costo" id="compra-lab-costo">- Costo:</label>
    <div class="combo-buscador" id="combo-compra-costo">
      <input type="text" id="compra-input-costo" placeholder="Costo..." autocomplete="off">
    </div>
    <button class="compra-btn-anadir">Añadir</button>
    <button class="compra-btn-borrar">Borrar</button>

    <table class="compra-tabla">
      <colgroup>
        <col class="col-compra-id">
        <col class="col-compra-producto">
        <col class="col-compra-cantidad">
        <col class="col-compra-costo">
        <col class="col-compra-total">
        <col class="col-compra-funciones">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Costo</th>
          <th>Total</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody id="compra-tabla-body">
      </tbody>
    </table>
    <div class = "compra-final-total">
        <label for="compra-input-condicion" id="compra-lab-condicion">Metodo de Pago:</label>
        <div class="combo-buscador" id="combo-compra-condicion">
          <input type="text" id="compra-input-condicion" placeholder="..." autocomplete="off">
          <input type="hidden" id="compra-select-condicion-valor">
          <div class="combo-lista" id="compra-lista-condicion"></div>
        </div>
        <label for="combo-compra-gasto" id="compra-lab-gasto">- Gasto Extra:</label>
        <div class="combo-buscador" id="combo-compra-gasto">
          <input type="text" id="compra-input-gasto" placeholder="..." autocomplete="off">
        </div>
        <label for="combo-compra-proveedor-costo" id="compra-lab-proveedor-costo">- Costo Proveedor:</label>
        <div class="combo-buscador" id="combo-compra-proveedor-costo">
          <input type="text" id="compra-input-proveedor-costo" placeholder="..." autocomplete="off">
        </div>
        <div class = "compra-final-total-container">
          <label for="compra-select-total" id="compra-lab-total">Total:</label>
          <label for="compra-select-total-numero" id="compra-lab-total-numero">100.000.000</label>
        </div>
      </div>
      <div class = "compra-final">
        <label for="compra-select-obs" id="compra-lab-obs">Observacion:</label>
        <div class="combo-buscador" id="combo-compra-obs">
          <input type="text" id="compra-input-obs" placeholder="..." autocomplete="off">
        </div>
        <button class="compra-btn-procesar">Procesar</button>
      </div>
    `,
    onAbrir: function () {
      initComboBuscador({
        inputId: 'compra-input-producto',
        listaId: 'compra-lista-productos',
        hiddenId: 'compra-select-producto-valor',
        opciones: listaProductos
      });

      initComboBuscador({
        inputId: 'compra-input-proveedor',
        listaId: 'compra-lista-proveedor',
        hiddenId: 'compra-select-proveedor-valor',
        opciones: listaProveedores
      });

      configurarCompra();

    }
  },
  'Devolucion': {
    titulo: 'Operaciones > Devolucion',
    body: `
    <label for="devolucion-input-operacion" id="devolucion-lab-operacion">Operacion:</label>
    <div class="combo-buscador" id="combo-devolucion-operacion">
      <input type="text" id="devolucion-input-operacion" placeholder="..." autocomplete="off">
      <input type="hidden" id="devolucion-select-operacion-valor">
      <div class="combo-lista" id="devolucion-lista-operacion"></div>
    </div>
    <label for="devolucion-select-nota" id="devolucion-lab-nota">- Nota:</label>
    <div class="combo-buscador" id="combo-devolucion-nota">
      <input type="text" id="devolucion-input-nota" placeholder="..." autocomplete="off">
    </div>
    <label for="devolucion-select-factura" id="devolucion-lab-factura">- Factura:</label>
    <div class="combo-buscador" id="combo-devolucion-factura">
      <input type="text" id="devolucion-input-factura" placeholder="..." autocomplete="off">
    </div>
    <table class="devolucion-tabla">
        <colgroup>
          <col class="col-devolucion-id">
          <col class="col-devolucion-producto">
          <col class="col-devolucion-cantidad">
          <col class="col-devolucion-precio">
          <col class="col-devolucion-total">
          <col class="col-devolucion-funciones">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Devolver</th>
          </tr>
        </thead>
        <tbody id="devolucion-tabla-body">
        </tbody>
    </table>
    <div class = "devolucion-final-total">
      <button class="devolucion-btn-todo">Devolver Todo</button>
      <button class="devolucion-btn-desmarcar">Desmarcar Todo</button>
      <div class = "devolucion-final-total-container">
          <label for="devolucion-select-total" id="venta-lab-total">Total:</label>
          <label for="devolucion-select-total-numero" id="devolucion-lab-total-numero">100.000.000</label>
      </div>
      <div class = "devolucion-final-devuelto-container">
          <label for="devolucion-select-devuelto" id="venta-lab-total">Total Devuelto:</label>
          <label for="devolucion-select-devuelto-numero" id="devolucion-lab-devuelto-numero">100.000.000</label>
      </div>
    </div>
    <label for="devolucion-select-obs" id="devolucion-lab-obs">Observacion:</label>
      <div class="combo-buscador" id="combo-devolucion-obs">
        <input type="text" id="devolucion-input-obs" placeholder="..." autocomplete="off">
      </div>
    <button class="devolucion-btn-procesar">Procesar</button>  
    `,
    onAbrir: function () {
      configurarDevolucion();
    }
  },
  'Clientes': {
    titulo: 'Registros > Clientes',
    body: `
    <label for="clientes-input-buscar" id="clientes-lab-buscar">Buscar Cliente:</label>
    <div class="combo-buscador" id="combo-clientes-buscar">
      <input type="text" id="clientes-input-buscar" placeholder="..." autocomplete="off">
    </div>
    <label for="clientes-select-filtrar" id="clientes-lab-filtrar">Filtrar Por:</label>
    <div class="combo-buscador" id="combo-clientes-filtrar">
      <input type="text" id="clientes-input-filtrar" placeholder="..." autocomplete="off">
    </div>
    <table class="clientes-tabla">
      <colgroup>
        <col class="col-clientes-id">
        <col class="col-clientes-cliente">
        <col class="col-clientes-compra">
        <col class="col-clientes-funciones">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Ultima Compra</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody id="clientes-tabla-body">
      </tbody>
    </table>
    <button class="clientes-btn-agregar">Agregar Cliente Nuevo</button>  
    `,
    onAbrir: function () {
      configurarClientes();
    }
  },
  'Productos': {
    titulo: 'Registros > Productos',
    body: `
    <label for="productos-input-buscar" id="productos-lab-buscar">Buscar Producto:</label>
    <div class="combo-buscador" id="combo-productos-buscar">
      <input type="text" id="productos-input-buscar" placeholder="..." autocomplete="off">
    </div>
    <label for="productos-select-filtrar" id="productos-lab-filtrar">Filtrar Por:</label>
    <div class="combo-buscador" id="combo-productos-filtrar">
      <input type="text" id="productos-input-filtrar" placeholder="..." autocomplete="off">
    </div>
    <table class="productos-tabla">
      <colgroup>
        <col class="col-productos-id">
        <col class="col-productos-producto">
        <col class="col-productos-cantidad">
        <col class="col-productos-costo">
        <col class="col-productos-funciones">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Costo</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody id="productos-tabla-body">
      </tbody>
    </table>
    <button class="productos-btn-agregar">Agregar Producto Nuevo</button> 
    `,
    onAbrir: function () {
      configurarProductos();
    }
   },
   'Proveedores': {
    titulo: 'Registros > Proveedores',
    body: `
    <label for="proveedor-input-buscar" id="proveedor-lab-buscar">Buscar Proveedor:</label>
    <div class="combo-buscador" id="combo-proveedor-buscar">
      <input type="text" id="proveedor-input-buscar" placeholder="..." autocomplete="off">
    </div>
    <label for="proveedor-select-filtrar" id="proveedor-lab-filtrar">Filtrar Por:</label>
    <div class="combo-buscador" id="combo-proveedor-filtrar">
      <input type="text" id="proveedor-input-filtrar" placeholder="..." autocomplete="off">
    </div>
    <table class="proveedor-tabla">
      <colgroup>
        <col class="col-proveedor-id">
        <col class="col-proveedor-proveedor">
        <col class="col-proveedor-ultimo">
        <col class="col-proveedor-funciones">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Proveedor</th>
          <th>Ultimo Movimiento</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody id="proveedor-tabla-body">
      </tbody>
    </table>
    <button class="proveedor-btn-agregar">Agregar Proveedor Nuevo</button> 
    `
   },
    onAbrir: function () {
      configurarProveedores();
    },
  'Depositos': {
    titulo: 'Registros > Depositos',
    body: `
    <label for="depositos-input-buscar" id="depositos-lab-buscar">Buscar Deposito:</label>
    <div class="combo-buscador" id="combo-depositos-buscar">
      <input type="text" id="depositos-input-buscar" placeholder="..." autocomplete="off">
    </div>
    <label for="depositos-select-filtrar" id="depositos-lab-filtrar">Filtrar Por:</label>
    <div class="combo-buscador" id="combo-depositos-filtrar">
      <input type="text" id="depositos-input-filtrar" placeholder="..." autocomplete="off">
    </div>
    <table class="depositos-tabla">
      <colgroup>
        <col class="col-depositos-id">
        <col class="col-depositos-deposito">
        <col class="col-depositos-cantidad">
        <col class="col-depositos-funciones">
      </colgroup>
      <thead>
        <tr>
          <th>ID</th>
          <th>Deposito</th>
          <th>Cantidad de Productos</th>
          <th>Funciones</th>
        </tr>
      </thead>
      <tbody id="depositos-tabla-body">
      </tbody>
    </table>
    <button class="depositos-btn-agregar">Agregar Deposito Nuevo</button> 
    `
   },
    onAbrir: function () {
      configurarDepositos();
    },
  'NuevoCliente':{
    titulo: 'Agregar > Agregar Cliente',
    body: `
    <label id="agregarcliente-lab-titulo">Agregar datos del Nuevo Cliente:</label>
    <hr class="agregarcliente-linea-agregarcliente-1">
    <label for="agregarcliente-input-nombre" id="agregarcliente-lab-nombre">Nombre:</label>
    <div class="combo-buscador" id="combo-agregarcliente-nombre">
      <input type="text" id="agregarcliente-input-nombre" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-documento" id="agregarcliente-lab-documento">- Numero de Documento:</label>
    <div class="combo-buscador" id="combo-agregarcliente-documento">
      <input type="text" id="agregarcliente-input-documento" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-telefono" id="agregarcliente-lab-telefono">Numero de Telefono:</label>
    <div class="combo-buscador" id="combo-agregarcliente-telefono">
      <input type="text" id="agregarcliente-input-telefono" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-correo" id="agregarcliente-lab-correo">- Correo Electronico:</label>
    <div class="combo-buscador" id="combo-agregarcliente-correo">
      <input type="text" id="agregarcliente-input-correo" placeholder="..." autocomplete="off">
    </div>
    <hr class="agregarcliente-linea-agregarcliente-2">
    <label for="agregarcliente-input-departamento" id="agregarcliente-lab-departamento">Departamento:</label>
    <div class="combo-buscador" id="combo-agregarcliente-departamento">
      <input type="text" id="agregarcliente-input-departamento" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-ciudad" id="agregarcliente-lab-ciudad">- Ciudad:</label>
    <div class="combo-buscador" id="combo-agregarcliente-ciudad">
      <input type="text" id="agregarcliente-input-ciudad" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-barrio" id="agregarcliente-lab-barrio">- Barrio:</label>
    <div class="combo-buscador" id="combo-agregarcliente-barrio"> 
      <input type="text" id="agregarcliente-input-barrio" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-direccion" id="agregarcliente-lab-direccion">- Direccion:</label>
    <div class="combo-buscador" id="combo-agregarcliente-direccion"> 
      <input type="text" id="agregarcliente-input-direccion" placeholder="..." autocomplete="off">
    </div>
    <hr class="agregarcliente-linea-agregarcliente-3">
    <label for="agregarcliente-input-clasificacion" id="agregarcliente-lab-clasificacion">Clasificacion:</label>
    <div class="combo-buscador" id="combo-agregarcliente-clasificacion"> 
      <input type="text" id="agregarcliente-input-clasificacion" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarcliente-input-nivel" id="agregarcliente-lab-nivel">- Nivel de Precio:</label>
    <div class="combo-buscador" id="combo-agregarcliente-nivel"> 
      <input type="text" id="agregarcliente-input-nivel" placeholder="..." autocomplete="off">
    </div>
    <button class="agregarcliente-btn-guardar-cliente">Guardar Cliente Nuevo</button>
    `
  },
    onAbrir: function () {
      configurarDepositos();
    },
  'NuevoProducto':{  
    titulo: 'Agregar > Agregar Producto',
    body: `
      <label id="agregarproducto-lab-titulo">Agregar datos del Nuevo Producto:</label>
      <hr class="agregarproducto-linea-agregarproducto-1">
      <label for="agregarproducto-input-nombre" id="agregarproducto-lab-nombre">Nombre del Producto:</label>
      <div class="combo-buscador" id="combo-agregarproducto-nombre">
        <input type="text" id="agregarproducto-input-nombre" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-referencia" id="agregarproducto-lab-referencia">- Referencia:</label>
      <div class="combo-buscador" id="combo-agregarproducto-referencia">
        <input type="text" id="agregarproducto-input-referencia" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-clasificacion" id="agregarproducto-lab-clasificacion">Clasificacion:</label>
      <div class="combo-buscador" id="combo-agregarproducto-clasificacion">
        <input type="text" id="agregarproducto-input-clasificacion" placeholder="..." autocomplete="off">
      </div>
      <hr class="agregarproducto-linea-agregarproducto-2">
      <label for="agregarproducto-input-marca" id="agregarproducto-lab-marca">Marca:</label>
      <div class="combo-buscador" id="combo-agregarproducto-marca">
        <input type="text" id="agregarproducto-input-marca" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-tamano" id="agregarproducto-lab-tamano">- Tamaño:</label>
      <div class="combo-buscador" id="combo-agregarproducto-tamano">
        <input type="text" id="agregarproducto-input-tamano" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-color" id="agregarproducto-lab-color">- Color:</label>
      <div class="combo-buscador" id="combo-agregarproducto-color"> 
        <input type="text" id="agregarproducto-input-color" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-proveedor" id="agregarproducto-lab-proveedor">Proveedor:</label>
      <div class="combo-buscador" id="combo-agregarproducto-proveedor"> 
        <input type="text" id="agregarproducto-input-proveedor" placeholder="..." autocomplete="off">
      </div>
      <hr class="agregarproducto-linea-agregarproducto-3">
      <label for="agregarproducto-input-costoa" id="agregarproducto-lab-costoa">Costo A:</label>
      <div class="combo-buscador" id="combo-agregarproducto-costoa"> 
        <input type="text" id="agregarproducto-input-costoa" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-costob" id="agregarproducto-lab-costob">- Costo B:</label>
      <div class="combo-buscador" id="combo-agregarproducto-costob"> 
        <input type="text" id="agregarproducto-input-costob" placeholder="..." autocomplete="off">
      </div>
      <hr class="agregarproducto-linea-agregarproducto-4">
      <label for="agregarproducto-input-precioa" id="agregarproducto-lab-precioa">- Precio A:</label>
      <div class="combo-buscador" id="combo-agregarproducto-precioa"> 
        <input type="text" id="agregarproducto-input-precioa" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-preciob" id="agregarproducto-lab-preciob">- Precio B:</label>
      <div class="combo-buscador" id="combo-agregarproducto-preciob"> 
        <input type="text" id="agregarproducto-input-preciob" placeholder="..." autocomplete="off">
      </div>
      <label for="agregarproducto-input-precioc" id="agregarproducto-lab-precioc">- Precio C:</label>
      <div class="combo-buscador" id="combo-agregarproducto-precioc"> 
        <input type="text" id="agregarproducto-input-precioc" placeholder="..." autocomplete="off">
      </div>
      <button class="agregarproducto-btn-guardar-producto">Guardar Producto Nuevo</button>
    `
  },
    onAbrir: function () {
      configurarDepositos();
    },
  'NuevoProveedor':{  
    titulo: 'Agregar > Agregar Proveedor',
    body: `
    <label id="agregarproveedor-lab-titulo">Agregar datos del Nuevo Proveedor:</label>
    <hr class="agregarproveedor-linea-agregarproveedor-1">
    <label for="agregarproveedor-input-nombre" id="agregarproveedor-lab-nombre">Nombre del Proveedor:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-nombre">
      <input type="text" id="agregarproveedor-input-nombre" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarproveedor-input-clasificacion" id="agregarproveedor-lab-clasificacion">- Clasificación:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-clasificacion">
      <input type="text" id="agregarproveedor-input-clasificacion" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarproveedor-input-razonsocial" id="agregarproveedor-lab-razonsocial">Razon Social:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-razonsocial">
      <input type="text" id="agregarproveedor-input-razonsocial" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarproveedor-input-ruc" id="agregarproveedor-lab-ruc">- RUC:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-ruc">
      <input type="text" id="agregarproveedor-input-ruc" placeholder="..." autocomplete="off">
    </div>
    <hr class="agregarproveedor-linea-agregarproveedor-2">
    <label for="agregarproveedor-input-numero" id="agregarproveedor-lab-numero">Numero:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-numero">
      <input type="text" id="agregarproveedor-input-numero" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarproveedor-input-correo" id="agregarproveedor-lab-correo">- Correo:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-numero">
      <input type="text" id="agregarproveedor-input-numero" placeholder="..." autocomplete="off">
    </div>
    <label for="agregarproveedor-input-direccion" id="agregarproveedor-lab-direccion">- Direccion:</label>
    <div class="combo-buscador" id="combo-agregarproveedor-direccion">
      <input type="text" id="agregarproveedor-input-direccion" placeholder="..." autocomplete="off">
    </div>
    <button class="agregarproveedor-btn-guardar-proveedor">Guardar Proveedor Nuevo</button>
    `
  },
    onAbrir: function () {
      configurarDepositos();
    },
  'NuevoDeposito':{  
    titulo: 'Agregar > Agregar Deposito',
    body: `
    <label id="agregardeposito-lab-titulo">Agregar datos del Nuevo Deposito:</label>
    <hr class="agregardeposito-linea-agregardeposito-1">
    <label for="agregardeposito-input-nombre" id="agregardeposito-lab-nombre">Nombre del Deposito:</label>
    <div class="combo-buscador" id="combo-agregardeposito-nombre">
      <input type="text" id="agregardeposito-input-nombre" placeholder="..." autocomplete="off">
    </div>
    <label for="agregardeposito-input-clase" id="agregardeposito-lab-clase">- Clase:</label>
    <div class="combo-buscador" id="combo-agregardeposito-clase">
      <input type="text" id="agregardeposito-input-clase" placeholder="..." autocomplete="off">
    </div>
    <label for="agregardeposito-input-ubicacion" id="agregardeposito-lab-ubicacion">-Ubicacion:</label>
    <div class="combo-buscador" id="combo-agregardeposito-ubicacion">
      <input type="text" id="agregardeposito-input-ubicacion" placeholder="..." autocomplete="off">
    </div>
    <button class="agregardeposito-btn-guardar-deposito">Guardar Deposito Nuevo</button>
    `
    }
};

function irA(seccion) {
  const datos = contenidoVentanas[seccion];

  // Si la sección todavía no tiene una ventana definida, mostramos un aviso simple.
  if (!datos) {
    alert('La ventana de "' + seccion + '" todavía no está definida.');
    return;
  }

  const inicializadores = {
    Proveedores: configurarProveedores,
    Depositos: configurarDepositos
  };
  abrirVentana(
    datos.titulo,
    datos.body,
    datos.onAbrir || inicializadores[seccion]
  );
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

// PRESUPUESTO

function configurarPresupuesto() {

  // Crear las 5 filas vacías
  inicializarTablaPresupuesto();

  const btnAnadir = document.querySelector('.presupuesto-btn-anadir');

  const inputProducto = document.getElementById(
        'presupuesto-input-producto'
    );

    const inputCantidad = document.getElementById(
        'presupuesto-input-cantidad'
    );

    const inputPrecio = document.getElementById(
        'presupuesto-input-preciounitario'
    );

    const hiddenProducto = document.getElementById(
        'presupuesto-select-producto-valor'
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
        agregarProductoTablaPresupuesto(
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
function inicializarTablaPresupuesto() {
    const tbody = document.getElementById('presupuesto-tabla-body');

    if (!tbody) return;

    tbody.innerHTML = '';

    // Cambiá este número para elegir cuántas filas mostrar.
    const cantidadFilas = 7;

    for (let i = 0; i < cantidadFilas; i++) {
        const fila = document.createElement('tr');

        fila.dataset.posicion = i;

        // Exactamente 6 celdas por fila.
        fila.innerHTML = `
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
function agregarProductoTablaPresupuesto(productoId, producto, cantidad, precio) {

    const tbody = document.getElementById('presupuesto-tabla-body');

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
function borrarProductoPresupuesto(icono) {

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

// COMPRA

function configurarCompra() {

    inicializarTablaCompra();

    const btnAnadir = document.querySelector('.compra-btn-anadir');
    const inputProducto = document.getElementById('compra-input-producto');
    const inputCantidad = document.getElementById('compra-input-cantidad');
    const inputCosto = document.getElementById('compra-input-costo');
    const hiddenProducto = document.getElementById('compra-select-producto-valor');

    btnAnadir.addEventListener('click', function () {
        const productoId = hiddenProducto.value;
        const productoTexto = inputProducto.value.trim();
        const cantidad = parseFloat(inputCantidad.value);
        const costo = parseFloat(inputCosto.value);

        if (!productoId) {
            alert('Seleccione un producto.');
            return;
        }

        if (!cantidad || cantidad <= 0) {
            alert('Ingrese una cantidad válida.');
            inputCantidad.focus();
            return;
        }

        if (!costo || costo <= 0) {
            alert('Ingrese un costo válido.');
            inputCosto.focus();
            return;
        }

        agregrarProductoCompra(productoId, productoTexto, cantidad, costo);

        inputProducto.value = '';
        hiddenProducto.value = '';
        inputCantidad.value = '';
        inputCosto.value = '';
    });
}

function inicializarTablaCompra() {
    const tbody = document.getElementById('compra-tabla-body');

    if (!tbody) return;

    tbody.innerHTML = '';

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
        `;
        tbody.appendChild(fila);
    }
}

function agregrarProductoCompra(productoId, producto, cantidad, costo) {
    const tbody = document.getElementById('compra-tabla-body');

    if (!tbody) return;

    const filas = tbody.querySelectorAll('tr');
    let filaDisponible = null;
    let posicion = -1;

    filas.forEach((fila, index) => {
        if (!fila.dataset.ocupada && !filaDisponible) {
            filaDisponible = fila;
            posicion = index;
        }
    });

    if (!filaDisponible) {
        filaDisponible = document.createElement('tr');
        posicion = filas.length;
        filaDisponible.dataset.posicion = posicion;
        tbody.appendChild(filaDisponible);
    }

    const total = cantidad * costo;

    filaDisponible.dataset.ocupada = 'true';
    filaDisponible.dataset.productoId = productoId;
    filaDisponible.innerHTML = `
        <td>${posicion + 1}</td>
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td>${formatearNumero(costo)}</td>
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
                onclick="borrarProductoCompra(this)"
            >
        </td>
    `;
}

function borrarProductoCompra(icono) {
    const fila = icono.closest('tr');

    if (!fila) return;

    if (confirm('¿Desea eliminar este producto?')) {
        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;

        delete fila.dataset.ocupada;
        delete fila.dataset.productoId;
    }
}

function inicializarTablaDevolucion() {
    const tbody = document.getElementById('devolucion-tabla-body');

    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        const fila = document.createElement('tr');
        fila.dataset.posicion = i;
        fila.innerHTML = `
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

function configurarDevolucion() {
    inicializarTablaDevolucion();
}

function configurarClientes() {
    inicializarTablaClientes();

    const btnAgregar = document.querySelector('.clientes-btn-agregar');

    btnAgregar.addEventListener('click', function () {

        // Identificar la ventana actual de Clientes
        const ventanaClientes = btnAgregar.closest('.gestion-ventana');

        // Abrir la ventana NuevoCliente
        irA('NuevoCliente');

        // Cerrar la ventana de Clientes
        if (ventanaClientes) {
            cerrarVentana(ventanaClientes.id);
        }

    });
}

function inicializarTablaClientes() {
    const tbody = document.getElementById('clientes-tabla-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        fila.dataset.posicion = i;
        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;
        tbody.appendChild(fila);
    }
}

function configurarProductos() {
    inicializarTablaProductos();

    const btnAgregar = document.querySelector('.productos-btn-agregar');

    btnAgregar.addEventListener('click', function () {

        // Identificar la ventana actual de Clientes
        const ventanaProductos = btnAgregar.closest('.gestion-ventana');

        // Abrir la ventana NuevoCliente
        irA('NuevoProducto');

        // Cerrar la ventana de Clientes
        if (ventanaProductos) {
            cerrarVentana(ventanaProductos.id);
        }

    });
}

function inicializarTablaProductos() {
    const tbody = document.getElementById('productos-tabla-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        fila.dataset.posicion = i;
        fila.innerHTML = `
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

function configurarProveedores() {
    inicializarTablaProveedores();

    const btnAgregar = document.querySelector('.proveedor-btn-agregar');

    btnAgregar.addEventListener('click', function () {

        // Identificar la ventana actual de Clientes
        const ventanaProveedores = btnAgregar.closest('.gestion-ventana');

        // Abrir la ventana NuevoCliente
        irA('NuevoProveedor');

        // Cerrar la ventana de Clientes
        if (ventanaProveedores) {
            cerrarVentana(ventanaProveedores.id);
        }

    });
}

function inicializarTablaProveedores() {
    const tbody = document.getElementById('proveedor-tabla-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        fila.dataset.posicion = i;
        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;
        tbody.appendChild(fila);
    }
}

function configurarDepositos() {
    inicializarTablaDepositos();

    const btnAgregar = document.querySelector('.depositos-btn-agregar');

    btnAgregar.addEventListener('click', function () {

        // Identificar la ventana actual de Clientes
        const ventanaDepositos = btnAgregar.closest('.gestion-ventana');

        // Abrir la ventana NuevoCliente
        irA('NuevoDeposito');

        // Cerrar la ventana de Clientes
        if (ventanaDepositos) {
            cerrarVentana(ventanaDepositos.id);
        }

    });
}

function inicializarTablaDepositos() {
    const tbody = document.getElementById('depositos-tabla-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        fila.dataset.posicion = i;
        fila.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `;
        tbody.appendChild(fila);
    }
}