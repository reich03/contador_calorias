type CaloriesListProps = {
  calories: number;
  text: string;
};
const CalorieDisplay = ({ calories, text }: CaloriesListProps) => {
  return (
    <>
      <p className="grid grid-cols-1 gap-3 font-bold text-white rounded-full tetx-center">
        <span className="text-6xl font-black text-orange">{calories}</span>
        {text}
      </p>
    </>
  );
};

export default CalorieDisplay;
