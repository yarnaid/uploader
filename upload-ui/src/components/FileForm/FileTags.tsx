import { FilterType } from "../../types.ts";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";

export const FileTags = (props: {
  filters: FilterType[];
  control: Control;
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {props.filters &&
        props.filters.map((filter) => {
          return (
            <div key={filter.name}>
              <Controller
                control={props.control}
                name={`tags.${filter.name}`}
                render={({ field }) => (
                  <Select
                    isMulti
                    {...field}
                    options={filter.values.map((value) => ({
                      value: value,
                      label: value,
                    }))}
                    placeholder={filter.name}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  />
                )}
              />
            </div>
          );
        })}
    </div>
  );
};
