import React from 'react';
import RecordingDetails from './recordingDetails';
import ButtonsSection from './buttonsSection';
import SkipButton from './skipButton';

function TabBar() {
  return (
    <div className='flex items-center justify-between'>
      <RecordingDetails />
      <ButtonsSection />
      <SkipButton />
    </div>
  )
};

export default TabBar;