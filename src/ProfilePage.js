const ProfilePage = ({ user, token }) => {
    
    if(!user){
        navigate('/')
    } else {
        return (
            <h1>You have reached the profile page</h1>
        )
    }
};

export default ProfilePage;