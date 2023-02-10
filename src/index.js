import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StylesProvider} from "@material-ui/styles";

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new QueryClient()

root.render(
    <QueryClientProvider client={client}>
        <StylesProvider injectFirst>
            <App/>
        </StylesProvider>
    </QueryClientProvider>
);

