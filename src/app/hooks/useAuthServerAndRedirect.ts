import { useAppSelector } from '@/reducer/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Utilise un hook pour effectuer une vérification d'authentification côté serveur et redirige l'utilisateur si nécessaire.
 *
 * @param {boolean} requireAuth - Indique si l'authentification est requise pour accéder à la page.
 * @param {string} redirect - L'URL de redirection si l'utilisateur n'est pas authentifié ou si l'authentification est inversée.
 *
 * @example
 * // Dans un composant React
 * useAuthServerAndRedirect(true, '/signin');
 */
const useAuthServerAndRedirect = (requireAuth: boolean, redirect: string) => {
	const router = useRouter();
	const token = useAppSelector(state => state.users.value).token


	useEffect(
		() => {
			// Simulez une vérification d'authentification côté serveur
			const checkAuth = async () => {
				const response = await fetch(`https://money-dashboard-back.vercel.app/api/check-auth  `, {
					method: 'GET',
					cache: 'no-store',
					headers: {
						Authorization: `Bearer ${token}`, // Ajoutez le token dans l'en-tête Authorization
					},
				});
				const data = await response.json();

				if (requireAuth && !data.isAuthenticated) {
					router.push(redirect);
				} else if (!requireAuth && data.isAuthenticated) {

					router.push(redirect);
				}
			};

			checkAuth();
		},
		[router]
	);
};

export default useAuthServerAndRedirect;
