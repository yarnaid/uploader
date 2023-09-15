import Select from 'react-select'
import { filtersSelector } from '../../redux/filters.selector'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Controller, useFormContext } from 'react-hook-form'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export const FileForm = () => {
  const filters = useSelector((state: RootState) => filtersSelector(state));
  const { control } = useFormContext();
  return <div className="flex flex-row">
    {filters && filters.map((filter) => {
      return <div key={filter.name}>
        <Controller
          control={control}
          name={`tags.${filter.name}`}
          render={({ field }) => (
            <Select
              isMulti
              {...field}
              options={filter.values.map(value => ({ value: value, label: value }))}
              placeholder={filter.name}
            />
          )}
        />
      </div>
    }
    )
    }
  </div>

  return <Select options={options} />
}
