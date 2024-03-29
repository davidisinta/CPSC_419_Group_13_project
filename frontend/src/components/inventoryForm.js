import { React, useState, useEffect} from 'react';
import { 
    Card,
    Button,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    SearchSelect,
    SearchSelectItem,
    NumberInput } from '@tremor/react';
import axios from 'axios';

export default function InventoryForm({ location }) {
    // Declaring state variables
    const [tonerTypes, setTonerTypes] = useState([]);
    const [tonerCounts, setTonerCounts] = useState({
        id: '',
        black: '',
        cyan: '',
        magenta: '',
        yellow: ''
    });
    const [paperCount, setPaperCount] = useState('');
    const [equipment, setEquipment] = useState({
        keyboards: '',
        mice: '',
    });
    // Function to handle toner count changes in the Toner form
    const handleTonerCountChange = (value, color) => {
        setTonerCounts({
            ...tonerCounts,
            [color]: value
        });
    };
    // Function to handle paper count changes in the Paper form
    const handlePaperCountChange = (value) => {
        setPaperCount(value);
    };
    // Function to handle equipment count changes in the Equipment form
    const handleEquipmentChange = (value, equipmentType) => {
        setEquipment({
            ...equipment,
            [equipmentType]: value
        });
    };
    // Function to handle form submission
    let endpoint = 'http://127.0.0.1:5000/';
    const handleSubmit = async (event) => {
        event.preventDefault();
        const msg = {
            loc_id: location.id,
            toner_counts: tonerCounts,
            paper_count: paperCount,
            equipment: equipment,
        };
        console.log(msg);
        endpoint = endpoint + 'update_inventory';
        try {
            await axios.post(endpoint, {
                body: msg})
            .then(response => {
                console.log('Success:', response);
            });
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    // Fetch toner types from the backend on page load
    useEffect(() => {
        const fetchTonerTypes = async () => {
            try{
                await axios.get('http://127.0.0.1:5000/get_toner_types')
                .then(response => {
                    setTonerTypes(response.data);
                });
            }
            catch (error) {
                console.error('Error fetching toner types:', error);
            }
        }
        fetchTonerTypes();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="rounded-lg">
                <Card className="mx-auto max-w-xs">
                <p className="text-2xl text-center text-tremor-content-strong dark:text-dark-tremor-content"> { location.loc }Cluster</p>
                <div className="flex justify-center space-x-5 pt-5">
                    <div className="space-y-3">
                    <TabGroup>
                        <TabList>
                            <Tab>Toner</Tab>
                            <Tab>Paper</Tab>
                            <Tab>Equipment</Tab>
                        </TabList>
                        <TabPanels>
                        <TabPanel>
                            {/* Toner Form */}
                            <div>
                                <div className='flex items-center whitespace-nowrap pb-2'>
                                    <label className='dark:text-dark-tremor-content pr-2'>Toner Type</label>
                                    <SearchSelect onValueChange={(value) => {handleTonerCountChange(value, 'id')}} placeholder='Start typing ...'>
                                        {tonerTypes.map((item) => (
                                            <SearchSelectItem key={item.id} value={item.id}>{item.type}</SearchSelectItem>
                                        ))}
                                    </SearchSelect>
                                </div>
                                <div className="flex justify-center pb-2">
                                    <span className="text-center text-white dark:text-dark-tremor-content">Toner Counts</span>
                                </div>
                                <div className='flex items-center pb-4'>
                                    <label className='dark:text-dark-tremor-content pr-2'>Black</label>
                                    <NumberInput min={0} max={20} step={1} placeholder={location.black_toner} onValueChange={(value) => handleTonerCountChange(value, 'black')}/>
                                </div>
                                <div className='flex items-center pb-4'>
                                    <label className='dark:text-dark-tremor-content pr-2'>Cyan</label>
                                    <NumberInput min={0} max={20} step={1} placeholder={location.cyan_toner} onValueChange={(value) => handleTonerCountChange(value, 'cyan')}/>
                                </div>
                                <div className='flex items-center pb-4'>
                                    <label className='dark:text-dark-tremor-content pr-2'>Magenta</label>
                                    <NumberInput min={0} max={20} step={1} placeholder={location.magenta_toner} onValueChange={(value) => handleTonerCountChange(value, 'magenta')}/>
                                </div>
                                <div className='flex items-center pb-2'>
                                    <label className='dark:text-dark-tremor-content pr-2'>Yellow</label>
                                    <NumberInput min={0} max={20} step={1} placeholder={location.yellow_toner} onValueChange={(value) => handleTonerCountChange(value, 'yellow')}/> 
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Paper Form */}
                            <div>
                                <div className='flex items-center'>
                                    <label className='dark:text-dark-tremor-content whitespace-nowrap pr-2'>Paper Count</label>
                                    <NumberInput min={0} max={20} step={.1} placeholder={location.paper} onValueChange={(value) => handlePaperCountChange(value)}/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Equipment Form */}
                            <div>
                                <div className='flex items-center pb-2'>
                                    <label className='dark:text-dark-tremor-content whitespace-nowrap pr-2'>Keyboards</label>
                                    <NumberInput min={0} max={20} step={1} onValueChange={(value) => handleEquipmentChange(value, 'keyboards')}/>
                                </div>
                                <div className='flex items-center'>
                                    <label className='dark:text-dark-tremor-content whitespace-nowrap pr-2'>Mice</label>
                                    <NumberInput min={0} max={20} step={1} onValueChange={(value) => handleEquipmentChange(value, 'mice')}/>
                                </div>
                            </div>
                        </TabPanel>
                        </TabPanels>
                    </TabGroup>
                    </div>
                </div>
                <div className="flex justify-center pt-5">
                    <Button size='xs' variant="secondary" onClick={handleSubmit}>Submit</Button>
                </div>
                </Card>
            </div>
        </div>
    )
}
