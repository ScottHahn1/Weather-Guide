import Current from '../components/Current';
import Today from '../components/Today';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className='home'>
            <Current />
            <Today />
        </div>
    )
}

export default Home;