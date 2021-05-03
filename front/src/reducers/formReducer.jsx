const formReducer = (state, {type, payload}) => {
    switch (type) {
        case 'selectedDate':
            return {...state, selectedDate: payload}
        case 'category':
            return {...state, category: payload}
        case 'currency':
            return {...state, currency: payload}
        case 'amountNeg':
            return {...state, amount: -payload}
        case 'amountPos':
            return {...state, amount: payload}
        default:
            throw new Error()
    }
}

export default formReducer