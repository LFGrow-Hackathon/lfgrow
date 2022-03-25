/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDropzone } from 'react-dropzone';

function UploadFileModal({ isModalVisible, setIsModalVisible, setFile }) {
  const config = {
    accept: 'image/gif, image/jpeg, image/png, image/tiff, image/x-ms-bmp, image/svg+xml, image/webp',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFile(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      setIsModalVisible(false);
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

  return (
    <Transition.Root show={isModalVisible} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsModalVisible(false)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <section className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop a file here, or click to select one</p>
                </div>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default UploadFileModal;

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
};