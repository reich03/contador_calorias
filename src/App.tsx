import Form from "./components/Form";

function App() {
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            {" "}
            Contador de Calorias
          </h1>

          <button className="py-[6px] px-5 bg-slate-600 hover:bg-slate-500 rounded-lg text-white uppercase">
            Reiniciar
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>
    </>
  );
}

export default App;
