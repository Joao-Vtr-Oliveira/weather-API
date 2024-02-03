import { Box } from '@chakra-ui/react'
import WeatherCard from './components/WeatherCard'

function App() {
  return (
    <Box h='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <WeatherCard />
    </Box>
  )
}

export default App
