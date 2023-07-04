import React from "react";
import TagsList from "./TagsList";

interface FilterProps {
  filter: { name: string; values: { value: string; checked: boolean }[] };
}

const Filter: React.FC<FilterProps> = ({ filter: { name, values } }) => {
  return (
    <div className="row">
      <div className="col-1">{name}:</div>
      <div className="col-1">
        <TagsList tags={values} name={name} />
      </div>
    </div>
  );
};

export default Filter;
