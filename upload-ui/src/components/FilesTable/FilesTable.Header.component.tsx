import { ChangeEvent, MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Toggle } from "../ui/toggle";

export const FilesTableHeader = (props: {
  readonly isAddNewFile: boolean;
  setIsAddNewFile: (pressed: boolean) => void;
}) => {
  // const onAddNewFile: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.preventDefault();
  //   props.setIsAddNewFile(props.isAddNewFile);
  //   console.log(props.isAddNewFile)
  // }
  return (
    <>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead>Filename</TableHead>
          <TableHead className="text-right">Created</TableHead>
          <TableHead className="text-right">Updated</TableHead>
          <TableHead className="flex flex-row items-center justify-between text-left">
            File type
            <Toggle
              className="rounded-full bg-primary text-white outline-1"
              onPressedChange={(pressed: boolean) =>
                props.setIsAddNewFile(pressed)
              }
            >
              <PlusIcon className="h-6 w-6" />
            </Toggle>
          </TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
};
