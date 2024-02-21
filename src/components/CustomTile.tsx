
interface Data {
    title: string;
    icon: {
        src: string;
        alt: string;
    };
    description: string;
    tags: string[];
}

const CustomTile = ({data}: {data: Data}) => {
    return (
        <article
            className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 min-w-60 flex flex-col justify-between min-h-[20vh] md:min-h-[35vh] mx-auto">
            <div className="flex flex-col justify-between rounded-[10px] p-4 sm:p-6 bg-gray-900 h-full">
                <div className="flex-1">
                    <a href="#" onClick={(e) => {e.preventDefault()}}>
                        <h3 className="mt-0.5 text-lg font-medium md:text-2xl text-white">
                            {data.title}
                        </h3>
                    </a>
                </div>
                <div className={'w-12 md:w-24 h-[100%] flex items-center justify-center'}>
                    <img src={data.icon.src} className={'w-[100%] h-auto'} alt={data.icon.alt}/>
                </div>
                <p className="block text-xs text-gray-400 md:text-sm">
                    {data.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                    {data.tags.map((tag, key) => (
                        <span
                            className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs bg-purple-600 text-purple-100"
                            key={key}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default CustomTile;
