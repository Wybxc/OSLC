import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { TbMoon, TbSun } from 'react-icons/tb';

import React from 'react';

const ColorModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const label = colorMode === 'light' ? '切换到暗色模式' : '切换到亮色模式';
  return (
    <IconButton
      aria-label={label}
      title={label}
      icon={
        colorMode === 'light' ? (
          <Icon as={TbSun} boxSize={5} />
        ) : (
          <Icon as={TbMoon} boxSize={5} />
        )
      }
      onClick={toggleColorMode}
      variant="ghost"
    />
  );
};

export default ColorModeSwitch;
