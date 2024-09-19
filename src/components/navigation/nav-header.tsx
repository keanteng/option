'use client';

import { OptionIcon} from 'lucide-react';
import ColorMode from '../colorMode/toggle-color-mode';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const navItems = [
  {
      label: 'Products',
      href: '/products',
  },
  {
    label: 'Orders',
    href: '/orders',
  }
];

export default function NavHeader() {
  const pathname = usePathname();
  return (
  <div
      className='flex top-0 z-50 backdrop-blur-md w-full p-3 border-b border-gray-300 shadow-sm'
  >
    <div className='flex justify-between w-full items-center'>
      <div className='flex flex-row gap-2 items-center'>
        <OptionIcon className='h-6 w-6' />
        <h1 className='text-lg text-bold hover:underline font-bold'>
          <Link
          href='/'
          >
            Option
          </Link>
          </h1>
      </div>
      <div>
        <ul className="flex flex-row items-center">
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={clsx(`p-1 px-4 rounded-md hover:underline`,
                        {
                            'underline' : pathname === item.href,
                        }
                    )}
                >
                    <li className="text-md">
                        {item.label}
                    </li>
                </Link>
            ))}
        </ul>
    </div>
      <div className='flex flex-row gap-3 items-center'>
        <Link href="#">
          <GitHubLogoIcon className='h-6 w-6' />
        </Link>
        <ColorMode />
      </div>
    </div>
  </div>
  )
}