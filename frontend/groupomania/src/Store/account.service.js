
let TokenSave = (token) => {
    localStorage.setItem("token", token)
}

let logout = () => {
    localStorage.removeItem('token')
}

let islogged = () => {
    let token = localStorage.getItem("token")

    return !! token
}

export const accountService = {
    TokenSave, logout, islogged
}