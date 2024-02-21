import './app.css'
import {Router} from "preact-router";
import AsyncRoute from "preact-async-route";
import CustomHeader from "./components/CustomHeader.tsx";
import {HomeView} from './views/HomeView.tsx'
import CustomFooter from "./components/CustomFooter.tsx";
import {useEffect, useState} from "preact/hooks";
import {ToastProvider} from "./hooks/useToast.tsx";

interface AppProps {
    path?: string;
}

export default function App ({path}:AppProps){

    const [homeHref, setHomeHref] = useState('/#')
    const [servicesHref, setServicesHref] = useState('/#services')
    const [reasonsHref, setReasonsHref] = useState('/#reasons')
    const [policyHref, setPolicyHref] = useState('/policy')
    const [pathname, setPathname] = useState(path || '/')

    const headerLinks = [
        {text: 'Главная', href: homeHref},
        {text: 'Услуги', href: servicesHref},
        {text: 'Почему мы', href: reasonsHref},
    ]
    const footerLinks = [
        {text: 'Главная', href: homeHref},
        {text: 'Услуги', href: servicesHref},
        {text: 'Политика конфиденциальности', href: policyHref},
    ]

    useEffect(() => {
        if (pathname === '/') {
            setHomeHref('#')
            setServicesHref('#services')
            setReasonsHref('#reasons')
            setPolicyHref('/policy')

        } else if (pathname === '/policy') {
            setHomeHref('/#start')
            setServicesHref('/#services')
            setReasonsHref('/#reasons')
            setPolicyHref('#')
        }

    }, [pathname]);

    return (
    <>
        <ToastProvider >
        <CustomHeader className={'z-50'} links={headerLinks} />
        <Router url={pathname}>
            <div path={'/'}>
                <HomeView setPathname={setPathname}/>
            </div>
            <AsyncRoute path='/policy' getComponent={() => import('./views/PolicyView.tsx').then(module => module.default)} setPathname={setPathname}/>
        </Router>
        <CustomFooter links = {footerLinks}/>
        </ToastProvider>

    </>
  )
}
