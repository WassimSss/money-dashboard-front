
export const getSaving = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/saving/get`, {
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

        const getSavingData = await response.json();

        if (getSavingData.result) {
            return getSavingData.saving
        }

    }

    catch (error) {
        console.error(error)
    }

}

type ObjectResponseAddSaving = {
    result: boolean,
    message: string,
    saving?: object[]
}

// get all saving
export const getAllSaving = async (token: string): Promise<ObjectResponseAddSaving> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/saving/get-all`, {
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

export const deleteSaving = async (token: string, id: number): Promise<ObjectResponseAddSaving> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/saving/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idSaving: id })

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

export const addSaving = async (token: string, amount: number, type = undefined, date: Date, description: string|undefined = undefined, category: string|undefined = undefined, changeBalanceAmount  : boolean | null = null ): Promise<ObjectResponseAddSaving> => {
    try {

        const response = await fetch(`https://money-dashboard-back.vercel.app/users/saving/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, savingDate: date, description, category, changeBalanceAmount })


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


