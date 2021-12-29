import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useMemo } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { QueryParamProvider } from 'use-query-params'
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

const customTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none', background: 'transparent' },
        _active: { background: 'transparent', boxShadow: 'none' },
        _hover: { bg: 'transparent' },
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    lineColor: '#7878AE',
    blueLinkColor: '#00A3FF',
  },
  shadows: {
    ...theme.shadows,
    outline: 'none',
  },
})

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const adaptedHistory = useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state })
      },
      push(location) {
        navigate(location, { replace: false, state: location.state })
      },
    }),
    [navigate],
  )
  return children({ history: adaptedHistory, location })
}

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={RouteAdapter}>
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/analytics" element={<Home />} />
            <Route path="users/*" element={<Home />} />
            <Route path="/news" element={<Home />} />
            <Route path="/lookup/*" element={<Home />} />
            <Route path="/forum" element={<Home />} />

            <Route path="/partners" element={<Home />} />
            <Route path="/intro" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </QueryParamProvider>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App

export default App
