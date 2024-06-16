import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/Categories";
import { Activities } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type ActivityFormsProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const Form = ({ dispatch, state }: ActivityFormsProps) => {
  const initialState: Activities = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };
  const [activity, setActivity] = useState<Activities>(initialState);
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateact) => stateact.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "save-activity",
      payload: { newActivity: activity },
    });
    setActivity(initialState);
  };
  return (
    <>
      <form
        className="p-10 space-y-5 bg-white rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="category" className="font-bold">
            Categoria:
          </label>
          <select
            id="category"
            className="w-full p-2 bg-white border rounded-lg border-slate-300 "
            value={activity.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {" "}
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Actividad:
          </label>
          <input
            type="text"
            id="name"
            className="p-2 border rounded-lg border-slate-300"
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calorias:
          </label>
          <input
            type="number"
            id="calories"
            className="p-2 border rounded-lg border-slate-300 "
            placeholder="Calorias. Ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="w-full p-2 font-bold text-white uppercase bg-gray-800 cursor-pointer hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
          value={`${
            activity.category === 1 ? "Guardar Comida " : "Guardar Ejercicio"
          }`}
          disabled={!isValidActivity()}
        />
      </form>
    </>
  );
};

export default Form;
