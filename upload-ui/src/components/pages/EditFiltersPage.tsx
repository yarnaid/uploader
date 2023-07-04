import React from "react";
import { useSelector } from "react-redux";
import { FilterType } from "../../types";
import Tag from "../Tag";
import { useDispatch } from "react-redux";
import NewTag from "../NewTag";
import NewFilter from "../NewFilter";
import Container from "react-bootstrap/Container";
import { removeFilter } from "../../redux/reducers/filters";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: { filters: FilterType[] }) => state.filters
  );

  const onRemoveFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
    value: string
  ) => {
    e.preventDefault();
    dispatch(removeFilter({ name, values: [value] }));
  };
  return (
    <Container>
      <NewFilter />
      <div>
        {filters.map((filter, index) => {
          return (
            <div
              key={filter.name}
              className="row"
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent",
              }}
            >
              <h3 className="col-md-2">{filter.name}</h3>

              <div className="col-md-8">
                {filter.values.map((value: string) => (
                  <Tag
                    key={value}
                    value={value}
                    name={filter.name}
                    checked={true}
                    onClick={onRemoveFilter}
                  />
                ))}
                <NewTag name={filter.name} />
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Filters;
