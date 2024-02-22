import { createContext, FunctionComponent, ReactNode, useContext } from 'preact/compat';
import {useState} from 'preact/hooks'
import CrossSVG from '../assets/cross.svg';
import SuccessSVG from '../assets/success.svg'

// Interface for the toast configuration
interface ToastConfig {
    text: ReactNode;
    type?: 'success' | 'error';
}

// Interface for the toast context
interface IToastContext {
    sendToast: (config: ToastConfig) => void;
}

// Creating the toast context
const ToastContext = createContext<IToastContext | undefined>(undefined);

// Toast component with enhanced styling and close button functionality
const Toaster: FunctionComponent<ToastConfig & { onClose: () => void }> = ({ text, type, onClose }) => (
    // <div className={`fixed bottom-0 right-0 mb-4 z-50 max-w-96 md:max-w-2xl overflow-clip`} >
    //     <div
    //         className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
    //
    //         <button onClick={onClose}>
    //             <img src={type === 'error' ? CrossSVG : SuccessSVG} alt="Close" className="w-4 h-4"/>
    //         </button>
    //         <Text>{text}</Text>
    //
    //     </div>
    // </div>
    //
    <div
        role="alert"
        className="fixed bottom-4 right-4 rounded-xl border p-4 border-blue-600 bg-gray-900 z-50"
    >
        <div className="flex items-start gap-4">
    <img className={'h-[24px] w-[24px]'} src={type === "error" ? CrossSVG : SuccessSVG} alt={'check'}/>

            <div className="flex-1">
                <strong className="block font-medium text-white"> {type === "error" ? "Ошибка" : "Сообщение"}</strong>

                <p className="mt-1 text-sm text-gray-200 sm:min-w-48 min-w-[25vw] max-w-[50vw] sm:max-w-84 overflow-y-auto">
                    {text}
                </p>
            </div>

            <button
                className="transition text-gray-400 hover:text-gray-500"
                onClick={onClose}
            >
                <span className="sr-only">Dismiss popup</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    </div>
);

// ToastProvider component to provide the toast context
export const ToastProvider: FunctionComponent<{ children: ReactNode }> = ({children}) => {
    const [toast, setToast] = useState<ToastConfig | null>(null);

    const sendToast = (config: ToastConfig) => {
        setToast(config);
        // setTimeout(() => setToast(null), 5000);
    };

    const closeToast = () => setToast(null);

    return (
        <ToastContext.Provider value={{sendToast}}>
            {children}
            {toast && <Toaster {...toast} onClose={closeToast}/>}
        </ToastContext.Provider>
    );
};

// Custom hook to use the toast context
export default function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
