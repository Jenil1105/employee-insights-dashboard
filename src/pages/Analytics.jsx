import { useData } from "../context/dataContext";
import CityMap from "../components/CityMap";

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
        <div className="p-10">
            <h2>Salary Distribution</h2>
                <svg width="600" height="400">

                {cities.map((city, i) => {
                const barHeight = (citySalary[city] / maxSal) * 300

                return (
                    <g key={city}>
                    <rect
                        x={i * 80 + 50}
                        y={350 - barHeight}
                        width="50"
                        height={barHeight}
                        fill="#4f46e5"
                    />

                    <text
                        x={i * 80 + 75}
                        y="370"
                        textAnchor="middle"
                        fontSize="12"
                    >
                        {city}
                    </text>
                    </g>
                )
                })}
            </svg>
            <CityMap mapCities={mapCities} />
        </div>
    );

};

export default Analytics;