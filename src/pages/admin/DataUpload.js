import React, { useState } from "react";
import { Grid, Typography, Divider, Box, Button, Alert } from "@mui/material";
import { adminApi } from "../../api/ApiCalls";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import LinearProgress from "@mui/joy/LinearProgress";

const expectedHeaders = [
  "firstname",
  "lastname",
  "address",
  "city",
  "state",
  "zip",
  "phone",
  "gender",
  "email",
];

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileUpload, setFileUpload] = useState(false);

  const onDrop = (acceptedFiles) => {
    Papa.parse(acceptedFiles[0], {
      header: true,
      complete: (results) => {
        setHeaders(Object.keys(results.data[0]));
        if (expectedHeaders.join(",") !== headers.join(",")) {
          setErrorMessage("Headers do not match the expected format");
        } else {
          setErrorMessage("");
          setFile(acceptedFiles[0]);
        }
      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminApi.post("/uploaddata", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });
      setFileUpload(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item sm={10}>
        <Typography sx={{ mt: 2 }} variant="h4" color="primary" gutterBottom>
          Upload Data
        </Typography>
        <Divider />
        <Typography
          sx={{ mt: 5, mb: 5 }}
          variant="h6"
          color="secondary"
          gutterBottom>
          To upload data please make sure your file looks like the image below
          also it should be in CSV format
        </Typography>
        <img src="/fordata.png" alt="for data" sx={{ mb: 5 }} />
        <Box sx={{ mt: 5 }}>
          <div>
            <div {...getRootProps()}>
              <Button variant="contained" color="secondary" component="label">
                Upload File
                <input {...getInputProps()} name="file" hidden />
              </Button>

              <p>Drag 'n' drop a CSV file here, or click to select one</p>
            </div>
            {isUploading && (
              <LinearProgress
                determinate
                variant="determinate"
                sx={{ width: "50%", m: 5 }}
                value={uploadProgress}
              />
            )}
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpload}
              disabled={!file || !!errorMessage}>
              Upload
            </Button>
            {fileUpload ? (
              <Alert severity="success" sx={{ mt: 5 }}>
                Data Upload Successfull
              </Alert>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DataUpload;
