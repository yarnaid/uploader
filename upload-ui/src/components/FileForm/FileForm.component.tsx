import { filtersSelector } from "../../redux/filters.selector";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useFormContext } from "react-hook-form";
import { FileTags } from "./FileTags.tsx";

export const FileForm = () => {
  const filters = useSelector((state: RootState) => filtersSelector(state));
  const { control } = useFormContext();
  return <FileTags filters={filters} control={control} />;
};
