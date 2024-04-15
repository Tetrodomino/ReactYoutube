import {Outlet} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';
import SearchHeader from './components/SearchHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <SearchHeader />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
