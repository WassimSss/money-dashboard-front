import { useAppSelector } from '@/reducer/store';

export const getExpenses = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpenses`, {
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

        // console.log(getExpensesData)
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
}

// Recuperer toutes les dépenses du jour avec un fetch sur /users/getAllExpenses
export const getExpensesOfTheDay = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpenses/day`, {
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

        console.log(getExpensesData)
        if (getExpensesData.result) {
            return getExpensesData.expenses
        }

    }

    catch (error) {
        console.error(error)
    }

}

// Recuperer toutes les dépenses de la semaine avec un fetch sur /users/getExpenses/week

export const getExpensesOfTheWeek = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpenses/week`, {
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

        console.log(getExpensesData)
        if (getExpensesData.result) {
            return getExpensesData.expenses
        }

    }

    catch (error) {
        console.error(error)
    }

}

// Recuperer toutes les dépenses du mois avec un fetch sur /users/getExpenses/month

export const getExpensesOfTheMonth = async (token: string, monthNumber: number): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpenses/month/${monthNumber}`, {
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

        console.log(getExpensesData)
        if (getExpensesData.result) {
            return getExpensesData
        }

    }

    catch (error) {
        console.error(error)
    }

}



export const getAllExpenses = async (token: string): Promise<ObjectResponseGetAllExpenses> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getAllExpenses`, {
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
        console.log('data.result : ', data)
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
type ObjectResponseExpensesCategories = {
    result: boolean,
    expensesCategories: string[],
    message: string,

}

export const getExpensesCategoriesLabel = async (token: string, period: string): Promise<ObjectResponseExpensesCategories> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpensesCategories`, {
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
        // console.log('data.result : ', data.result)  
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addExpensesCategory`, {
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
        // console.log('data.result : ', data.result)  
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }


}

// addBudgetOfExpensesCategory
export const addBudgetOfExpensesCategory = async (token: string, category: string, budget: number): Promise<ObjectResponseExpensesCategories> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addBudgetOfExpensesCategory`, {
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
        // console.log('data.result : ', data.result)  
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}


export const getExpensesCategories = async (token: string, period: string): Promise<ObjectResponseGetAllExpenses> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getExpensesByCategory/${period}`, {
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
        console.log('data.result : ', data.result)
        return data

    }
    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
}
export const addExpenses = async (token: string, amount: number, type = undefined, date: Date, description: string | undefined = undefined, category: string | undefined = undefined): Promise<ObjectResponseAddExpenses> => {
    try {

        console.log({ amount, expensesDate: date, description, category })

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addExpenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, expensesDate: date, description, category })


        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();
        console.log('data.result : ', data.result)
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/deleteExpenses`, {
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
        console.log('data.result : ', data.result)
        return data

    } catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}
