import {StateUpdater,  useState} from "preact/hooks";
import {ChangeEvent, TargetedEvent} from "preact/compat";
import connectFormSubmit from "../services/connectFormSubmit.tsx";
import useToast from "../hooks/useToast.tsx";
import {CustomText as Text} from "./UI/CustomText.tsx";

function isEmailFieldValid(value: string) {
    const symbolsEmailRegex = /^[-+_.@a-zA-Z0-9]+$/;
    const broadEmailRegex = /^[+-_.a-zA-Z0-9]+@[-_a-zA-Z0-9]+\.[-_a-zA-Z0-9]+$/
    const strictEmailRegex = /^(?=[a-zA-Z0-9._+-]{2,}@)([a-zA-Z0-9_+-]+(?:\.[a-zA-Z0-9_+-]+)*)@(?=[a-zA-Z0-9.-]{2,}\.)([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)\.([a-zA-Z]{2,})$/;

    if (value.length > 0) {
        if (!symbolsEmailRegex.test(value)) {
            return false
        }
        if (broadEmailRegex.test(value) && !strictEmailRegex.test(value)) {
            return false
        }
    }
    return true
}

function isEmailValid(value: string) {
    const strictEmailRegex = /^(?=[a-zA-Z0-9._+-]{2,}@)([a-zA-Z0-9_+-]+(?:\.[a-zA-Z0-9_+-]+)*)@(?=[a-zA-Z0-9.-]{2,}\.)([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)\.([a-zA-Z]{2,})$/;
    const broadEmailRegex = /^[+-_.a-zA-Z0-9]+@[-_a-zA-Z0-9]+\.[-_a-zA-Z0-9]+$/
    if (broadEmailRegex.test(value)) {
        return strictEmailRegex.test(value);
    }
    return false
}

function isPhoneFieldValid(value: string) {
    const regex = /^[0-9-+\s()]*$/;
    let isBeginningValid = [
        value.startsWith('7'),
        value.startsWith('8'),
        value.startsWith('+') && (value.length === 1 || value[1] === '7'),
    ].some(Boolean)


    if (value.length) {

        if (!regex.test(value)) {
            return false
        }

        if (!isBeginningValid) {
            return false
        }

    }

    if (regex.test(value) && isBeginningValid && value.length >= 11) {
        let testingPhone = value.replace(/[() +-]/g, '');
        const beginningRegex = /^[78]+[0-9]*$/

        if (testingPhone.length > 11) {
            return false
        } else if (testingPhone.length < 11) {
            return true
        }

        return testingPhone.length === 11 && beginningRegex.test(testingPhone);
    }
    return true
}

function isPhoneValid(value: string) {
    let testingPhone = value.replace(/[() +-]/g, '');
    const beginningRegex = /^[78]+[0-9]*$/

    if (testingPhone.length !== 11) {
        return false
    }
    return beginningRegex.test(testingPhone);
}

function CustomModal({isPresented, className, setIsPresented}: {
    isPresented: boolean,
    className: string,
    setIsPresented: StateUpdater<boolean>
}) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")

    const [phoneError, setPhoneError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const {sendToast} = useToast()

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        let value: any;
        value = e.currentTarget.value;
            
        const regex = /^[A-Za-zА-Яа-я ]*$/;
        setNameError(!regex.test(value))
        setName(value);
    }

    function handlePhoneChange(e:  ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value

        if (value.length) {
            if (value.startsWith('+8')) {
                value = value.replace('+8', '8')
            } else if (value.startsWith('9')) {
                value = `+7${value}`
            } else if (!value.startsWith('+') && !value.startsWith('8')) {
                value = `+${value}`
            }
        }

        setPhoneError(!isPhoneFieldValid(value))
        setPhone(value);
    }

    function handleEmailChange(e:  ChangeEvent<HTMLInputElement>) {
        let value = e.currentTarget.value
        console.log(value)
        setEmailError(!isEmailFieldValid(value))
        setEmail(value)
    }

    function handleMessageChange(e: TargetedEvent<HTMLTextAreaElement>) {
        setMessage(e.currentTarget.value);
    }

    // function handleNameClear() {
    //     setNameError(false)
    //     setName('')
    // }
    //
    // function handlePhoneClear() {
    //     setPhoneError(false)
    //     setPhone('')
    // }
    //
    // function handleEmailClear() {
    //     setEmailError(false)
    //     setEmail('')
    // }
    //
    // function handleMessageClear() {
    //     setMessage('')
    // }

    async function handleFormSubmit(e: SubmitEvent) {
        e.preventDefault();

        if (!email && !phone) {
            setPhoneError(true)
            setEmailError(true)
            sendToast(
                {
                    text:<Text p>Мы не можем принять Вашу заявку без номера телефона или почты</Text>,
                    type: "error"
                }
            )
            return null
        }

        if (0 < name.length && name.length < 2) {
            setNameError(true);
            sendToast(
                {
                    text:
                        <Text p>Похоже, что Ваше имя показалось нам либо слишком длинным, либо слишком коротким</Text>,
                    type: "error"
                }
            )
            return null
        }

        if (name.length > 50) {
            setNameError(true);
            sendToast(
                {
                    text:
                        <Text p>Похоже, что Ваше имя показалось нам либо слишком длинным, либо слишком коротким</Text>,
                    type: "error"
                }
            )
            return null
        }

        let phoneIsValid = isPhoneValid(phone)
        let emailIsValid = isEmailValid(email)

        if (!phoneIsValid && !emailIsValid) {
            setPhoneError(true)
            setEmailError(true)
            sendToast(
                {
                    text: <Text p>Мы не можем принять Вашу заявку без корректного номера телефона или корректной почты.
                        Если Вы считаете, что произошла ошибка, напишите нам в <a href={'t.me/smbrinee'}>telegram</a>,
                        разберемся!</Text>,
                    type: "error",

                }
            )
            return null
        }

        const formPhone = phoneIsValid ? phone.replace(/[() +-]/g, '') : ''
        const formEmail = emailIsValid ? email : ''


        let success = await connectFormSubmit(name, formPhone, formEmail, message)

        if (success) {
            sendToast(
                {
                    text: `Уважаемый ${name || 'пользователь'}, мы получили ваши данные и скоро вам перезвоним!.`
                }
            )
            setPhone("")
            setName("")
            setMessage("")
            setEmail("")
            return null
        } else {
            sendToast({
                text: `Уважаемый ${name || 'пользователь'}, несмотря на то, что Ваши данные скорее всего верны, похоже что на данный момент мы испытываем некоторые трудности с их получением. Попробуйте еще раз.`,
                type: 'error'
            })
        }
    }


    return isPresented ? (
        <div className={className}>
            <div
                className={"absolute " +
                    "-mt-4 sm:mt-0 " +
                    "px-4 py-6 sm:px-6 lg:px-8 backdrop-blur-md rounded-3xl " +
                    "w-[576px] max-w-[90vw] border-2 border-gray-800 shadow-2xl " +
                    "shadow-gray-950 backdrop-brightness-90 max-h-[90%] min-w-[360px] min-h-[540px]"}>
                <div className="mx-auto max-w-lg text-center text-white">
                    <h1 className="text-2xl font-semibold sm:text-3xl">Оставляйте вашу заявку!</h1>

                    <p className="text-white">
                        Отправляйте ваши самые смелые идеи и мы вскоре вам позвоним!
                    </p>
                </div>
                <form action="#" onSubmit={handleFormSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div className={'relative'}>
                        <label className="sr-only" htmlFor="name">Имя</label>
                        <input
                            className={"peer w-full rounded-lg " +
                                "border-2 p-3 text-base bg-transparent " +
                                "shadow-xl shadow-gray-950 backdrop-brightness-125 backdrop-blur-xl placeholder-transparent " +
                                (nameError ? 'text-red-600 border-red-600' : "text-white border-gray-800")}
                            type="text"
                            placeholder={'Имя'}
                            id="name"
                            value={name}
                            onInput={handleNameChange}
                        />
                        <span className={'pointer-events-none absolute start-2.5 top-0 ' +
                            '-translate-y-1/2 p-0.5 text-[16px] transition-all ' +
                            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm ' +
                            'peer-focus:top-0 peer-focus:text-[16px] font-normal text-white ' +
                            (name.length ? 'peer-focus:block hidden' : 'block')}>Имя</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                        <div className={'relative'}>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className={"peer w-full rounded-lg  " +
                                    "border-2 p-3 text-base bg-transparent " +
                                    "shadow-xl shadow-gray-950 backdrop-brightness-125 backdrop-blur-xl placeholder-transparent " +
                                    (emailError ? 'text-red-600 border-red-600' : "text-white border-gray-800")}
                                placeholder="Email"
                                type="email"
                                id="email"
                                value={email}
                                onInput={handleEmailChange}
                            />
                            <span className={'pointer-events-none absolute start-2.5 top-0 ' +
                                '-translate-y-1/2 p-0.5 text-[16px] transition-all ' +
                                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm ' +
                                'peer-focus:top-0 peer-focus:text-[16px] font-normal text-white ' +
                                (email.length ? 'peer-focus:block hidden' : 'block')}>Email</span>
                        </div>

                        <div className={'relative'}>
                            <label className="sr-only" htmlFor="phone">Телефон</label>
                            <input
                                className={"peer w-full rounded-lg  " +
                                    "border-2 p-3 text-base bg-transparent " +
                                    "shadow-xl shadow-gray-950 backdrop-brightness-125 backdrop-blur-xl placeholder-transparent " +
                                    (phoneError ? 'text-red-600 border-red-600' : "text-white border-gray-800")}
                                placeholder="Номер телефона"
                                type="tel"
                                id="phone"
                                value={phone}
                                onInput={handlePhoneChange}
                            />
                            <span className={'pointer-events-none absolute start-2.5 top-0 ' +
                                '-translate-y-1/2 p-0.5 text-[16px] transition-all ' +
                                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm ' +
                                'peer-focus:top-0 peer-focus:text-[16px] font-normal text-white ' +
                                (phone.length ? 'peer-focus:block hidden' : 'block')
                            }>Телефон</span>
                        </div>
                    </div>

                    <div className={'relative '}>
                        <label className="sr-only" htmlFor="message">Сообщение</label>

                        <textarea
                            className={"peer w-full rounded-lg  " +
                                "border-2 p-3 text-base bg-transparent " +
                                "shadow-xl shadow-gray-950 backdrop-brightness-125 backdrop-blur-xl placeholder-transparent max-h-36 min-h-16 " +
                                "text-white border-gray-800"}
                            placeholder="Сообщение"
                            id="message"
                            value={message}
                            onInput={handleMessageChange}
                        />
                        <span className={'pointer-events-none absolute start-2.5 top-0 ' +
                            '-translate-y-1/2 p-0.5 text-[16px] transition-all ' +
                            'peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm ' +
                            'peer-focus:top-0 peer-focus:text-[16px] font-normal text-white ' +
                            (message.length ? 'peer-focus:block hidden' : 'block')}>Сообщение</span>
                    </div>

                    <div className="flex items-center justify-end">

                        <div className="flex gap-4">
                            <button
                                className="rounded-md px-5 py-2.5 text-base font-medium bg-gray-800 text-white hover:text-white/75"
                                onClick={() => setIsPresented(false)}
                            >
                                Отмена
                            </button>
                            <button
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-base font-medium text-white shadow hover:bg-blue-800"
                                href="tel:+7 (926) 127-35-53"
                            >
                                Отправить
                            </button>


                        </div>

                    </div>
                    <p className="text-[10px] text-white">
                        Нажимая кнопку отправить, вы соглашаетесь с&nbsp;
                        <a className="underline" href="/policy">политикой конфиденциальности</a>.
                    </p>
                </form>
            </div>
        </div>
    ) : null;
}

export default CustomModal;