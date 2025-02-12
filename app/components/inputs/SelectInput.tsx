import Select, { StylesConfig } from "react-select";
import { SelectInputPropsType, TOption } from "../../utils/types/input.types";


const SelectInput = <TOptionValue, Multi extends boolean = false>({
  styles,
  label,
  ...props
}: SelectInputPropsType<TOptionValue, Multi>) => {
  const customStyles: StylesConfig<TOption<TOptionValue>, Multi> = {
    control: (base, { isFocused }) => ({
      ...base,
      borderColor: isFocused
        ? "var(--color-primary)"
        : "var(--color-primary-light)",
      boxShadow: isFocused ? "0 0 0 1px var(--color-primary)" : "none",
      "&:hover": { borderColor: "var(--color-primary)" },
      "&:focus": { borderColor: "var(--color-primary)" },
      borderRadius: "6px",
      padding: "4px 0",
      cursor: "pointer",
      fontSize: "16px",
    }),
    // placeholder: (base) => ({
    //     ...base,
    //     color: "var(--color-primary)",
    //   }),
    clearIndicator: (base) => ({
      ...base,
      color: "var(--color-danger)",
      opacity: "0.5",
      "&:hover": { color: "var(--color-danger)", opacity: "1" },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--color-primary)",
      "&:hover": { color: "var(--color-primary)" },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "var(--color-primary)",
    }),

    //   multiValue: (styles) => {
    //     return {
    //       ...styles,
    //       backgroundColor: "var(--color-primary)",
    //       color: "var(--color-primary-light)"
    //     };
    //   },
    multiValueLabel: (styles) => ({
      ...styles,
      background: "var(--color-primary-light)",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "var(--color-label)",
      background: "var(--color-primary-light)",
      ":hover": {
        color: "var(--color-danger)",
      },
    }),
    //   singleValue: (styles, { data }) => ({ ...styles, color: "var(--color-primary)" }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "var(--color-primary)"
        : isFocused
        ? "var(--color-primary-light)"
        : "",
      color: isSelected ? "white" : "var(--color-text)",
      cursor: "pointer",
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select<TOption<TOptionValue>, Multi> styles={{ ...customStyles, ...styles }} {...props} />
    </div>
  );
};

export default SelectInput;
