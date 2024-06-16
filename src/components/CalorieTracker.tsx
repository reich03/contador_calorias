import { useMemo } from "react";
import { Activities } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type ActivityCaloriesProps = {
  activities: Activities[];
};
const CalorieTracker = ({ activities }: ActivityCaloriesProps) => {
  const caloriesConsume = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories=useMemo(() => caloriesConsume - caloriesBurned, [activities])
  return (
    <>
      <h2 className="text-4xl font-black text-center text-white">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-between">
        <CalorieDisplay calories={caloriesConsume} text="Consumidas" />       
        <CalorieDisplay calories={caloriesBurned} text="Quemadas" />       
        <CalorieDisplay calories={netCalories} text="Diferencia" />       

      </div>
    </>
  );
};

export default CalorieTracker;
