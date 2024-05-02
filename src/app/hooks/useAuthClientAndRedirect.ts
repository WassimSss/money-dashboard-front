import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/reducer/store';

/**
 * Utilise un hook pour effectuer une vérification d'authentification côté client et redirige l'utilisateur si nécessaire.
 *
 * @param {boolean} requireAuth - Indique si l'authentification est requise pour accéder à la page.
 * @param {string} redirect - L'URL de redirection si l'utilisateur n'est pas authentifié ou si l'authentification est inversée.
 *
 * @example
 * // Dans un composant React
 * useAuthClientAndRedirect(true, '/signin');
 */
const useAuthClientAndRedirect = (requireAuth: boolean, redirect: string) => {
    const router = useRouter();
    const token = useAppSelector(state => state.users.value).token; // Assurez-vous que le sélecteur correspond à la structure de votre store Redux

    useEffect(() => {
        // Si il a besoin d'être connecté
        if(requireAuth && !token){
            // Et il n'est pas connecté
                // console.log(`Client : Redirigez l'utilisateur vers la ${redirect} car non authentifié`)
                // Redirigez l'utilisateur vers la page de connexion si non authentifié
                router.push(redirect);
            
        } else if(!requireAuth && token){
                // console.log(`Client : Redirigez l'utilisateur vers la ${redirect} car authentifié`)
                // Redirigez l'utilisateur vers la page de connexion si non authentifié
                router.push(redirect);
            
        }
        
    }, [token, router]);
};

export default useAuthClientAndRedirect;
