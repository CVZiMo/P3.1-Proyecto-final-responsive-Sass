import { useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");
  const [elegida, setElegida] = useState(null);
  const [girando, setGirando] = useState(false);
  const [vista, setVista] = useState("");
  const [ruletaAbierta, setRuletaAbierta] = useState(false);
  const [detalleId, setDetalleId] = useState(null);
  const [textoDetalle, setTextoDetalle] = useState("");

  function agregar(e) {
    e.preventDefault();
    if (texto.trim() === "") return;
    setTareas([...tareas,
      { id: Date.now(), nombre: texto.trim(), descripcion: "", hecha: false },
    ]);
    setTexto("");
  }

  function borrar(id) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  function marcar(id) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  function sortear() {
    const pendientes = tareas.filter((t) => !t.hecha);
    if (pendientes.length === 0) return;

    setGirando(true);
    let veces = 0;

    const intervalo = setInterval(() => {
      const azar = pendientes[Math.floor(Math.random() * pendientes.length)];
      setVista(azar.nombre);
      veces++;

      if (veces >= 15) {
        clearInterval(intervalo);
        setGirando(false);
        setElegida(azar);
      }
    }, 100);
  }

  function terminarElegida() {
    marcar(elegida.id);
    setElegida(null);
  }

  function abrirRuleta() {
    setRuletaAbierta(true);
  }

  function cerrarRuleta() {
    setRuletaAbierta(false);
  }

  function abrirDetalles(tarea) {
    setDetalleId(tarea.id);
    setTextoDetalle(tarea.descripcion);
  }

  function cerrarDetalles() {
    setDetalleId(null);
    setTextoDetalle("");
  }

  const hayPendientes = tareas.some((t) => !t.hecha);

  return (
    <div className="contenedor">
      <header className="cabecera">
        <h1 className="marca">BumbleTasks</h1>
        <p className="lema">¡Apuesta apuesta apuesta! ¡Gana gana gana!</p>
        <nav className="pestanas">
          <button
            className={ruletaAbierta ? "pestana" : "pestana activa"}
            onClick={cerrarRuleta}
          >
            Listado
          </button>
          <button
            className={ruletaAbierta ? "pestana activa" : "pestana"}
            onClick={abrirRuleta}
          >
            Ruleta
          </button>
        </nav>
      </header>

      <main>
        <section>
          <div className="portada">
            <p className="etiqueta">Si no te puedes decidir, que lo haga tu suerte:</p>
            <h2>Apunta lo que tienes pendiente.</h2>
          </div>

          <form className="formulario" onSubmit={agregar}>
            <div className="fila">
              <input id="nueva-tarea" type="text" placeholder="Escribe una nueva tarea..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
              />
              <button type="submit">+ Añadir tarea</button>
            </div>
          </form>

          <ul className="lista">
            {tareas.map((t) => (
              <li key={t.id} className={t.hecha ? "hecha" : ""}>
                <input
                  type="checkbox"
                  checked={t.hecha}
                  onChange={() => marcar(t.id)}
                />
                <span>{t.nombre}</span>
                <button className="borrar" onClick={() => borrar(t.id)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="ruleta">
          <h2>¿Qué hago ahora?</h2>
          <div className="pantalla">
            {girando ? vista : "Pulsa el botón"}
          </div>
          <button onClick={sortear} disabled={!hayPendientes || girando}>
            Apostar por la tarea
          </button>
        </aside>
      </main>

      <footer>Diseño de interfaces web · 2026</footer>

      {elegida && (
        <div className="fondo-modal">
          <div className="modal">
            <h2>Te toca...</h2>
            <p className="tarea-elegida">{elegida.nombre}</p>
            <div className="botones">
              <button className="ok" onClick={terminarElegida}>
                Hecha
              </button>
              <button className="cerrar" onClick={() => setElegida(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;