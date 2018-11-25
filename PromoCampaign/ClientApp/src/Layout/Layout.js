import React from 'react';

const layout = (props) => (
    <React.Fragment>
        <header></header>
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;