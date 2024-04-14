import { NextRouter } from "next/router";

export const requireAuth = (isRequireAuth: Boolean, router: NextRouter, userToken: string) => {

    console.log(!userToken, isRequireAuth);

    // Si l'utilisateur n'a pas de token alors que la page requiere que l'utilisateur soit connecté
    if (!userToken && isRequireAuth) {
        console.log(" l'utilisateur n'a pas de token alors que la page requiere que l'utilisateur soit connecté")
        router.push('/signin')
    }
    // Si l'utilisateur a un token alors que la page requiere que l'utilisateur ne soit pas connecté
    else if (userToken && !isRequireAuth) {
        console.log("l'utilisateur a un token alors que la page requiere que l'utilisateur ne soit pas connecté")
    }

}

