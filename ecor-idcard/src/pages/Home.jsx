import ecorHQ from '../assets/ecorHQ.jpg'
import azadi from '../assets/azadi-ka-amrit-mahotsav.png'
export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-8 min-h-screen">

      {/* BLUE HEADER LINE with logo */}
      <div className="flex items-center justify-between bg-blue-800 text-white py-2 px-4 rounded-t-lg shadow mb-6">
        {/* Welcome Text */}
        <h2 className="text-base md:text-lg font-bold tracking-wide">
    🏠 Welcome to <span className="text-yellow-300">East Coast Railway I-Card Portal</span>
       </h2>

        {/* Azadi Logo */}
        <img
          src={azadi}
          alt="Azadi Ka Amrit Mahotsav"
          className="h-10 md:h-12"
        />
      </div>

      {/* IMAGE BELOW */}
      <div className="flex justify-center">
        <img
          src={ecorHQ}
          alt="East Coast Railway HQ"
          className="rounded-xl border border-blue-300 shadow-lg max-w-10xl w-full"
        />
      </div>
    </div>
  );
}
