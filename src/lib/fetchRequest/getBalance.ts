import { useAppSelector } from '@/reducer/store';
import { log } from 'console';

/**
 * Récupère le solde de l'utilisateur à partir de l'API.
 * Utilise le token d'authentification stocké dans le Redux store pour s'authentifier.
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {Promise<number | undefined>} Une promesse qui résout soit le solde de l'utilisateur, soit undefined si la récupération échoue.
 */
export const getBalance = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getBalance`, {
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

        const getBalanceData = await response.json();

        
        if (getBalanceData.result) {
            return getBalanceData.balance
        }

    }

    catch (error) {
        console.error(error)
    }

}

type ObjectResponseAddBalance = {
    result: boolean,
    message: string,
    history?: object[]
}

export const getAllBalance = async (token: string): Promise<ObjectResponseAddBalance> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getAllBalance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            return errorData
        }

        const getAllBalanceData = await response.json();

        console.log('getAllBalanceData : ', getAllBalanceData)
        return getAllBalanceData;
    }

    catch (error) {
        console.error(error)
        return { result: false, message: 'Une erreur inattendue est survenue' };
    }
}


export const setBalance = async (token: string, amount: number, date: Date): Promise<ObjectResponseAddBalance> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/setBalance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, paymentDate: date })


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