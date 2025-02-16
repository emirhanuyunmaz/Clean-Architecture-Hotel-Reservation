import RoomImageCard from "./RoomImageCard";

export default function MostPickedList(){
    return (<div className="mt-10 mb-4" >
        <div className="mb-4" >
            <h2 className="text-2xl text-primary ms-4" >Most Picked</h2>
        </div>
        <div>
            <RoomImageCard />
        </div>
    </div>)
}