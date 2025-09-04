function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round((amount+1000)*factor)
}

export default convertToSubcurrency;