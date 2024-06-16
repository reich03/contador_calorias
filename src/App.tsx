import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(state?.activities));
  }, [state?.activities]);

  const canRestart = useMemo(() => {
    return state.activities.length === 0 ? true : false;
  }, [state.activities]);
  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="ml-2 text-lg font-bold text-center text-white uppercase md:ml-0">
            {" "}
            Contador de Calorias
          </h1>

          <button
            className=" mr-2 md:mr-0 py-[6px] px-5 bg-slate-600 hover:bg-slate-500 rounded-lg text-white uppercase disabled:opacity-10"
            disabled={canRestart}
            onClick={() =>
              dispatch({
                type: "restart-app",
              })
            }
          >
            Reiniciar
          </button>
        </div>
      </header>

      <section className="px-5 py-20 bg-lime-500">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>

      <section className="max-w-4xl p-10 mx-auto">
        <ActivityList activities={state?.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
