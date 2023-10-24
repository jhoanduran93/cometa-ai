import { Icon } from './lib/chakra';
import {
  MdFileCopy,
  MdHome,
  MdLock,
  MdLayers,
  MdAutoAwesome,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { LuHistory } from 'react-icons/lu';
import { RoundedChart } from '@/components/icons/Icons';
// import { FcIdea } from 'react-icons/fc';

// Auth Imports
import { IRoute } from './types/navigation';

const routes: IRoute[] = [
  {
    name: 'Cometa AI',
    path: '/chat',
    icon: (
      <Icon as={MdAutoAwesome} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  {
    name: 'Ver Tips',
    path: '/article',
    icon: (
      <Icon as={MdLayers} width="20px" height="20px" color="inherit" />
    ),
    collapse: false,
  },
  // --- Others ---
  {
    name: 'Obtener una cuenta',
    path: '/others',
    icon: <Icon as={MdOutlineManageAccounts} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Regístrese',
        layout: '/others',
        path: '/register',
      },
      {
        name: 'Iniciar sesión',
        layout: '/others',
        path: '/sign-in',
      },
    ],
  },
  {
    name: 'Profile Settings',
    path: '/settings',
    icon: (
      <Icon
        as={MdOutlineManageAccounts}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    invisible: true,
    collapse: false,
  },
  {
    name: 'History',
    path: '/history',
    icon: <Icon as={LuHistory} width="20px" height="20px" color="inherit" />,
    invisible: true,
    collapse: false,
  },

];

export default routes;
