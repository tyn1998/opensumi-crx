import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import MessagesView from './MessagesView/MessagesView';

const Panel = () => {
  return <MessagesView />;

  // return (
  //   <Tabs forceRenderTabPanel={true}>
  //     <TabList>
  //       <Tab>Messages</Tab>
  //       <Tab>XXX</Tab>
  //     </TabList>

  //     <TabPanel>
  //       <MessagesTab />
  //     </TabPanel>
  //     <TabPanel>
  //       <div>XXX</div>
  //     </TabPanel>
  //   </Tabs>
  // );
};

export default Panel;
