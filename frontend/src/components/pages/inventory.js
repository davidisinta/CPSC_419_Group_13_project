import InventoryTable from "../inventory_table.js"

export default function Iventory({currentZone}) {
    return (
        <div className="printer-page">
            <InventoryTable currentZone={ currentZone }/>
        </div>
    )
};