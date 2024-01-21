import { BackpackIcon, DragHandleDots1Icon, GearIcon, Link2Icon, PersonIcon, StarFilledIcon } from '@radix-ui/react-icons'

export const data = [
    {
      title: "Upgrade",
      icon: <StarFilledIcon className='h-5 w-5' />,
      link: '/pricing'
    },
    {
      title: "Dashboard",
      icon: <DragHandleDots1Icon className='h-5 w-5' />,
      link: '/app'
    },
    {
      title: "Clients",
      icon: <BackpackIcon className='h-5 w-5' />,
      link: '/app/clients'
    },
    {
      title: "Admin",
      icon: <GearIcon  className='h-5 w-5'/>,
      link: '/app/admin'
    },
    {
      title: "Data Source",
      icon: <Link2Icon className='h-5 w-5' />,
      link: '/app/data-source'
    },
    {
      title: "Contacts",
      icon: <PersonIcon className='h-5 w-5' />,
      link: '/app/contacts'
    },
  ]