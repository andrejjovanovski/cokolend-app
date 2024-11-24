import { Link } from '@inertiajs/react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    to, // for internal routing
    href, // for external links
    children,
    ...props
}) {
    const baseClassName =
        `inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800 ${disabled && 'opacity-25'
        } ` + className;

    if (to) {
        // Render a React Router Link for internal navigation
        return (
            <Link
                to={to}
                className={baseClassName}
                {...props}
            >
                {children}
            </Link>
        );
    }

    if (href) {
        // Render an anchor tag for external links
        return (
            <a
                href={href}
                className={baseClassName}
                {...props}
            >
                {children}
            </a>
        );
    }

    // Default to a button
    return (
        <button
            type={type}
            className={baseClassName}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
