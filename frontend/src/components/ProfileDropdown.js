// ProfileDropdown.js
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../actions'
import { useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileDropdown({ loggedInUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleSignout = ()=>{
    localStorage.removeItem("authUser");
    dispatch(logout())
    navigate("/")
  }

  if (!loggedInUser) {
    return (
      <Link
        to="/login"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="relative rounded-full bg-white p-1 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-white"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-white">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
              {({ active }) => (
               <p className='fw-bold ml-4'>{loggedInUser?.name}</p>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link to={"/upload-hero"}
                  href="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Upload Hero
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button type="button" onClick={handleSignout}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
