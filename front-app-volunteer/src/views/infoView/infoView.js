import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import InfoGamesView from './infoGamesView/infoGamesView';
import DiscoveryNightsView from './discoveryNightsView/discoveryNightsView';
import InfoGeneralView from './infoGeneralView/infoGeneralView';

import './infoView.css';

export default function InfoView(props){
    
    return(
        <div className='infoView'>
            <Tabs className='custom-tabs'>
                <TabList className='custom-tab-list'>
                    <Tab className='custom-tab'>Infos pratiques</Tab>
                    <Tab className='custom-tab'>Soirées découvertes</Tab>
                    <Tab className='custom-tab'>Liste des jeux</Tab>
                </TabList>

                <TabPanel>
                    <InfoGeneralView games={props.games} countUsers={props.countUsers}/>
                </TabPanel>

                <TabPanel>
                    <DiscoveryNightsView actualUser={props.actualUser} users={props.users} />
                </TabPanel>

                <TabPanel>
                    <InfoGamesView games={props.games} />
                </TabPanel>
            </Tabs>            
        </div>
    );    
}