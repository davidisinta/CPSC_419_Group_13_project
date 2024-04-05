import InventoryTable from "../inventory_table"

export default function Home({ currentZone }) {
    return (
        <div className="home-page">
            <InventoryTable currentZone={ currentZone }/>
        </div>
    )
}