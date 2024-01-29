import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { weatherReturnType } from '../types/weatherReturn';

const WeatherInfo = ({ locationData }: { locationData: weatherReturnType }) => {
	return (
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
				<Text fontSize='md'>Temperature: {locationData.current.temp_c}°C</Text>
				<Text fontSize='md'>Humidity: {locationData.current.humidity}%</Text>
				<Text fontSize='md'>Wind: {locationData.current.wind_kph} km/h</Text>
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
	);
};

export default WeatherInfo;
