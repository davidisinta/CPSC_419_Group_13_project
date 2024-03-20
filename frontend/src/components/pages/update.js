import InventoryForm from "../inventory_form";
import { useParams } from 'react-router-dom';

export default function Update() {
    const { id } = useParams();
    return (
        <>  
            <InventoryForm loc_id={id} />
        </>
    )
}