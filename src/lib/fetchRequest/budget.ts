// recuperer le budget du mois en cours depuis la route /getBudget/:period

export const getBudget = async (token: string, period: string): Promise<object | undefined> => {

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getBudget/${period}`, {
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

        const getBudgetData = await response.json();

        console.log("getBudgetData : ", getBudgetData)
        if (getBudgetData.result) {
            return getBudgetData
        }

    }

    catch (error) {
        console.error(error)
    }

}