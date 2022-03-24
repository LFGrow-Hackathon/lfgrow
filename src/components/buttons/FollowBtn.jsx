import { follow } from '@/lens/follow'

export default function FollowBtn(props){

    const followFunc = async () => {
        const { profileId } = props;
        await follow(profileId)
    }
    
    
    return(
        <button
            onClick={followFunc} 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white"
            style={{background: 'linear-gradient(107.71deg, #12C2E9 0%, #C471ED 44.48%, #F64F59 99.31%', padding: '7px 30px', boxShadow: '1px 3px 3px rgba(28, 119, 188, 0.15)', border: '0' }}
        >FOLLOW</button>
    )
}