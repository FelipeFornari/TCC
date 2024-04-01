import {BaseRoutes} from "./routes/BaseRoutes";
import {Box, ChakraProvider} from "@chakra-ui/react";

export function App() {
    return (
        <>
            <ChakraProvider>
                <Box h="100vh" w="100vw" alignItems= "center" >
                    <BaseRoutes />
                </Box>
            </ChakraProvider>
        </>
    );
}
