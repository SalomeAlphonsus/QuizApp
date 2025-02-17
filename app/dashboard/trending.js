import Link from "next/link";

const TrendingQuiz = () => {
    return (
      <div className="container mx-auto my-8 px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Trending Quiz</h1>
          <Link
          href='/dashboard/quiz'
            className="text-blue-500 text-sm hover:underline"
          >
            View all →
          </Link>
        </div>
  
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="Mask Group.png"
              className="w-full h-64 object-cover"
              
            />
            <div className="bg-white p-4">
              <h1 className="text-black font-semibold mb-2">
                Let's memorize the names of flowers
              </h1>
              <div className="flex items-center space-x-3">
                <img
                  src="Ellipse (7).png"
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Cyndy Lillibridge"
                />
                <span className="text-gray-600">Cyndy Lillibridge</span>
              </div>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="Mask Group (1).png"
              className="w-full h-64 object-cover"
              alt="Earth Quiz"
            />
            <div className="bg-white p-4">
              <h1 className="text-black font-semibold mb-2">
                Earth is our home and will always be
              </h1>
              <div className="flex items-center space-x-3">
                <img
                  src="Ellipse (8).png"
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Elmer Laverty"
                />
                <span className="text-gray-600">Elmer Laverty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TrendingQuiz;
  