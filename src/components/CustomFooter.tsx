import {route} from "preact-router";

interface CustomFooterProps {
    links:
        {
            text: string,
            href: string
        }[]

}

const CustomFooter = ({links}: CustomFooterProps) => {

    return (
        <footer className="bg-gray-900">
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
                    <a
                        className="inline-block rounded-full p-2 text-white shadow transition sm:p-3 lg:p-4 bg-gray-800 hover:bg-gray-600"
                        href={links[0].href}
                        onClick={_ => route(`/a`)}
                    >
                        <span className="sr-only">Back to top</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>

                <div className="lg:flex lg:items-end lg:justify-between">
                    <div>

                        <p
                            className="mx-auto mt-6 max-w-md text-center leading-relaxed lg:text-left text-gray-400"
                        >
                            Наша команда состоит из опытных профессионалов, нацеленных на предоставление
                            высококачественных услуг.
                            Мы открыты к бартеру и работе на общественных началах, стремясь оказывать положительное
                            влияние на наше сообщество и помогать в росте бизнеса.
                            Оставьте свои контактные данные, и мы с вами свяжемся!
                        </p>
                    </div>

                    <ul
                        className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
                    >
                        {links.map((link, key) => (
                            <li key={key}>
                                <a
                                    className=" transition  text-white hover:text-white/75"
                                    href={link.href}
                                    onClick={_ => route(`/a`)}
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="mt-12 text-center text-sm lg:text-right text-gray-400">
                    Copyright &copy; 2024. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default CustomFooter;