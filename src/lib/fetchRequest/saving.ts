import { useAppSelector } from '@/reducer/store';

export const getSaving = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch('http://localhost:3001/users/getSaving', {
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
    saving: number
}

export const addSaving = async (token: string, amount: number, date: Date): Promise<ObjectResponseAddSaving> => {
    try {

        const response = await fetch('http://localhost:3001/users/addSaving', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, savingDate: date })


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


