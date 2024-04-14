import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store';

const useAuth = () => {
    const router = useRouter();
    const token = useAppSelector(state => state.users.value).token; // Assurez-vous que le sélecteur correspond à la structure de votre store Redux

    useEffect(() => {
        if (!token) {
            console.log("Redirigez l'utilisateur vers la page de connexion si non authentifié")
            // Redirigez l'utilisateur vers la page de connexion si non authentifié
            router.push('/signin');
        }
    }, [token, router]);
};

export default useAuth;
