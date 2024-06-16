import { useMemo, Dispatch } from "react";
import { Activities } from "../types";
import { categories } from "../data/Categories";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  activities: Activities[];
  dispatch: Dispatch<ActivityActions>;
};
const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activities["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmpty = useMemo(() => activities.length === 0, [activities]);
  return (
    <>
      <h2 className="text-4xl font-bold text-center text-slate-600">
        Comidas y Actividades
      </h2>

      {isEmpty ? (
        <p className="my-5 text-xl font-bold text-center text-lime-500">
          {" "}
          Estan vacias tus actividades aun..
        </p>
      ) : (
        activities.map((activity: Activities) => (
          <div
            key={activity.id}
            className="flex justify-between px-5 py-10 mt-5 bg-white rounded-md shadow-sm"
          >
            <div className="relative space-y-2">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-s-md ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className="pt-5 text-2xl font-bold">{activity.name}</p>
              <p className="text-4xl font-black text-lime-500">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activedId",
                    payload: {
                      id: activity.id,
                    },
                  })
                }
              >
                <PencilSquareIcon className="w-8 h-8 text-gray-800" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: {
                      id: activity.id,
                    },
                  })
                }
              >
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ActivityList;
