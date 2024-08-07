// @ts-nocheck
export const getDebts = async (token: string): Promise<ObjectResponseAddDebt> => {

    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/debts/get`, {
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

        const getDebtsData = await response.json();

        if (getDebtsData.result) {
            return getDebtsData.debts
        }

    }

    catch (error) {
        console.error(error)
    }

}
// @ts-ignore
export const getAllDebts = async (token: string): Promise<ObjectResponseAddDebt> => {

    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/debts/get-all`, {
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

        const getDebtsData = await response.json();

        
        if (getDebtsData.result) {
            return getDebtsData
        }

    }

    catch (error) {
        console.error(error)
    }

}

//addDebts
// @ts-ignore
export const addDebts = async (token: string, amount: Debt, debtor: string, userIsDebtor: boolean): Promise<ObjectResponseAddDebt> => {

    try {
        const response = await fetch(`https://money-dashboard-back.vercel.app/users/debts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },

            body: JSON.stringify({ amount, debtor, userIsDebtor })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const addDebtsData = await response.json();

     
            return addDebtsData
        

    }

    catch (error) {
        console.error(error)
    }

}

// deleteDebts
// @ts-ignore
export const deleteDebts = async (token: string, id: number): Promise<ObjectResponseAddDebt> => {

    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/debts/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },

            body: JSON.stringify({ id })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const deleteDebtsData = await response.json();

        if (deleteDebtsData.result) {
            return deleteDebtsData
        }

    }

    catch (error) {
        console.error(error)
    }

}

export const acceptDebts = async (token: string, id: number): Promise<ObjectResponseAddDebt> => {

    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/debts/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },

            body: JSON.stringify({ id })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const acceptDebtsData = await response.json();

        if (acceptDebtsData.result) {
            return acceptDebtsData
        }

    }

    catch (error) {
        console.error(error)
    }

}
