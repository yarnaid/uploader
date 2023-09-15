import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { Input } from "../ui/input"
import { FunnelIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"

export const NavBar = () => {
  return <>
    <div className="flex flex-row gap-2">
      <ArrowUpTrayIcon className="w-6 h-6" />
      <span className='text-2xl'>Upload!</span>
      <Input type="text" placeholder="File search" />
      <Button className="bg-primary text-white"><FunnelIcon className='w-6 h-6' /></Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  </>
}
