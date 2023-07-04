import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType } from "../types";
import Filter from "./Filter";
import { addFilter } from "../redux/reducers/filters";

interface FiltersListProps {}

type DisplayValue = {
  value: string;
  checked: boolean;
};

const FiltersList: React.FC<FiltersListProps> = () => {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: { filters: FilterType[] }) => state.filters
  );
  const tags = useSelector((state: { tags: FilterType[] }) => state.tags);
  const metadata = useSelector((state: { metadata: any }) => state.metadata);

  const [valuesToDisplay, setValuesToDisplay] = useState<
    { name: string; values: DisplayValue[] }[]
  >([]);

  useEffect(() => {
    const filtersToDisplay: FilterType[] = [...filters];
    tags.forEach((tag) => {
      const filter = filters.find((filter) => filter.name === tag.name);
      if (!filter) {
        filtersToDisplay.push(tag);
        dispatch(addFilter(tag));
      }
    });

    const updatedValuesToDisplay: { name: string; values: DisplayValue[] }[] =
      [];
    for (const filter of filtersToDisplay) {
      const displayValues: DisplayValue[] = [];
      for (const value of filter.values) {
        const checked =
          tags
            .find((tag) => tag.name === filter.name)
            ?.values.includes(value) || false;
        displayValues.push({ value, checked });
      }
      updatedValuesToDisplay.push({ name: filter.name, values: displayValues });
    }
    setValuesToDisplay(updatedValuesToDisplay);
  }, [dispatch, filters, tags, metadata]);

  return (
    <>
      {valuesToDisplay.map(
        (filter: { name: string; values: DisplayValue[] }) => (
          <Filter key={filter.name} filter={filter} />
        )
      )}
    </>
  );
};

export default FiltersList;
