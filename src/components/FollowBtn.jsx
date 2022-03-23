import { getAddress, getAddressFromSigner } from '@/ethers-service'
import { follow } from '@/lens/follow'

export default function FollowBtn(props){

    const followFunc = async () => {
        const { profileId } = props;
        await follow(profileId)
    }
    
    
    return(
        <button onClick={followFunc}>FOLLOW</button>
    )
}