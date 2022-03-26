import { useState, useEffect } from "react";
import { uploadImageIpfs } from "@/helpers/ipfs";
import updateProfile from "@/lens/update-profile";
import getProfiles from "@/lens/get-profiles.js";
import UploadImages from "@/components/profile/UploadImages";

export default function EditProfile(props) {
  const profileId = window.localStorage.getItem("profileId");
  const [profile, setProfile] = useState();
  const [picture, setPicture] = useState();
  const [coverPicture, setCoverPicture] = useState();
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
    twitterUrl: "",
    picture: "",
    coverPicture: ""
  });

  useEffect(() => {
    async function getProfile() {
      const { profiles } = await getProfiles({ profileIds: [profileId] });
      setProfile(profiles.items[0]);

      setUserInfo({
        name: profiles.items[0].name || "",
        bio: profiles.items[0].bio || "",
        location: profiles.items[0].location || "",
        website: profiles.items[0].website || "",
        twitterUrl: profiles.items[0].twitterUrl || "",
        picture: profiles.items[0].picture,
        coverPicture: profiles.items[0].coverPicture
      });
    }

    getProfile();
  }, []);

  useEffect(() => {
    async function uploadPhoto() {
      const result = await uploadImageIpfs(picture[0]);

      setUserInfo((prevState) => ({
        ...prevState,
        picture: result[0].item,
      }))
    }

    if (picture) {
      uploadPhoto();
    }
  }, [picture])

  useEffect(() => {
    async function uploadPhoto() {
      const result = await uploadImageIpfs(coverPicture[0]);

      setUserInfo((prevState) => ({
        ...prevState,
        coverPicture: result[0].item,
      }))
    }

    if (coverPicture) {
      uploadPhoto();
    }
  }, [coverPicture])

  const inputsHandler = (e) => {
    const val = e.target.value;

    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: val,
    }));
  };

  const update = async () => {
    if (!userInfo.name) {
      alert("You need to set a username.")
      return;
    }

    await updateProfile({
      profileId: profile.id,
      ...userInfo
    });
  };

  return (
    <div className="flex w-4/5 max-w-[60%] px-4 justify-center">
      <div className="w-full h-full pl-5 pr-5 mt-10 mb-10 bg-white border-2 border-[#e1e8f7] rounded-md">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">
                  Edit your profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Username
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="username"
                        autoComplete="username"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        value={userInfo.name}
                        onChange={inputsHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Bio
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                      id="about"
                      name="bio"
                      rows={3}
                      className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                      value={userInfo.bio}
                      onChange={inputsHandler}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about yourself.
                    </p>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="picture"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Picture
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <UploadImages picture={picture} setPicture={setPicture} />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-picture"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Cover picture
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <UploadImages picture={coverPicture} setPicture={setCoverPicture} />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Link to your twitter account
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="twitterUrl"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={userInfo.twitterUrl}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Link to your website
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="website"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={userInfo.website}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Your location
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="location"
                      id="first-name"
                      autoComplete="given-name"
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      value={userInfo.location}
                      onChange={inputsHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  setPicture(undefined);
                  setCoverPicture(undefined);
                  setUserInfo({
                    name: "",
                    bio: "",
                    location: "",
                    website: "",
                    twitterUrl: ""
                  })
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={update}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
