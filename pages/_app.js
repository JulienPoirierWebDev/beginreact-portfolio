import "../src/styles/globals.css";
import "../src/styles/theme.css";
import {ThemeProvider, useTheme} from "../src/context/ThemeProvider";
import {MemoryProvider} from "../src/context/MemoryProvider";

const AppWithTheme = ({children}) => {
    const {theme} = useTheme();

    return (
            <div id="app" className={theme} /* Dark Mode - Exercise */>
                    {children}
            </div>
    )
};

const MyApp = ({Component, pageProps}) => {

    return (
        <ThemeProvider>
            <MemoryProvider>
                <AppWithTheme>
                        <div className="px-4 m-auto max-w-7xl h-full">
                            <Component {...pageProps} />
                        </div>
                </AppWithTheme>
            </MemoryProvider>
        </ThemeProvider>

    )

};

export default MyApp;
