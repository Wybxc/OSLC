import { Center, CircularProgress, useColorMode } from '@chakra-ui/react';

export default function Spinner() {
  const { colorMode } = useColorMode();
  return (
    <Center py="5">
      <CircularProgress
        isIndeterminate
        color={colorMode === 'light' ? 'orange.300' : 'orange.500'}
      />
    </Center>
  );
}
