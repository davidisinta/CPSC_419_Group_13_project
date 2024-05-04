import PrinterTable from "../printerTable";

export default function Home({ currentZone }) {
    return (
        <div className="home-page">
            <PrinterTable currentZone={ currentZone }/>
        </div>
    )
};