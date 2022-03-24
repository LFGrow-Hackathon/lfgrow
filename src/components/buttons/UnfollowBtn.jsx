import unfollow from '@/lens/unfollow'

export default function UnfollowBtn(props){

    const unfollowFunc = async () => {
        const { profileId } = props;
        await unfollow(profileId);
    }
    
    
    return(
        <button
            onClick={unfollowFunc}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-gray-100"
        >UNFOLLOW</button>
    )
}