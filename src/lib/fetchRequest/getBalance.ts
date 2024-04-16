import { useAppSelector } from '@/reducer/store';

/**
 * Récupère le solde de l'utilisateur à partir de l'API.
 * Utilise le token d'authentification stocké dans le Redux store pour s'authentifier.
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {Promise<number | undefined>} Une promesse qui résout soit le solde de l'utilisateur, soit undefined si la récupération échoue.
 */
const getBalance = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch('http://localhost:3001/users/getBalance', {
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

export default getBalance;
