export async function attachToClipboard(str) {
    const result = await navigator.permissions.query({ name: 'clipboard-write' });
    if (result.state === 'granted' || result.state === 'prompt') {
        await navigator.clipboard.writeText(`localhost:8080/${str}`);
    }
}
