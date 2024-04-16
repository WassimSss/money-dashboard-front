import { useAppSelector } from '@/reducer/store';

/**
 * Récupère le solde a venir de l'utilisateur à partir de l'API.
 * Utilise le token d'authentification stocké dans le Redux store pour s'authentifier.
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @returns {Promise<number | undefined>} Une promesse qui résout soit le solde arrivant de l'utilisateur, soit undefined si la récupération échoue.
 */
const getIncome = async (token: string): Promise<number | undefined> => {
    try {

        const response = await fetch('http://localhost:3001/users/getIncome', {
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
            return getIncomeData.balance
        }

    }

    catch (error) {
        console.error(error)
    }

}

/**
 * Ajoute un solde a venir de l'utilisateur à partir de l'API.
 * Utilise le token d'authentification stocké dans le Redux store pour s'authentifier.
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @param {number} amount - Le montant du solde a venir l'utilisateur.
 * @param {string} date - La date du solde a venir l'utilisateur.
 * @returns {Promise<number | undefined>} Une promesse qui résout soit true, soit false si la récupération échoue.
 */
const addIncome = async (token: string, amount: number, date: Date): Promise<number | undefined> => {
    try {

        const response = await fetch('http://localhost:3001/users/addIncome', {
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
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const data = await response.json();

        return data.result

    }

    catch (error) {
        console.error(error)
    }

}

module.exports = { addIncome, getIncome }

