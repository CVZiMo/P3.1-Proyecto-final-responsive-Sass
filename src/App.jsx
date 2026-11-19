import { useState } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");
  const [elegida, setElegida] = useState(null);
  const [girando, setGirando] = useState(false);
  const [vista, setVista] = useState("");
  const [ruletaAbierta, setRuletaAbierta] = useState(false);

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

  const hayPendientes = tareas.some((t) => !t.hecha);

  return (
    <div className="contenedor">
      <header className="cabecera">
        <h1 className="marca">Apuestareas</h1>
        <p className="lema">Si no te puedes decidir, que lo decida tu suerte.</p>
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
          <form className="formulario" onSubmit={agregar}>
            <input
              type="text"
              placeholder="Nueva tarea..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button type="submit">Añadir</button>
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
            Sortear tarea
          </button>
        </aside>
      </main>

      <footer>Práctica 3.1 - Diseño de Interfaces</footer>

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