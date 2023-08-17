export default function Footer() {
  return (
    <footer className="bg-sky-200 rounded-lg shadow w-screen mt-2">
      <div className="w-screen mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center ">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Pye Sone Kyaw
          </a>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
          <li>
            <a
              href="https://github.com/pyesonekyaw"
              className="mr-4 hover:underline md:mr-6 "
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pyesonekyaw/"
              className="mr-4 hover:underline md:mr-6 "
            >
              LinkedIn
            </a>
            <a
              href="https://huggingface.co/pyesonekyaw"
              className="mr-4 hover:underline md:mr-6 "
            >
              HuggingFace
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
