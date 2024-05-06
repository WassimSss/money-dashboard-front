// recuperer le budget du mois en cours depuis la route /getBudget/:period
type monthBudgetObject = {
    result: boolean,
    budgetAmount: number,
    expensesAmount: number,
    expensesByCategory: Array<{
        categoryName: string,
        categoryAmount: number,
        categoryBudget: number
    }>
}

export const getBudget = async (token: string, period: string, monthNumber: number | null = null, year: number | null = null): Promise<monthBudgetObject | undefined> => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getBudget/${period}${monthNumber ? "/" + monthNumber : ""}`, {
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

// getMonthBudget
export const getMonthBudget = async (token: string, period: string, monthNumber: number | null = null, year: number | null = null): Promise<monthBudgetObject | undefined> => {
 try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getMonthBudget/${period}${monthNumber ? "/" + monthNumber : ""}${year ? "/" + year : ""}`, {
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

    const getMonthBudgetData = await response.json();

    console.log("getMonthBudgetData : ", getMonthBudgetData)
    if (getMonthBudgetData.result) {
        return getMonthBudgetData
    }
 } catch (error) {
    
 }
}


// addBudgetOfMonth
export const addBudgetOfMonth = async (token: string, month: number, year: number, monthAmount : number): Promise<boolean> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/setBudget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ month, year, monthAmount })
        })

        if (!response.ok) {
            // Si la réponse n'est pas OK, essayez de lire le corps de la réponse pour obtenir des détails sur l'erreur
            const errorData = await response.json();
            console.error('Erreur lors de l\'envoi des données:', errorData);
        }

        const addBudgetOfMonthData = await response.json();

        console.log("addBudgetOfMonthData : ", addBudgetOfMonthData)
        if (addBudgetOfMonthData.result) {
            return true
        }

    }

    catch (error) {
        console.error(error)
    }
}