import Link from "next/link";

export default function RaspberryPi() {
  return (
    <div>
      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl mb-8">
        <h2 className="card-title text-black pt-4 ">Raspberry Pi Primer</h2>
        <div className="card-body items-left text-center pt-2">
          <p className="text-black text-justify text-sm md:text-base">
            The Raspberry Pi is meant to act as the orchestrator of the whole
            system, and is reponsible for communicating with all of the
            different components. There is not much innovation to be done with
            the Raspberry Pi, just a series of child processes to handle/monitor
            each component and pass messages along will suffice. Here
            is the source code for Raspberry Pi.
          </p>
          <ul className="space-y-4 list-inside list-disc text-left text-sm md:text-base text-sky-800">
            <li>
              <Link
                className=" text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href="https://github.com"
              >
                Raspberry Pi Repository
              </Link>
            </li>
          </ul>
          <p className="text-black text-justify text-sm md:text-base">
            You were hoping for some sort of demo weren&apos;t you? Sike! There&apos;s
            nothing to demo for Raspberry Pi.
          </p>
          <p className="text-black font-bold font-sans">Acknowledgements</p>
          <ul className="text-sm md:text-base">
            <li>
              <Link
                className="text-black"
                href="https://github.com/CZ3004-Group-28"
              >
                Group 28 - For Raspberry Pi server design
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
