/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import axios from 'axios';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const onChange = useCallback((e) => {
        // TODO: Set the component's new state based on the user's input
        setValue(e.target.value);
    }, [value]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        // TODO: shorten url and copy to clipboard
        axios
            .post('/url', { value })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('error in catch on post request: ', err);
            });
    }, [value]);

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" value="Shorten and copy URL" onSubmit={onSubmit} />
            {/* TODO: show below only when the url has been shortened and copied */}
            <div>
                {/* Show shortened url --- copied! */}
            </div>
        </form>
    );
};

export default ShortenUrlForm;
