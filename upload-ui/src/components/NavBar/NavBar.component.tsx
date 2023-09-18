import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Input } from "../ui/input";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setSearchFilter } from "../../redux/searchFilter.slice.ts";
import {
  FormEventHandler,
  EventHandler,
  SyntheticEvent,
  ChangeEventHandler,
} from "react";
import { ChangeHandler } from "react-hook-form";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const onSearchSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchFilter(e.target[0].value));
  };
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setSearchFilter(e.target.value));
  };
  return (
    <>
      <div className="flex flex-row gap-2">
        {/*<ArrowUpTrayIcon className="h-6 w-6" />*/}
        <span className="text-2xl">Upload&nbsp;Tool</span>
        <form className="flex w-full" onSubmit={onSearchSubmit}>
          <Input
            type="text"
            placeholder="File search"
            onChange={onSearchInputChange}
          />
          <Button type="submit" className="bg-primary text-white">
            <FunnelIcon className="h-6 w-6" />
          </Button>
        </form>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};
