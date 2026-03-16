import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/dataContext";
import Navbar from "../components/NavBar";
import Row from "../components/Row";

function List(){
    
    const rowHeight = 50;
    const containerHeight = 550;
    const buffer = 5;
    const navigate = useNavigate();

    const [scrollTop, setScrollTop] = useState(0);
    const { data } = useData()

    const handleScroll = (e)=>{
        setScrollTop(e.target.scrollTop);
    }
    
    const startIdx = Math.max(0,Math.floor(scrollTop/rowHeight)-buffer);
    const visibleCount = Math.ceil(containerHeight/rowHeight);
    const endIdx = startIdx+visibleCount+buffer*2;

    const visibleData = data.slice(startIdx, endIdx);

    const offsetY = startIdx*rowHeight;
    const totalHeight = data.length*rowHeight;

    const handleClick = (i) =>{
        navigate(`/details/${startIdx + i}`)
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6">

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee list</h2>
                <div className="bg-white rounded-xl shadow border border-gray-200">

                    <div className="flex bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                        <div className="w-[300px] p-3">Name</div>
                        <div className="w-[300px] p-3">Position</div>
                        <div className="w-[200px] p-3">Location</div>
                        <div className="w-[200px] p-3">ID</div>
                        <div className="w-[200px] p-3">Start Date</div>
                        <div className="w-[200px] p-3">Salary</div>
                    </div>

                    <div className="overflow-y-auto" style={{height: containerHeight}} onScroll={handleScroll}>

                        <div style={{height: totalHeight, position:"relative"}}>

                            <div style={{transform: `translateY(${offsetY}px)`}}>

                                {visibleData.map((row, i)=>(
                                    <div 
                                        onClick={()=>handleClick(i)} 
                                        key={i} 
                                        className="flex border-b border-gray-200 hover:bg-orange-50 cursor-pointer transition"
                                        style={{height:rowHeight}}>
                                        <Row row={row}/>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default List;