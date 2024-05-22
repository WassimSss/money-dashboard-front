
export const getExpenses = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const getExpensesData = await response.json();

        if (getExpensesData.result) {
            return getExpensesData.expenses
        }

    }

    catch (error) {
        console.error(error)
    }

}

type ObjectResponseGetAllExpenses = {
    result: boolean,
    message: string,
    expenses?: object[]
    amount?: number
}

// Recuperer toutes les dépenses du jour avec un fetch sur /users/getAllExpenses
export const getExpensesOfThePeriod = async (token: string, period: string, periodNumber: number | null = null, yearNumber: number | null = null): Promise<{result: boolean, expenses: number[]} | undefined> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses/get-by-period/${period}` + (periodNumber !== null ? `/${periodNumber}` : '') + (yearNumber !== null ? `/${yearNumber}` : ''), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const getExpensesData = await response.json();

        if (getExpensesData.result) {
            return getExpensesData
        }

    }

    catch (error) {
        console.error(error)
    }

}

// Recuperer toutes les dépenses de la semaine avec un fetch sur /users/getExpenses/week

// export const getExpensesOfTheWeek = async (token: string): Promise<number | undefined> => {
//     try {

//         const response = await fetch(`http://localhost:3001/users/getExpenses/week`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${token}`
//             },
//         })

//         if (!response.ok) {
//             // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
//             const errorData = await response.json();
//             console.error('Erreur lors de l\'envoi des données:', errorData);
//         }

//         const getExpensesData = await response.json();

//         if (getExpensesData.result) {
//             return getExpensesData.expenses
//         }

//     }

//     catch (error) {
//         console.error(error)
//     }

// }

// // Recuperer toutes les dépenses du mois avec un fetch sur /users/getExpenses/month

type expensesObject = {
    expenses?: number,
    expensesAmountTotal?: number,
    incomesPrelevementAmount?: number,
    result: boolean,
    message?: string,

};

// export const getExpensesOfTheMonth = async (token: string, monthNumber: number): Promise<expensesObject | undefined> => {
//     try {

//         const response = await fetch(`http://localhost:3001/users/getExpenses/month/${monthNumber}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': `Bearer ${token}`
//             },
//         })

//         if (!response.ok) {
//             // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
//             const errorData = await response.json();
//             console.error('Erreur lors de l\'envoi des données:', errorData);
//         }

//         const getExpensesData = await response.json();

//         if (getExpensesData.result) {
//             return getExpensesData
//         }

//     }

//     catch (error) {
//         console.error(error)
//         return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
//     }

// }



export const getAllExpenses = async (token: string, period: string, periodNumber: number | null = null, year: number | null = null): Promise<ObjectResponseGetAllExpenses> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses/get-all/${period}` + (periodNumber !== null ? `/${periodNumber}` : '') + (year !== null ? `/${year}` : ''), {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
}

type ObjectResponseAddExpenses = {
    result: boolean,
    message: string,
    expenses?: number
}

// getExpensesCategories

type expensesCategoriesObject = {
    id: string,
    category: string,
}
type ObjectResponseExpensesCategories = {
    result: boolean,
    expensesCategories?: expensesCategoriesObject[],
    message: string,

}

export const getExpensesCategoriesLabel = async (token: string, period: string): Promise<ObjectResponseExpensesCategories> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses-category/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
}

// addExpensesCategoriesLabel
export const addExpensesCategoriesLabel = async (token: string, category: string): Promise<ObjectResponseExpensesCategories> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses-category/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }


}

// addBudgetOfExpensesCategory
export const addBudgetOfExpensesCategory = async (token: string, category: string | undefined, budget: number | string): Promise<ObjectResponseExpensesCategories> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses-category/add-budget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category, budget })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}

type expensesCategoriesType = {
    expenses: Array<[string, number]>

};

type ObjectResponseGetAllExpensesCategories = {
    result: boolean,
    message: string,
    expenses?: expensesCategoriesType[]
}

export const getExpensesCategories = async (token: string, period: string): Promise<ObjectResponseGetAllExpensesCategories> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses/get-by-period/month/${period}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }
    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
}
export const addExpenses = async (token: string, amount: number, type = undefined, date: Date, description: string | undefined = undefined, category: string | undefined = undefined, changeBalanceAmount: boolean | null = null): Promise<ObjectResponseAddExpenses> => {
    try {


        const response = await fetch(`http://localhost:3001/users/expenses/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, expensesDate: date, description, category, changeBalanceAmount })


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}

// delete expenses

type ObjectResponseDeleteExpenses = {
    result: boolean,
    message: string,
    expenses?: number
}

export const deleteExpenses = async (token: string, id: number): Promise<ObjectResponseDeleteExpenses> => {
    try {

        const response = await fetch(`http://localhost:3001/users/expenses/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idExpenses: id })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}
