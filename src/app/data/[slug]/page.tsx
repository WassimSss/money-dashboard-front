import { useRouter } from 'next/router'

const Home: React.FC = () => {
    const router = useRouter()

    return (
        <>
            <h1>Route : {router.query.slug}</h1>
        </>

    );
}