import { useParams } from "react-router-dom";
import { useEffect,useState,useRef, use } from "react";

function Details(){

  const {id} = useParams();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const signCanvasRef = useRef(null);
  const streamRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            streamRef.current = stream;

            if (videoRef.current) {
            videoRef.current.srcObject = stream;
            }
        };

        if (!photo) {
            startCamera();
        }

        return () => {
            if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [photo]);

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL("image/png");

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        video.srcObject = null;

        setPhoto(imageData);
    };

    const startDrawing = (e)=>{
        const canvas = signCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(
            e.clientX - rect.left,
            e.clientY - rect.top
        )
        setDrawing(true);
    };

    const draw = (e)=>{
        if(!drawing) return;
        const canvas = signCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");

        ctx.lineTo(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
        ctx.stroke();

    };
    const stopDrawing = () => {
        setDrawing(false);
    }


    return(
        <div>
        <h2>Employee Details</h2>
        <p>ID: {id}</p>
        {!photo && (
            <>
                <video ref={videoRef} autoPlay playsInline style={{width:"400px"}} />
                <br/>
                <button onClick={capturePhoto}>Capture</button>
                
            </>
        )}
        {photo && (
            <div style={{position:"relative",width:"400px"}}>
                <img src={photo} width="400px" />
                <canvas 
                    ref={signCanvasRef}
                    width="400"
                    height="300"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0
                    }} 
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseLeave={stopDrawing}
                    onMouseUp={stopDrawing}
                />
                <button onClick={() => {setPhoto(null)}}>Retake</button>
            </div>
            
        )}
        

        <canvas ref={canvasRef} style={{display:"none"}} />

        </div>
    )
}

export default Details