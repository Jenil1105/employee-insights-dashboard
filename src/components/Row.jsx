
function Row({row}) {

  return (
    <>
        <div className="w-[300px] p-3">{row[0]}</div>
        <div className="w-[300px] p-3">{row[1]}</div>
        <div className="w-[200px] p-3">{row[2]}</div>
        <div className="w-[200px] p-3">{row[3]}</div>
        <div className="w-[200px] p-3">{row[4]}</div>
        <div className="w-[200px] p-3">{row[5]}</div>
    </>
    
  )
}

export default Row;