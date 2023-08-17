import React, { useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Simulator from "./Simulator";
import ImageRec from "./ImageRec";
import RaspberryPi from "./RaspberryPi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="relative py-4 z-10 px-2 flex lg:px-0 ">
        <div className="h-28 md:h-28 m-auto lg:h-28">
          <Image
            alt="Banner"
            src="/MDP.png"
            fill
            className="px-3 py-3"
            style={{ objectFit: "contain" }}
          />
        </div>
        
      </div>
      <h1 className="flex flex-col items-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-sky-900 via-sky-900 to-sky-900 py-4 ">
            CZ3004/SC2079: MDP
          </span>
          
        </h1>
      <div className="px-2  sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-teal-900/20 p-1">
            <Tab
              key="Algorithm"
              className={({ selected }) =>
                classNames(
                  "w-2/6 rounded-xl py-2.5 text-sm font-medium leading-5 ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-blue-700"
                    : "hover:bg-white/[0.12] hover:text-white text-white"
                )
              }
            >
              <div className="flex flex-col items-center">
                <Image
                  src={"/Map.png"}
                  alt="gowhere"
                  width={100}
                  height={100}
                />
                Algorithm
              </div>
            </Tab>

            <Tab
              key="Symbol Recognition"
              className={({ selected }) =>
                classNames(
                  "w-2/6 rounded-xl py-2.5 text-sm font-medium leading-5 ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-blue-700"
                    : "hover:bg-white/[0.12] hover:text-white text-white"
                )
              }
            >
              {" "}
              <div className="flex flex-col items-center">
                <Image
                  src={"/Eye.png"}
                  alt="symbol recognition"
                  width={100}
                  height={100}
                />
                Symbol Recognition
              </div>
            </Tab>

            <Tab
              key="Raspberry Pi"
              className={({ selected }) =>
                classNames(
                  "w-2/6 rounded-xl py-2.5 text-sm font-medium leading-5 ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow text-blue-700"
                    : "hover:bg-white/[0.12] hover:text-white text-white"
                )
              }
            >
              <div className="flex flex-col items-center">
                <Image
                  src={"/RPi1.png"}
                  alt="gowhere"
                  width={100}
                  height={100}
                />
                Raspberry Pi
              </div>
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-2">
            <Tab.Panel
              key={1}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2"
              )}
            >
              <Simulator/>
            </Tab.Panel>
            <Tab.Panel
              key={2}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2"
              )}
            >
              <ImageRec/>
            </Tab.Panel>
            <Tab.Panel
              key={3}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400 focus:outline-none focus:ring-2"
              )}
            >
              <RaspberryPi/>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
