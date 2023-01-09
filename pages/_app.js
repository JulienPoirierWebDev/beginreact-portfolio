import "../src/styles/globals.css";
import "../src/styles/theme.css";
import {ThemeProvider, useTheme} from "../src/context/ThemeProvider";
import {useEffect} from "react";

const MyApp = ({children}) => {
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        console.log("changeTheme")
    }, [toggleTheme])
    return (
        <ThemeProvider>
            <div id="app" className={theme} /* Dark Mode - Exercise */>
                    {children}
            </div>
        </ThemeProvider>
    )
};

const AppWrapper = ({Component, pageProps}) => {

    return (
        <MyApp>
                <div className="px-4 m-auto max-w-7xl h-full">
                    <Component {...pageProps} />
                </div>
        </MyApp>
        )

};

export default AppWrapper;
