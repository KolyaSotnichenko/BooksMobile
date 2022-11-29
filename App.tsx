import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import MyBooksProvider from "./context/MyBooksProvider";

const API_KEY = "granbury::stepzen.net+1000::99cad73e472076a7878411b5fd6b1cf78663823a1e5c60c66660405f4e14ef6f";

// Initialize Apollo Client
const client = new ApolloClient({
    uri: "https://granbury.stepzen.net/api/fair-boxer/__graphql",
    headers: {
        Authorization: `Apikey ${API_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <ApolloProvider client={client}>
              <MyBooksProvider>
                  <Navigation colorScheme={colorScheme} />
              </MyBooksProvider>
              <StatusBar />
          </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}