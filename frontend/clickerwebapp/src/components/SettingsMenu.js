import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  margin: 20px 0;
`;

const SettingItem = styled.div`
  margin: 10px 0;
`;

const backgrounds = [...];

function SettingsMenu() {
  const [currentBackground, setCurrentBackground] = useState('default');
  const [notifications, setNotifications] = useState(true);

  const changeBackground = (bg) => {
    setCurrentBackground(bg);
    // Обновление фона
    console.log(`Background changed to ${bg}`);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // Уведомление
    console.log(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
  };

  return (
    <SettingsWrapper>
      <h3>Settings</h3>
      <SettingItem>
        <label>Background: </label>
        <select value={currentBackground} onChange={(e) => changeBackground(e.target.value)}>
          {backgrounds.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </SettingItem>
      <SettingItem>
        <label>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={toggleNotifications} 
          />
          Enable notifications
        </label>
      </SettingItem>
    </SettingsWrapper>
  );
}

export default SettingsMenu;