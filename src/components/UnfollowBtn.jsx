import { getAddress, getAddressFromSigner } from '@/ethers-service'
import unfollow from '@/lens/unfollow'

export default function UnfollowBtn(props){

    const unfollowFunc = async () => {
        const { profileId } = props;
        await unfollow(profileId);
    }
    
    
    return(
        <button onClick={unfollowFunc}>UNFOLLOW</button>
    )
}