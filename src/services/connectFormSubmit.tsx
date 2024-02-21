import axios from "axios";

const apiEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT || ''

async function prepareForm(name: string, phone: string, email: string, message:string) {
    if (!phone.length && !email.length) {
        throw Error('Invalid credentials!')
    }
    return {
        name: name || '',
        email: email || '',
        phone: phone || '',
        message: message || '',
    }
}

export default async function connectFormSubmit(name: string, phone: string, email: string, message:string) {
    const form = await prepareForm(name, phone, email, message)

    let result = await axios.post(`${apiEndpoint}/api/submit-form`, form).catch((e) => {
        console.error(e)
        return false
    })
    if (result && typeof result !== "boolean") {
        return result.status.toString().startsWith('2')
    }
    return result
}