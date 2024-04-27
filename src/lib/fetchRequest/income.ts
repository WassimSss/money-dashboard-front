import { useAppSelector } from '@/reducer/store';

export const getIncome = async (token: string): Promise<number | undefined> => {
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

        // console.log(getIncomeData)
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
    income: object[]
}

export const getAllIncome  = async (token: string): Promise<ObjectResponsegetAllIncome> => {
    try {

        const response = await fetch('http://localhost:3001/users/getAllIncome', {
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


type ObjectResponseAddIncome = {
    result: boolean,
    message: string,
    income: number
}
export const addIncome = async (token: string, amount: number, type: string|undefined, date: Date, description: string|undefined = undefined, category: string|undefined = undefined) : Promise<ObjectResponseAddIncome> => {
    try {

        const response = await fetch('http://localhost:3001/users/addIncome', {
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
        // console.log('data.result : ', data.result)
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

        const response = await fetch('http://localhost:3001/users/deleteIncome', {
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

        const response = await fetch('http://localhost:3001/users/acceptIncome', {
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


