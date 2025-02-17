import FindFriends from '../components/findFriends';
import TopAuthors from '../components/topAuthors';
import TrendingQuiz from './trending';
import TopPick from './topPicks';

export default function Page() {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <FindFriends />
            <TopAuthors />
            <TrendingQuiz/>
            <TopPick/>
        </div>
    );
}