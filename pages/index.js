import Head from 'next/head'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Vaults from './vaults'
import Factory from './factory'
import Portfolio from './portfolio'
import Strategies from './strategies'


export default function Home() {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    return (
        <div>
            <Strategies />
        </div>
    )
}
