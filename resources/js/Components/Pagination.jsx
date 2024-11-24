import {Link} from "@inertiajs/react";


export default function Pagination({links}) {
  return (
    <nav className="text-center mt-4 text-gray-200">
      {links.map((link) => (
        <Link
          preserveScroll={true}
          href={link.url || " "}
          key={link.label}
          className={"inline-block py-2 px-3 rounded-lg text-gray-200 text-sm " +
            (link.active ? "bg-gray-700 " : " ") +
            (!link.url ? "text-gray-500 cursor-not-allowed " : "hover:bg-gray-700")
          }
          dangerouslySetInnerHTML={{__html: link.label}}/>
      ))}
    </nav>
  )
}
