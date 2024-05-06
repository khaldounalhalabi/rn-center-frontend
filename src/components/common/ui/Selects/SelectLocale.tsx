import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

export default function SelectedLocale({
  locales = ["en", "ar"],
  className,
  setSelectedLocale,
}: {
  locales: string[];
  className: string;
  setSelectedLocale?: any;
}) {
  const [selectedLocale, setSelected] = useState<string>("en");
  return (
    <div className={className}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium  hover:bg-black/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {selectedLocale?.toLocaleUpperCase()}
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
          <Menu.Items className="absolute z-20 right-0 mt-2 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {locales?.map((e, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      type={"button"}
                      onClick={(s) => {
                        setSelectedLocale(e);
                        setSelected(e);
                      }}
                      className={`${
                        active ? " bg-blue-500  text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                    >
                      {e?.toLocaleUpperCase()}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
