/* eslint no-unused-vars: 1 */
import React, { useCallback, useState } from 'react';
import axios from 'axios';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [attachmentFailed, setAttachmentFailed] = useState(false);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback((e) => {
        (async () => {
            e.preventDefault();
            try {
                const { data } = await axios.post('/url', { value });
                // show a specified error message when the server sends one
                if (data.error) {
                    setError(data.error);
                    setShortUrl('');
                } else {
                    // attaching to clipboard works only in Chrome
                    try {
                        await navigator.clipboard.writeText(`localhost:8080/${data.shortUrl}`);
                    } catch {
                        setAttachmentFailed(true);
                    }
                    setError('');
                    setShortUrl(data.shortUrl);
                }
                setValue('');
            } catch (err) {
                setError('The request to the server failed. Please, try again.');
            }
        })();
    }, [value]);

    return (
        <form onSubmit={onSubmit}>
            {error && <p>{error}</p>}
            {attachmentFailed && <p>The link was not attached to your clipboard. Please, copy it manually.</p>}
            <label htmlFor="shorten">
                Paste URL here:
                <input placeholder="URL to shorten" id="shorten" type="text" value={value} onChange={onChange} />
            </label>
            <input type="submit" value="Shorten and copy URL" />
            {shortUrl && (
                <div>
                    {/* localhost8080 is a placeholder for domain */}
                    {`http://localhost:8080/${shortUrl}`}
                </div>
            )}
        </form>
    );
};

export default ShortenUrlForm;
