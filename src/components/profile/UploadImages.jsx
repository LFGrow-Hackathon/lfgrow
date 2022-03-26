import { useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone';

function UploadImages({ picture, setPicture }) {
  const config = {
    accept: 'image/gif, image/jpeg, image/png, image/tiff, image/x-ms-bmp, image/svg+xml, image/webp',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setPicture(acceptedFiles.map(picture => Object.assign(picture, {
        preview: URL.createObjectURL(picture)
      })));
    }
  }

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone(config);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const thumbs = picture?.map((picture) => (
    <div style={thumb} key={picture.name}>
      <div style={thumbInner}>
        <img src={picture.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(picture?.preview);
  }, [picture]);

  return (
    <div className="">
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className='text-xs'>Drag 'n' drop a picture, or click to select one</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    </div>
  )
}

export default UploadImages;

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
}
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
