import {useState} from "preact/hooks";
import B2Cross from '../assets/burger_to_cross.svg'
import C2Burger from '../assets/cross_to_burger.svg'

interface CustomHeaderProps {
    className: string;
    links:
        {
            text: string,
            href: string
        }[]
}

function CustomHeader({className, links}: CustomHeaderProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className={`bg-gray-900 fixed w-screen top-0 ${className}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600 dark:text-teal-600" href="/">
                            <h1 className={'text-4xl text-white'}>MosCode</h1>
                        </a>
                    </div>

                    <div className="hidden sm:block ml-8 mr-auto">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-3 md:gap-6 text-[13px] tracking-tighter font-light md:tracking-normal md:text-[14px] lg:text-xl md:font-thin">
                                {links.map((link, key) => (
                                    <li key={key}>
                                        <a
                                            className="transition text-white hover:text-white/75"
                                            href={link.href}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4 mx-8 sm:mx-0">
                            <a
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-800"
                                href="tel:+7 (926) 127-35-53"
                            >
                                Позвонить
                            </a>

                            <div className="hidden sm:flex">
                                <a
                                    className="rounded-md px-5 py-2.5 text-sm font-medium bg-gray-800 text-white hover:text-white/75"
                                    href="https://t.me/u314d0or"
                                >
                                    Написать
                                </a>
                            </div>
                        </div>

                        <div className="sm:hidden flex flex-col">
                            <button
                                className={'absolute flex flex-col space-y-1 w-[48px] h-[48px] top-[8px] right-[8px]'}
                                onClick={() => setIsOpen(!isOpen)}>
                                <img src={isOpen ? B2Cross : C2Burger} className={'absolute w-full h-full'} alt={'12'}/>
                            </button>
                            <ul className={`${isOpen ? "absolute flex flex-col space-y-1 top-[80px] right-16 sm:right-10" : "hidden"}`}>
                                {links.map((link, key) => (
                                    <li key={key} className="block">
                                        <a
                                            href={link.href}
                                            className="block rounded-lg px-5 py-2.5 text-sm font-medium bg-gray-800 text-gray-200 text-center"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default CustomHeader;