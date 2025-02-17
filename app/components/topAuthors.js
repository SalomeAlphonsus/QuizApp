import authors from '../data/authors';
import Card from './card';
import Link from 'next/link';

const TopAuthors = () => {
    return (
        <div className="relative lg:bottom-32 bottom-0">
            <div className="flex justify-between items-center mb-6 px-10">
                <h2 className="text-2xl font-bold text-black">Top Authors</h2>
                <Link href='/dashboard/quiz' className="text-primary text-sm hover:underline">
                    View all →
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {authors.map((author) => (
                    <Card key={author.id} image={author.image} name={author.name} />
                ))}
            </div>
        </div>
    );
};

export default TopAuthors;