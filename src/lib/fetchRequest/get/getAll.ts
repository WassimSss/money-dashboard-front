// @ts-nocheck
export const getAll = async (token: string, period: string, periodNumber : number | null = null, year : number | null = null, dataType : string): Promise<ObjectResponseGetAllExpenses> => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${dataType}/get-all/${period}` + (periodNumber !== null ? `/${periodNumber}` : '') + (year !== null ? `/${year}` : ''), {
            
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