import "../src/styles/globals.css";
import "../src/styles/theme.css";
import {ThemeProvider, useTheme} from "../src/context/ThemeProvider";
import {useEffect} from "react";

const AppWithTheme = ({children}) => {
    const {theme, toggleTheme} = useTheme();

    return (
            <div id="app" className={theme} /* Dark Mode - Exercise */>
                    {children}
            </div>
    )
};

const MyApp = ({Component, pageProps}) => {

    return (
        <ThemeProvider>
            <AppWithTheme>
                    <div className="px-4 m-auto max-w-7xl h-full">
                        <Component {...pageProps} />
                    </div>
            </AppWithTheme>
        </ThemeProvider>

    )

};

export default MyApp;
