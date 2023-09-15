import { ChangeEvent, MouseEventHandler } from "react"
import { Button } from "../ui/button"
import { TableHead, TableHeader, TableRow } from "../ui/table"
import { PlusIcon } from '@heroicons/react/24/outline'
import { Toggle } from "../ui/toggle"

export const FilesTableHeader = (props: { readonly isAddNewFile: boolean; setIsAddNewFile: (pressed: boolean) => void }) => {

  // const onAddNewFile: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   props.setIsAddNewFile(props.isAddNewFile);
  //   console.log(props.isAddNewFile)
  // }
  return <>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Filename</TableHead>
        <TableHead>Created</TableHead>
        <TableHead>Updated</TableHead>
        <TableHead className="text-right">File type
          <Toggle className="bg-primary text-white outline-1 rounded-full" onPressedChange={(pressed: boolean) => props.setIsAddNewFile(pressed)} ><PlusIcon className="w-6 h-6" /></Toggle>
        </TableHead>
      </TableRow>
    </TableHeader>
  </>
}
