import B2Cross from "../assets/burger_to_cross.svg";
import C2Burger from "../assets/cross_to_burger.svg";
import {StateUpdater} from "preact/hooks";

interface BurgerMenuProps {
    isOpen: boolean,
    setIsOpen: StateUpdater<boolean>,
    links: {href: string, text: string}[],
    className: string,
}

const BurgerMenu = ({isOpen, setIsOpen, links, className}: BurgerMenuProps) => {
    return (
        <div className={className + " flex flex-col"}>
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
    );
};

export default BurgerMenu;