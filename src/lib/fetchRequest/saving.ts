import { useAppSelector } from '@/reducer/store';

export const getSaving = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getSaving`, {
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

        // console.log(getSavingData)
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getAllSaving`, {
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

export const deleteSaving = async (token: string, id: number): Promise<ObjectResponseAddSaving> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/deleteSaving`, {
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
        // console.log('data.result : ', data.result)
        return data

    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
    }

}

export const addSaving = async (token: string, amount: number, type = undefined, date: Date, description: string|undefined = undefined, category: string|undefined = undefined ): Promise<ObjectResponseAddSaving> => {
    try {

        console.log('date : ',  date)
        console.log('description : ', description)  
        console.log('category : ', category)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/addSaving`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, savingDate: date, description, category })


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


