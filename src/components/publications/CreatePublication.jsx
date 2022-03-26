import { useState, useEffect } from "react";
import createPost from "@/lens/publication/create-post.js";
import { uploadImageIpfs, uploadMetadataIpfs } from "@/helpers/ipfs";
import UploadFileModal from "@/components/publications/UploadFileModal";
import { PaperClipIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CreatePublication() {
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function createPublication(event) {
    event.preventDefault();

    const media = file.length > 0 ? await uploadImageIpfs(file[0]) : [];

    const ipfsCid = await uploadMetadataIpfs({ message, media });

    const tx = await createPost({ ipfsCid });

    if (tx) {
      alert("Post has been successfully created :)");
    }
  }

  const thumbs = file?.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(file?.preview);
  }, [file]);

  return (
    <>
      <div className="flex items-start max-w-7xl mx-auto mt-5">
        <div className="max-w-3xl mx-auto flex-1">
          <form action="#" className="relative">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <label htmlFor="comment" className="sr-only">
                Write your post here...
              </label>
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="block w-full my-2 border-0 focus:ring-0 sm:text-sm"
                placeholder="Add your comment..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              {file && <aside style={thumbsContainer}>{thumbs}</aside>}

              {/* Spacer element to match the height of the toolbar */}
              <div className="pb-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                    onClick={() => {
                      setIsModalVisible(true);
                    }}
                  >
                    <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Attach a file</span>
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  onClick={createPublication}
                  className={classNames(
                    message || file.length > 0
                      ? "bg-gradient-to-r from-[#12C2E9] via-[#C471ED] to-[#F64F59] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "bg-indigo-100 cursor-not-allowed",
                    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white"
                  )}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isModalVisible && (
        <UploadFileModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setFile={setFile}
        />
      )}
    </>
  );
}

export default CreatePublication;

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
