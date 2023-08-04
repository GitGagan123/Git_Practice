import React, { useState } from "react";
import { Button, Space, Typography, Upload } from "antd";
import axios from "axios";
const { Dragger } = Upload;
const FileUpload = () => {

  const [files, setFiles] = useState({});
  const HandleFileUpload = ({ file }) => {

    console.log(file);
    setFiles((pre) => {
      return { ...pre, [file.uid]: file };
    });
    try {
      axios.post("https://muse-dev-api.goarya.com/api/parse-resume", file, {
        onUploadProgress: (event) => {
          console.log(event);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Space direction="vertical">
        <Dragger multiple customRequest={HandleFileUpload}>
          <Button>Click To Upload</Button>
        </Dragger>
        {Object.values(files).map((file, index) => {
          return (
            <Space>
              <Typography>{file.name}</Typography>
            </Space>
          );
        })}
      </Space>
    </>
  );
};

export default FileUpload;
