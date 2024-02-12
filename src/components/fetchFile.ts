import axios, { CanceledError } from "axios";
import { useEffect } from "react";

function fecthFile(fileName: string, originalFileName: string) {

    // useEffect(() => {
    return axios({
        url: `http://localhost:8080/file/${fileName}`, // Replace with your server URL
        method: 'GET',
        responseType: 'blob', // Important
    }).then((response) => {
        const fileBlob = response.data;
        const fileUrl = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = fileUrl;
        // link.setAttribute('download', `${originalFileName}`); // Set the desired filename or extension
        link.download = originalFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileUrl); // Clean up to prevent memory leaks
    });

    // }, [])

}

export default fecthFile;