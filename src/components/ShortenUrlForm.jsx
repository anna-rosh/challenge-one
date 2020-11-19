/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { attachToClipboard } from './clipboardHandling';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState(false);
    const [attachmentFailed, setAttachmentFailed] = useState(false);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, [value]);

    const onSubmit = useCallback((e) => {
        (async () => {
            e.preventDefault();
            try {
                const { data } = await axios.post('/url', { value });
                // show error message, when server sends error
                if (data.error) {
                    setError(true);
                    setValue('');
                    document.getElementById('shorten').value = null;
                } else {
                    // attaching to clipboard works only in Chrome
                    try {
                        await attachToClipboard(data.shortUrl);
                    } catch {
                        setAttachmentFailed(true);
                    }
                    setShortUrl(data.shortUrl);
                    setError(false);
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
            {attachmentFailed && <p>The link was not attached to your clipboard. Please, copy it manually.</p>}
            <label htmlFor="shorten">
                Url:
                <input placeholder="Url to shorten" id="shorten" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" value="Shorten and copy URL" onSubmit={onSubmit} />
            {shortUrl && (
                <div>
                    {/* localhost8080 is a placeholder for domain */}
                    {`localhost:8080/${shortUrl}`}
                </div>
            )}
        </form>
    );
};

export default ShortenUrlForm;
