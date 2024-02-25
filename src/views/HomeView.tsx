import {Ref, useEffect, useRef, useState, StateUpdater} from "preact/hooks";
import CustomTile from "../components/CustomTile.tsx";

import SpeedSVG from '../assets/speed.svg'
import GearSVG from '../assets/gear.svg'
import ClockSVG from '../assets/clock.svg'
import BlocksSVG from '../assets/blocks.svg'

import WebSVG from '../assets/web.svg'
import TelegramSVG from '../assets/telegram.svg'
import MobilePhoneSVG from '../assets/mobile-phone.svg'
import DesignSVG from '../assets/design.svg'

import CustomModal from "../components/CustomModal.tsx";

interface HomeViewProps {
    setPathname:  StateUpdater<string>
}

export const HomeView = ({setPathname}: HomeViewProps) => {
    const reasonsTiles = [
        {
            title: 'Производительность',
            description: "В среднем сайт, написанный при помощи кода, а не конструктора, значительно производительнее. " +
                "Это влияет как на скорость загрузки, так и на общее впечатление от использования. " +
                "Оба этих фактора, в соответствии с исследованиями, многократно увеличивают конверсию веб-сайта.",
            tags: [
                "Вебсайт", "Конструктор"
            ],
            icon: {
                src: SpeedSVG,
                alt: 'speed'
            }
        },
        {
            title: 'Поддержка',
            description: "Мы гарантируем год поддержки вебсайта, " +
                "включая восстановление сервера в случае внепланового отключения и " +
                "исправления несоответствий техническому заданию.",
            tags: [
                "Вебсайт", "Надежность"
            ],
            icon: {
                src: GearSVG,
                alt: 'gear'
            }
        },
        {
            title: 'Оперативность',
            description: "У нас большая команда различных профессионалов, " +
                "готовых начать работу сразу после подписания договора.",
            tags: [
                "Вебсайт", "Скорость"
            ],
            icon: {
                src: ClockSVG,
                alt: 'clock'
            }
        },
        {
            title: 'Интегрируемость',
            description: "Если у вас уже сделана какая-то часть проекта, " +
                "то мы можем подхватить там, где вы остановились.",
            tags: [
                "Вебсайт", "Интегрируемость"
            ],
            icon: {
                src: BlocksSVG,
                alt: 'blocks'
            }
        },
    ]
    const abilitiesTiles = [
        {
            title: 'Вебсайт',
            description: "Наша команда способна разрабатывать вебсайты любого уровня сложности. " +
                "От одностраничного лендинга и до крупных ритейл-решений.",
            tags: [
                "Услуги"
            ],
            icon: {
                src: WebSVG,
                alt: 'web'
            }
        },
        {
            title: 'Телеграм-бот',
            description: "Мы умеем запускать и настраивать ботов в Telegram для предпринимателей любых объемов.",
            tags: [
                "Услуги"
            ],
            icon: {
                src: TelegramSVG,
                alt: 'telegram'
            }
        },
        {
            title: 'Мобильное приложение',
            description: "У нас есть специалисты в сфере разработки мобильных приложений под любые платформы.",
            tags: [
                "Услуги"
            ],
            icon: {
                src: MobilePhoneSVG,
                alt: 'mobile-phone'
            }
        },
        {
            title: 'Дизайн',
            description: "У нас есть специалисты в сфере разработки мобильных приложений под любые платформы.",
            tags: [
                "Услуги"
            ],
            icon: {
                src: DesignSVG,
                alt: 'mobile-phone'
            }
        },
    ]

    const startSection = useRef<HTMLElement>(null)
    const reasonsSection = useRef<HTMLElement>(null)
    const servicesSection = useRef<HTMLElement>(null)

    const [modalIsPresented, setModalIsPresented] = useState(false)
    function executeScroll(ref: Ref<HTMLElement>) {
        if (ref && ref.current) {
            ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }
    function hashHandler(e: Event) {
        e.preventDefault()

        switch (window.location.hash) {
            case '#reasons':
                executeScroll(reasonsSection)
                break;
            case '#services':
                executeScroll(servicesSection)
                break;
            case '#start':
                executeScroll(startSection)
                break;
            case '#':
                executeScroll(startSection)
                break;
        }
    }


    useEffect(() => {
        switch (window.location.hash) {
            case '#reasons':
                executeScroll(reasonsSection)
                setPathname('/')
                break;
            case '#services':
                executeScroll(servicesSection)
                setPathname('/')
                break;
            case '#start':
                executeScroll(startSection)
                setPathname('/')
                break;
        }

        window.addEventListener('hashchange', hashHandler);

        return () => window.removeEventListener('hashchange', hashHandler);


    }, [])

    return (
        <>
            <CustomModal className={'fixed w-screen h-lvh z-10 flex-col flex justify-center items-center'}
                         isPresented={modalIsPresented} setIsPresented={setModalIsPresented}/>
            <section ref={startSection}  className="bg-gray-900 text-white min-h-screen h-[400px]">
                <div className="mx-auto max-w-lg px-4 py-32 flex h-screen items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className="
                            bg-gradient-to-r
                            from-green-300
                            via-blue-500
                            to-purple-600
                            bg-clip-text
                            text-3xl
                            font-extrabold
                            text-transparent
                            sm:text-5xl
                            "
                        >
                            МосКод.<br/>
                            <span className="sm:block"> Работаем на ваши идеи. </span>
                        </h1>

                        <h2 className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            Мы — компания, специализирующаяся на разработке сайтов и мобильных приложений.
                            Готовы реализовать ваши самые смелые идеи!
                        </h2>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <button
                                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-800 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                onClick={() => setModalIsPresented(true)}
                            >
                                Связаться
                            </button>
                            <button
                                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:text-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                onClick={() => executeScroll(servicesSection)}
                            >
                                Узнать больше
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={servicesSection} className='bg-gray-900 text-white min-h-screen h-[400px] flex flex-col max-w-[1620px] mx-auto'>
                <div
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-16 w-10/12 md:w-9/12 mx-auto items-stretch md:my-auto my-16 ">
                    {abilitiesTiles.map((tile, key) => (
                        <CustomTile data={tile} key={key}/>
                    ))}
                </div>
            </section>
            <section ref={reasonsSection} className='bg-gray-900 text-white min-h-screen h-[400px] flex flex-col max-w-[1620px] mx-auto'>
                <div
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-16 w-10/12 md:w-9/12 mx-auto items-stretch md:my-auto my-16">
                    {reasonsTiles.map((tile, key) => (
                        <CustomTile data={tile} key={key}/>
                    ))}
                </div>
            </section>
        </>
    );
};
