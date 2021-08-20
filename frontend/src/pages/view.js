import React, { useState, useEffect } from 'react';
import { Layout, Tooltip, Card } from '../components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// markup

const ViewPage = () => {
    const [files, setFiles] = useState([]);
    const [image, showImage] = useState(false);
    const handleLove = (file) => {
        alert(JSON.stringify(file, null, 2));
        console.log(file);
        const config = {
            method: 'patch',
            url: 'http://127.0.0.1:5000/files',
            data: file,
            headers: {
                'User-Agent': 'Axios - console app',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `application/json`,
            },
        };

        axios(config)
            .then((resp) => {
                if (resp.status === 200) {
                    console.log(resp.data);
                    files.forEach((file) => {
                        if (file['hexS3'] == resp.data['hexS3'])
                            file['favcount'] = resp.data['favcount'];
                    });
                    setFiles([...files]);
                }
                return resp.data;
            })
            .catch((error) => console.log(error));
    };

    const retrieveFiles = () => {
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/files',
            headers: {
                'User-Agent': 'Axios - console app',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `multipart/form-data`,
            },
        };

        axios(config)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data.contents);

                if (resp.status == 200) {
                    setFiles([...resp.data.files]);
                }
                // if (resp.status === 200)
                //     setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
                return resp.data;
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        retrieveFiles();
    }, []);

    return (
        <Layout pageTitle="view">
            <h1>
                A look into other percentages.
                <div className="py-10 grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                    {files.map((file) => (
                        <div
                            className="flex flex-col shadow-md rounded-b-lg"
                            key={file.hexS3}
                        >
                            <Card
                                file={file}
                                url={`https://furspect-media.s3.amazonaws.com/${file.hexS3}`}
                                name={file.name}
                                width={file.width}
                                height={file.height}
                            />
                            <Tooltip
                                file={file}
                                name={file.name}
                                icon={faHeart}
                                accuracy={file.accuracy}
                                subcaption={'' + file.favcount}
                                caption="love!"
                                handleClick={() => handleLove(file)}
                            />
                        </div>
                    ))}
                </div>
                <br />
            </h1>
        </Layout>
    );
};

export default ViewPage;
