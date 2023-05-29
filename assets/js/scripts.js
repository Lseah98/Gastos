    // Variables globales para el presupuesto y los gastos
    let presupuesto = 0;
    let gastos = [];

    // Función para guardar el presupuesto ingresado
    function guardarPresupuesto() {
      presupuesto = parseFloat(document.getElementById('presupuestoInput').value);
      document.getElementById('presupuestoTotal').textContent = presupuesto.toFixed(2);
      document.getElementById('saldoRestante').textContent = presupuesto.toFixed(2);
    }

    // Función para agregar un nuevo gasto
    function agregarGasto() {
      const descripcion = document.getElementById('descripcionInput').value;
      const monto = parseFloat(document.getElementById('montoInput').value);

      // Verificar que se haya ingresado un monto válido
      if (!isNaN(monto) && monto > 0) {
        gastos.push({ descripcion, monto });
        actualizarResumen();
        actualizarTabla();
        limpiarCampos();
      }
    }

    // Función para actualizar el resumen de presupuesto y gastos
    function actualizarResumen() {
      let totalGastos = 0;

      // Calcular el total de gastos
      for (let i = 0; i < gastos.length; i++) {
        totalGastos += gastos[i].monto;
      }

      // Actualizar el resumen en la página
      document.getElementById('totalGastos').textContent = totalGastos.toFixed(2);

      // Calcular el saldo restante
      const saldoRestante = presupuesto - totalGastos;
      document.getElementById('saldoRestante').textContent = saldoRestante.toFixed(2);
    }

    // Función para actualizar la tabla de gastos
    function actualizarTabla() {
      const tabla = document.getElementById('tablaGastos');
      tabla.innerHTML = `
        <tr>
          <th class="px-2">Descripción</th>
          <th class="px-2">Monto</th>
          <th class="px-2">Acciones</th>
        </tr>
      `;

      for (let i = 0; i < gastos.length; i++) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td class="px-2">${gastos[i].descripcion}</td>
          <td class="px-2">${gastos[i].monto.toFixed(2)}</td>
          <td class="px-2"><button onclick="eliminarGasto(${i})">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
      }
    }

    // Función para eliminar un gasto
    function eliminarGasto(index) {
      gastos.splice(index, 1);
      actualizarResumen();
      actualizarTabla();
    }

    // Función para limpiar los campos de ingreso de gastos
    function limpiarCampos() {
      document.getElementById('descripcionInput').value = '';
      document.getElementById('montoInput').value = '';
    }