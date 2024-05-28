"use client";
import { Fragment, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { FaRegBell, FaBars } from "react-icons/fa";
import { IoCartOutline, IoClose, IoSearchOutline } from "react-icons/io5";
import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions';
import logo from "../../../../public/imgs/wilmerdev-logo.jpg";
import Image from "next/image";
import ContactBtn from './ContactBtn';

const navigation = [
  { name: 'Men', href: "/gender/men", current: false },
  { name: 'Women', href: "/gender/women", current: false },
  { name: 'Kids', href: "/gender/kid", current: false }
]

function classNames(classes: string | string[]): string {
  if (typeof classes == "string") {
    return classes;
  }
  return classes.filter(Boolean).join(' ')
}

export default function TopMenu() {
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <IoClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold text-white`}>
                      Wilmer dev
                    </span>
                    <span className='text-white'> | Shop</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : ['text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href="/search" className="mx-2 text-white">
                  <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link href={
                  ((totalItemsInCart === 0) && loaded)
                    ? '/empty'
                    : "/cart"
                } className="mx-2 text-white">
                  <div className="relative">
                    {(loaded && totalItemsInCart > 0) && (
                      <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                        {totalItemsInCart}
                      </span>
                    )}
                    <IoCartOutline className="w-5 h-5" />
                  </div>
                </Link>
                <ContactBtn />
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={logo}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <div className="relative mt-14">
                            <IoSearchOutline size={20} className="absolute top-2 left-2" />
                            <input
                              type="text"
                              placeholder="Buscar"
                              className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        )}
                      </MenuItem>
                      {isAuthenticated && (
                        <>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/profile"
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Profile
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/orders"
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Orders
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <button
                                onClick={() => logout()}
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Log out
                              </button>
                            )}
                          </MenuItem>
                        </>)}
                      {!isAuthenticated && (
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href="/auth/login"
                              className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                            >
                              Sign in
                            </Link>
                          )}
                        </MenuItem>
                      )}
                      {isAdmin && (
                        <>
                          <div className="w-full h-px bg-gray-200 my-10" />
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/admin/products"
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Products
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/admin/orders"
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Orders
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ focus }) => (
                              <Link
                                href="/admin/users"
                                className={classNames(focus ? 'bg-gray-100' : ['', 'block px-4 py-2 text-sm text-gray-700'])}
                              >
                                Users
                              </Link>
                            )}
                          </MenuItem>
                        </>)}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : ['text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium']
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
