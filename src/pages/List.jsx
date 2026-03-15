import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function List(){
    
    const rowHeight = 50;
    const containerHeight = 800;
    const buffer = 5;
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);


    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch("https://backend.jotish.in/backend_dev/gettabledata.php",
                {method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({username:"test", password:"123456"})
                }
            )
            const result = await res.json();
            setData(result.TABLE_DATA.data);
        };
        fetchData();
    },[]);

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
        <div>
            <h2>Employee list</h2>

            <div 
                style={{
                    height: containerHeight,
                    overflowY: "auto",
                    border: "1px solid black"
                }}
                onScroll={handleScroll}
            >

                <div style={{height: totalHeight, position:"relative"}}>

                    <div style={{transform: `translateY(${offsetY}px)`}}>

                        {visibleData.map((row, i)=>(
                            <div onClick={()=>handleClick(i)} key={i} style={{height:rowHeight, display:"flex", borderBottom:"1px solid gray"}}>
                                <div style={{width:"200px"}}>{row[0]}</div>
                                <div style={{width:"200px"}}>{row[1]}</div>
                                <div style={{width:"200px"}}>{row[2]}</div>
                                <div style={{width:"200px"}}>{row[3]}</div>
                                <div style={{width:"200px"}}>{row[4]}</div>
                                <div style={{width:"200px"}}>{row[5]}</div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            
            
        </div>
    );

};

export default List;