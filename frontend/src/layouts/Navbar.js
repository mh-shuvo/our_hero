// App.js
import React from 'react';
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ProfileDropdown from '../components/ProfileDropdown'; // Adjust the path accordingly
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';
const navigation = [
  { name: 'Home', href: '/',current:true },
  { name: "Hero's", href: '/heros',current:false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hasUser = useSelector(state => state.auth.user);
  return <>
    <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Our Hero's</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className={classNames(
                item.current ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50 text-slate-100' : 'hover:bg-slate-300',
                'py-1 px-3 text-sm font-semibold leading-6 text-gray-900 rounded'
              )}
              aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
              
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ProfileDropdown loggedInUser={hasUser} />
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Our Hero's</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(item.current ? "bg-indigo-500 text-slate-100":"hover:bg-gray-50","mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900")}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <ProfileDropdown loggedInUser={hasUser} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  </>
}