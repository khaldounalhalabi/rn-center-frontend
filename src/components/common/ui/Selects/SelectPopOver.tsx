import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";



export default function SelectPopOver({id, status ,ArraySelect,handleSelect}:{ id:number|undefined,status:string |undefined,ArraySelect:string[],handleSelect:any}) {
  const [selected, setSelected] = useState(status);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative cursor-pointer w-full  rounded-lg bg-white py-2 pl-6 pr-6 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className={`block truncate ${status == "checkout"?"text-neutral":status == "cancelled"?"text-warning":status == "pending"?"text-primary":status == "checkin"?"text-success":status=="booked"?"text-error":status=="completed"?"text-info":""}`}>{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {ArraySelect.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative select-none py-2 text-center cursor-pointer ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                onClick={() => {
                  handleSelect(person, id);
                }}
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}