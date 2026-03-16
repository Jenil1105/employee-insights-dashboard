import { useData } from "../context/dataContext";
import CityMap from "../components/CityMap";
import Navbar from "../components/NavBar";

function Analytics(){

    const {data} = useData();
    const citySalary = {};

    data.forEach(row=>{
        const city = row[2];
        const salary = Number((row[5]).replace(/[$,]/g, ""));
        if(!citySalary[city]) citySalary[city] = 0;
        citySalary[city] += salary;
    });

    const cities = Object.keys(citySalary);
    const salaries = Object.values(citySalary);

    const maxSal = Math.max(...salaries)

    const mapCities = [...new Set(data.map(emp => emp[2]))]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Salary Distribution</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Salary by City</h3>
                        <svg width="600" height="400">

                            {cities.map((city, i) => {
                                const barHeight = (citySalary[city] / maxSal) * 300
                                
                                return (
                                    <g key={city}>

                                        <text
                                            x={i * 80 + 75}
                                            y={340 - barHeight}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#374151"
                                        >
                                            {citySalary[city]}
                                        </text>

                                        <rect
                                            x={i * 80 + 50}
                                            y={350 - barHeight}
                                            width="50"
                                            height={barHeight}
                                            fill="#f97316"
                                            className="hover:opacity-80"
                                            />

                                        <text
                                            x={i * 80 + 75}
                                            y="370"
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="#374151"
                                            >
                                            {city}
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Employee Cities Map</h3>
                        <CityMap mapCities={mapCities} />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Analytics;