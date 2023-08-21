import React, { useState } from "react";
import "./index.css";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Progress } from "antd";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";
const { Dragger } = Upload;

const App = () => {
  const [files, SetFiles] = useState({});
  const HandleFileUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("input", file);
    const getFileObject = (progress) => {
      return {
        name: file.name,
        uid: file.uid,
        progress: progress,
      };
    };
    await axios.post(
      "https://muse-dev-api.goarya.com/api/parse-resume",
      formData,
      {
        onUploadProgress: (ProgressEvent) => {
          const progress = ProgressEvent.loaded / ProgressEvent.total;
          SetFiles((pre) => {
            return { ...pre, [file.uid]: getFileObject(progress) };
          });
        },
      }
    );
  };

  return (
    <>
      <Dragger showUploadList={false} customRequest={HandleFileUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      {Object.values(files).map((file, index) => {
        return (
          <Progress percent={Math.ceil(file.progress * 100)} key={index} />
        );
      })}
      <ErrorMessage/>
    </>
  );
};
export default App;
