/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import axios from 'axios';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(false);

    const onChange = useCallback((e) => {
        // TODO: Set the component's new state based on the user's input
        setValue(e.target.value);
    }, [value]);

    const onSubmit = useCallback((e) => {
        (async () => {
            e.preventDefault();
            try {
                const { data } = await axios.post('/url', { value });
                if (data.error) {
                    setError(data.error);
                    setValue('');
                    document.getElementById('shorten').value = null;
                } else {
                    setShortUrl(data.shortUrl);
                    setError(data.error);
                    setValue('');
                    document.getElementById('shorten').value = null;
                }
            } catch (err) {
                setError(true);
            }
        })();
    }, [value]);

    return (
        <form onSubmit={onSubmit}>
            {error && <p>Unfortunatelly, an error occured. Please, try again</p>}
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" value="Shorten and copy URL" onSubmit={onSubmit} />
            {/* TODO: show below only when the url has been shortened and copied */}
            {shortUrl && (
                <div>
                    {`localhost:8080/${shortUrl}`}
                </div>
            )}
        </form>
    );
};

export default ShortenUrlForm;
