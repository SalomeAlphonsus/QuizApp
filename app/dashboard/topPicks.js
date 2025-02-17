import Link from "next/link";

const TopPick = () => {
    return (
      <div className="container mx-auto px-4 mt-28">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Top Picks</h1>
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
              src="Image.png"
              className="w-full h-64 object-cover"
              
            />
            <div className="bg-white p-4">
              <h1 className="text-black font-semibold mb-2">
                Save life around green earth
              </h1>
              <div className="flex items-center space-x-3">
                <img
                  src="Ellipse (9).png"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-600">Willard Purnelli</span>
              </div>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="Image (1).png"
              className="w-full h-64 object-cover"
              
            />
            <div className="bg-white p-4">
              <h1 className="text-black font-semibold mb-2">
                Play quizzes, be smart and have fun
              </h1>
              <div className="flex items-center space-x-3">
                <img
                  src="Ellipse (10).png"
                  className="w-8 h-8 rounded-full object-cover"
                  
                />
                <span className="text-gray-600">Geoffrey Mott</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopPick;
  