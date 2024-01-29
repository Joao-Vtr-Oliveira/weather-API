import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { weatherRequest } from '../requests/weatherRequest';
import { weatherReturnType } from '../types/weatherReturn';

const WeatherCard = () => {
  const [location, setLocation] = useState('Betim');
  const [locationData, setLocationData] = useState<weatherReturnType | null>(
    null
  );
  const toast = useToast();

  useEffect(() => {
    fetchButton();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetchButton();
  };

  const fetchButton = async () => {
    let loadingToastId;
    try {
			loadingToastId = toast({
				title: 'Searching for the location...',
				description: 'Please, wait',
				status: 'info',
				duration: null,
				isClosable: false,
			});
			const info = await weatherRequest(location);
			setLocationData(info);
      console.log(info);
			toast.close(loadingToastId);
			if (info) {
				toast({
					title: 'Request completed',
					description: 'Sucess!',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
			}
		} catch (error) {
			setLocationData(null);
			if (loadingToastId) toast.close(loadingToastId);
			toast({
				title: 'Failed to find place',
				description: 'Please, check the name',
				status: 'error',
				duration: null,
				isClosable: true,
			});
		}
  };

  return (
    <Flex minH='80vh' w='100%' align='center' justify='center'>
      <Card
        maxW='xl'
        w='full'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
      >
        <CardHeader textAlign='center' bg='teal.500' py={4}>
          <Heading as='h1' size='xl' color='white'>
            Weather API
          </Heading>
        </CardHeader>
        <CardBody textAlign='center' p={4}>
          <Heading
            as='h2'
            fontFamily='sans-serif'
            size='lg'
            mt={3}
            mb={2}
            color='teal.500'
          >
            {locationData?.location.name || 'Name'}
          </Heading>
          {locationData && (
            <Text textAlign='center' mb={4} color='gray.600'>
              {locationData?.location.region +
                ' - ' +
                locationData?.location.country}
            </Text>
          )}

          {locationData && (
            <Box
              borderWidth='1px'
              borderRadius='lg'
              p={4}
              display='flex'
              flexDirection='column'
              alignItems='center'
              bg='white'
              boxShadow='md'
            >
              <Flex
                direction='column'
                alignItems='center'
                justifyContent='center'
                h='100%'
              >
                <Text fontSize='md'>
                  Temperature: {locationData.current.temp_c}°C
                </Text>
                <Text fontSize='md'>
                  Humidity: {locationData.current.humidity}%
                </Text>
                <Text fontSize='md'>
                  Wind: {locationData.current.wind_kph} km/h
                </Text>
                <Flex alignItems='center'>
                  <Text fontSize='lg' mr={2}>
                    Status: {locationData.current.condition.text}
                  </Text>
                  <Image
                    src={locationData.current.condition.icon}
                    alt='Weather Icon'
                    boxSize='2em'
                  />
                </Flex>
              </Flex>
            </Box>
          )}
        </CardBody>
        <CardFooter justify='center' p={4} bg='teal.500'>
          <Input
            flex='1'
            mb={{ base: 2, sm: 0 }}
            mr={{ base: 0, sm: 2 }}
            placeholder='Location'
            value={location}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            color='white'
          />
          <Button onClick={fetchButton} colorScheme='whiteAlpha'>
            Search
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default WeatherCard;
