import EyeIcon from "../Icons/EyeIcon";

type ActionColumnProps<T> = {
  onView?: () => void;
};

const ActionColumn = <T,>({ onView }: ActionColumnProps<T>) => {
  return (
    <div className="flex gap-4">
      {onView && (
        <button onClick={onView} className="text-primary">
          <EyeIcon />
        </button>
      )}
    </div>
  );
};

export default ActionColumn;
