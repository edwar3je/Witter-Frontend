import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

class WitterApi {
    
    /** Registers a new account (upon form submission) and returns a json web token containing the user's account information.
     */
    
    static async signUp(formData) {
        try {
            const { handle, username, password, email } = formData;
            const result = await axios.post(`${BASE_URL}/account/sign-up`, { handle: handle, username: username, password: password, email: email });
            return result.data.token;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    /** Checks the user's credentials (upon form submission) and returns a json web token containing the user's account information.
     */

    static async logIn(formData) {
        try {
            const { handle, username, password, email } = formData;
            const result = await axios.post(`${BASE_URL}/account/log-in`, { handle: handle, username: username, password: password, email: email });
            return result.data.token;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    /** Returns the profile information for a given account. Throws a 404 error if the account does not exist.
     */

    static async getProfile(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };

    /** Edits the profile information for a given account (upon form submission). Throws a 404 error if the account does not exist.
     *  Throws a 401 error if the user does not own the account.
     */

    /*static async editProfile(handle, formData, token) {
        try {
            const { username, oldPassword, newPassword, email, userDescription, profilePicture, bannerPicture } = req.body;
            const result = await axios.put(`${BASE_URL}/profile/${handle}/edit`, { _token: token, username: username, oldPassword: oldPassword, newPassword: newPassword, email: email, userDescription: userDescription, profilePicture: profilePicture, bannerPicture: bannerPicture });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Deletes an account. Throws a 404 error if the account does not exist. Throws a 401 error if the user does not own the account.
     */

    /*static async deleteAccount(handle, token) {
        try {
            const result = await axios.delete(`${BASE_URL}/profile/${handle}/edit`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of weets the account (handle) has written. Throws a 404 error if the account does not exist. 
    */

    /*static async getWeets(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/weets`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of weets the account (handle) has reweeted. Throws a 404 error if the account does not exist.
     */

    /*static async getReweets(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/reweets`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of weets the account (handle) has favorited. Throws a 404 error if the account does not exist.
     */

    /*static async getFavorites(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/favorites`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of weets the account (handle) has tabbed. Throws a 404 error if the account does not exist. Throws a 401
     *  error if the user does not own the account.
     */

    /*static async getTabs(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/tabs`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of accounts the account (handle) follows. Throws a 404 error if the account does not exist. 
    */

    /*static async getFollowing(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/following`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of accounts that are currently following the account (handle). Throws a 404 error if the account does not exist.
     */

    /*static async getFollowers(handle, token) {
        try {
            const result = await axios.get(`${BASE_URL}/profile/${handle}/followers`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array of users that match a given search string provided (upon form submission). The results of the search string are 
     *  case insensitive, allowing for the maximum number of users to be returned.
     */

    /*static async searchUsers(search, token) {
        try {
            const result = await axios.post(`${BASE_URL}/user/${search}`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the current user to follow another account (handle), assuming the user is not currently following the other account. 
     *  Throws a 404 error if the other account does not exist. Throws a 403 error if the current user is already following the account.
    */

    /*static async follow(handle, token) {
        try {
            const result = await axios.post(`${BASE_URL}/user/${handle}/follow`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the current user to unfollow another account (handle), assuming the user is currently following the other account.
     *  Throws a 404 error if the other account does not exist. Throws a 403 error if the current user is not currently following the account.
     */

    /*static async unfollow(handle, token) {
        try {
            const result = await axios.post(`${BASE_URL}/user/${handle}/unfollow`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns an array consisting of the current user's feed. The feed consists of weets from the user and accounts the user is currrently
     *  following.
     */

    /*static async getFeed(token) {
        try {
            const result = await axios.get(`${BASE_URL}/weets/`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the current user to create/post a new weet (upon form submission).
    */

    /*static async createWeet(token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Returns information on a given weet based on the weet id provided. Throws a 404 error if the weet does not exist.
     */

    /*static async getWeet(id, token) {
        try {
            const result = await axios.get(`${BASE_URL}/weets/${id}`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to edit a weet (upon form submission), assuming the user is the author of the weet. Throws a 404 error if the weet
     *  does not exist. Throws a 401 error if the user is not the author of the weet.
     */

    /*static async editWeet(id, formData, token) {
        try {
            const { weet } = formData;
            const result = await axios.put(`${BASE_URL}/weets/${id}`, { _token: token, weet: weet });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to delete a weet, assuming the user is the author of the weet. Throws a 404 error if the weet does not exist. Throws
     *  a 401 error if the user is not the author of the weet.
     */

    /*static async deleteWeet(id, token) {
        try {
            const result = await axios.delete(`${BASE_URL}/weets/${id}`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to reweet a weet (id), assuming the user has not already reweeted the weet. Throws a 404 error if the weet does not
     *  exist. Throws a 401 error if the user has already reweeted the weet. 
     */

    /*static async reweet(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/reweet`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to unreweet a weet (id) the user has previously reweeted. Throws a 404 error if the weet does not exist. Throws a 401
     *  error if the user has not reweeted the weet.
     */

    /*static async unreweet(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/unreweet`, { _token: token });
            return result.data
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to favorite a weet (id), assuming the user has not already favorited the weet. Throws a 404 error if the weet does not
     *  exist. Throws a 401 error if the user has already favorited the weet.
     */

    /*static async favorite(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/favorite`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to unfavorite a weet (id) the user has previously favorited. Throws a 404 error if the weet does not exist. Throws a
     *  401 error if the user has not favorited the weet.
     */

    /*static async unfavorite(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/unfavorite`, { _token: token });
            return result.data
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to tab a weet (id), assuming the user has not already tabbed the weet. Throws a 404 error if the weet does not exist.
     *  Throws a 401 error if the user has already tabbed the weet.
     */

    /*static async tab(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/tab`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/

    /** Allows the user to untab a weet (id) the user has previously tabbed. Throws a 404 error if the weet does not exist. Throws a 401 error
     *  if the user has not tabbed the weet.
     */
    
    /*static async untab(id, token) {
        try {
            const result = await axios.post(`${BASE_URL}/weets/${id}/untab`, { _token: token });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    };*/
}

export default WitterApi;