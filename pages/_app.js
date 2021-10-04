import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
function MyApp({ Component, pageProps }) {
    const [login, setLogin] = useState();
    const onLoginHandler = (data) => {
        setLogin(data);
    };

    console.log(login);
    return (
        <Layout login={onLoginHandler} isLogin={login}>
            <Component {...pageProps} login={onLoginHandler} isLogin={login} />
        </Layout>
    );
}

export default MyApp;
