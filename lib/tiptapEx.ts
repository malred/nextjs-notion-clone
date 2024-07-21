export const handleUploadImg = async (file, url) => {
    try {
        const data = new FormData()
        data.set('file', file)
        data.set('url', url)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })
        // handle the error
        if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
        // Handle errors here
        console.error(e)
    }
}
