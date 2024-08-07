import { Provider } from "react-redux";
import Header from "././components/header/header.component";
import Footer from "././components/footer/footer.component";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import React from "react";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from './configurations/lib/ga'
import ErrorBoundary from "./configurations/Error";
import FooterStatic from "./components/footer/footer-static.component";
const MainRoot = ({ Component, pageProps }) => {
        const router = useRouter()

        useEffect(() => {
                const handleRouteChange = (url) => {
                        ga.pageview(url)
                }
                //When the component is mounted, subscribe to router changes
                //and log those page views
                router.events.on('routeChangeComplete', handleRouteChange)

                // If the component is unmounted, unsubscribe
                // from the event with the `off` method
                return () => {
                        router.events.off('routeChangeComplete', handleRouteChange)
                }
        }, [router.events])
        return process.browser ? (
                <ErrorBoundary>
                        <PersistGate persistor={persistor} loading={<div>Loading</div>}>
                                <Provider store={store}>
                                        <Header />
                                        <Component {...pageProps} />
                                        <FooterStatic />
                                        <Footer />
                                </Provider>
                        </PersistGate>
                </ErrorBoundary>
        ) : (
                <ErrorBoundary>

                        <Provider store={store}>
                                <Header />
                                <Component {...pageProps} />
                                <FooterStatic />
                                <Footer />
                        </Provider>
                </ErrorBoundary>
        );

}
export default MainRoot;
