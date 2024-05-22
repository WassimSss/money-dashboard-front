type ObjectResponseGetAllExpenses = {
  result: boolean,
  data?: number | undefined
  message?: string
}

export const get = async (token: string, dataType: string): Promise<ObjectResponseGetAllExpenses> => {
  try {

      const response = await fetch(`https://money-dashboard-back.vercel.app/users/${dataType}/get`, {
          
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
      return data.data

  }

  catch (error) {
      console.error(error)
      return { result: false, message: 'Une erreur inattendue est survenue' }; // Retourne un objet avec un message d'erreur
  }
}