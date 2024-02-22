import {ComponentChildren} from "preact";

interface CustomTextProps {
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    p?: boolean;
    className?: string;
    children?: ComponentChildren;
}

export function CustomText (
    {h1, h2, h3, p, className, children}
        : CustomTextProps) {
    if (h1) {
        return <h1 className={'text-center text-white text-3xl lg:4xl xl:text-5xl font-semibold' + ' ' + className}>{children}</h1>
    } else if (h2) {
        return <h2 className={'text-white text-2xl xl:text-3xl mb-2 mt-4 font-extralight' + ' ' + className}>{children}</h2>
    } else if (h3) {
        return <h3 className={'text-center text-white text-xl lg:2xl xl:text-3xl' + ' ' + className}>{children}</h3>
    } else if (p) {
        return <p className={'text-white text-sm/5 xl:text-sm/6 font-thin my-2' + ' ' + className}>{children}</p>
    } else {
        return <p className={'text-white text-sm/5 xl:text-sm/6 font-thin my-2' + ' ' + className}>{children}</p>
    }
};

export default CustomText;