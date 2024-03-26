import React from 'react';
import { 
    Card,
    Button,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TextInput } from '@tremor/react';

export default function InventoryForm({ location }) {
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
                            <Tab>Miscellaneous</Tab>
                        </TabList>
                        <TabPanels>
                        <TabPanel>
                            {/* Toner Form */}
                            <div className="justify-center">
                                <div className='pb-2'>
                                    <label>Toner Type</label>
                                    <TextInput placeholder="Toner Type" />
                                </div>
                                <div className="flex justify-center">
                                    <span className="text-center">Toner Counts</span>
                                </div>
                                <div className='pb-2'>
                                    <label>Black</label>
                                    <TextInput placeholder="Black" />
                                </div>
                                <div className='pb-2'>
                                    <label>Cyan</label>
                                    <TextInput placeholder="Cyan" />
                                </div>
                                <div className='pb-2'>
                                    <label>Magenta</label>
                                    <TextInput placeholder="Magenta" />
                                </div>
                                <div className='pb-2'>
                                    <label>Yellow</label>
                                    <TextInput placeholder="Yellow" />  
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Paper Form */}
                            <div className="flex justify-center">
                                <TextInput placeholder="Paper" />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Miscellaneous Form */}
                            <div className="flex justify-center">
                            </div>
                        </TabPanel>
                        </TabPanels>
                    </TabGroup>
                    </div>
                </div>
                <div className="flex justify-center pt-5">
                    <Button size='xs' variant="secondary">Submit</Button>
                </div>
                </Card>
            </div>
        </div>
    )
}
