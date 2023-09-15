import './App.css'
import { NavBar } from './components/NavBar/NavBar.component'
import { FilesTable } from './components/FilesTable/FilesTable.component'
import { useGetFiltersQuery } from './api'


function App() {
  const filtersRequest = useGetFiltersQuery();
  return (
    <div className="flex flex-col">
      <NavBar />
      <FilesTable />
    </div>
  )
}

export default App
