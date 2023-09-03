// import ResumeSimpleSteps from './ResumeSimpleSteps.svg'
import React, { useState } from "react";
import "./index.css";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Progress, Input, Button } from "antd";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";
// import LazyLoaderFlag from "./LazyLoaderFlag";
const { Dragger } = Upload;

const App = () => {
  const [message, setMessage] = useState("");
  const [files, SetFiles] = useState({});
  const [countries, setCountries] = useState([]);
  console.log(countries);
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
  const displayCountries = async () => {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    if (response.status) {
      setCountries(response.data);
    }
  };

  return (
    <>
      <Dragger
        accept=".pdf,.docx"
        showUploadList={false}
        customRequest={HandleFileUpload}
      >
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
      <ErrorMessage />
      <Input onChange={(e) => setMessage(e.target.value)} />
      {message}
      <Button type="primary" onClick={displayCountries}>
        Show Countries
      </Button>
      {countries.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {countries.map((country, index) => {
            return (
              <div
                style={{ height: "300px", width: "300px", overflow: "hidden" }}
                key={index}
              >
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                {country.name.common}
              </div>
            );
          })}
        </div>
      )}
      {/* <LazyLoaderFlag/> */}
    </>
  );
}

export default App;
