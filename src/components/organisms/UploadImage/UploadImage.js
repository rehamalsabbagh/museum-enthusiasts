import React, { useCallback, useState } from 'react';
import firebase from '@firebase/app';
import '@firebase/storage';
import { useDropzone } from 'react-dropzone';
import Container from '../../atoms/Container/Container';
import Text from '../../atoms/Text/Text';
import './UploadImage.css';

function UploadImage(props) {
  const _backgroundImage = props.style ? props.style.backgroundImage : '';
  const [imageUrl, setImageUrl] = useState(_backgroundImage);
  const textStyle = { pointerEvents: 'none' };
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles?.[0];
      if (!file) {
        return;
      }
      try {
        let url = await uploadFromBlobAsync({
          directory: props.directory ? props.directory : '',
          url: URL.createObjectURL(file),
          name: `${file.name}_${Date.now()}`,
        });
        props.onUpload(url);
        setImageUrl('url(' + url + ')');
      } catch (e) {}
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const _className =
    'lho_upload_image lho_error_' + props.error + ' ' + props.className;

  return (
    <Container
      style={{
        ...props.style,
        ...{ backgroundImage: imageUrl },
      }}
      className={_className}
      {...getRootProps()}
    >
      <input {...getInputProps()} accept={'image/x-png,image/gif,image/jpeg'} />
      {!imageUrl && (
        <React.Fragment>
          <Text
            style={textStyle}
            text={
              isDragActive
                ? 'Drop the image here'
                : 'Drop the image here, or click to select a image'
            }
          />
        </React.Fragment>
      )}
    </Container>
  );
}

export default UploadImage;
async function uploadFromBlobAsync({ directory, url, name }) {
  if (!url || !name) return null;
  try {
    const blob = await fetch(url).then((r) => r.blob());
    const snapshot = await firebase
      .storage()
      .ref('/' + directory)
      .child(name)
      .put(blob);
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
}
