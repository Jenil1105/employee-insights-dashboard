import { useParams } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import Navbar from "../components/NavBar";
import { useData } from "../context/dataContext";

function Details(){

    const {id} = useParams();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const signCanvasRef = useRef(null);
    const streamRef = useRef(null);
    const { data } = useData()
    const [photo, setPhoto] = useState(null);
    const [drawing, setDrawing] = useState(false);
    const [mergedImage, setMergedImage] = useState(null);

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

    const mergeImages = () => {

        const photoImg = new Image();
        photoImg.src = photo;

        photoImg.onload = () => {

            const signatureCanvas = signCanvasRef.current;

            const mergeCanvas = document.createElement("canvas");
            const ctx = mergeCanvas.getContext("2d");

            mergeCanvas.width = photoImg.width;
            mergeCanvas.height = photoImg.height;

            ctx.drawImage(photoImg, 0, 0);

            ctx.drawImage(
                signatureCanvas,
                0,
                0,
                signatureCanvas.width,
                signatureCanvas.height,
                0,
                0,
                photoImg.width,
                photoImg.height
            );

            const finalImage = mergeCanvas.toDataURL("image/png");

            setMergedImage(finalImage);
        };
    };


    return(
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto">

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Employee Details</h2>
                <p className="text-gray-500 ">Name: {data[id][0]}</p>
                <p className="text-gray-500 mb-6">ID: {data[id][3]}</p>
                {!photo && (
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center gap-4">
                        <video ref={videoRef} autoPlay playsInline className="w-[400px] rounded-lg border" />
                        <br/>
                        <button 
                            onClick={capturePhoto}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition"
                        >Capture</button>
                        
                    </div>
                )}
                {!mergedImage && photo && (

                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center gap-4">
                    
                        <div className="relative w-[400px]">
                            <img src={photo} className="w-[400px] rounded-lg" />
                            <canvas 
                                ref={signCanvasRef}
                                width="400"
                                height="300"
                                className="absolute top-0 left-0 cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseLeave={stopDrawing}
                                onMouseUp={stopDrawing}
                            />
                            <div className="flex gap-4 pt-5">

                                <button 
                                    onClick={() => {setPhoto(null)}} 
                                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                                        Retake
                                </button>
                                <button 
                                    onClick={mergeImages}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium">
                                        Generate Audit Image
                                </button>
                            </div>
                        </div>
                    </div>
                    
                )}
            

                <canvas ref={canvasRef} style={{display:"none"}} />
                {mergedImage && (
                    
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mt-6 flex flex-col items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-800">Final Audit Image</h3>
                        <img src={mergedImage} className="w-[400px] rounded-lg border"/>
                    </div>
                )}
                
            </div>

        </div>
    )
}

export default Details