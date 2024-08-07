
export const getIncome = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/get`, {
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

        const getIncomeData = await response.json();

        if (getIncomeData.result) {
            return getIncomeData.income
        }

    }

    catch (error) {
        console.error(error)
    }

}

type ObjectResponsegetAllIncome = {
    result: boolean,
    message: string
    income?: object[]
}

export const getAllIncome = async (token: string): Promise<ObjectResponsegetAllIncome> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/get-all`, {
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

//
export const getVirementOfMonth = async (token: string, month: number): Promise<number | undefined> => {

    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/virement/month/${month}`, {
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

        const getIncomeData = await response.json();

        if (getIncomeData.result) {
            return getIncomeData.income
        }

    }

    catch (error) {
        console.error(error)
    }

}

export const getVirementOfYear = async (token: string, year: number): Promise<number[] | undefined> => {
    
        try {
    
            const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/virement/year/${year}`, {
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
    
            const getIncomeData = await response.json();
    
            if (getIncomeData.result) {
                return getIncomeData.income
            }
    
        }
    
        catch (error) {
            console.error(error)
        }
    
    }

type ObjectResponseAddIncome = {
    result: boolean,
    message: string,
    income?: number
}
export const addIncome = async (token: string, amount: number, type: string | undefined, date: Date, description: string | undefined = undefined, category: string | undefined = undefined): Promise<ObjectResponseAddIncome> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, type, paymentDate: date, description, category })


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

type ObjectResponseDeleteIncome = {
    result: boolean,
    message: string,
}

export const deleteIncome = async (token: string, id: number): Promise<ObjectResponseDeleteIncome> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idIncome: id })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        return { result: true, message: 'Le revenu a bien été supprimé' }
    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
};


export const acceptIncome = async (token: string, id: number): Promise<ObjectResponseDeleteIncome> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/income/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idIncome: id })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            return errorData

            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        return { result: true, message: 'Le revenu a bien été accepté' }
    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }
};


