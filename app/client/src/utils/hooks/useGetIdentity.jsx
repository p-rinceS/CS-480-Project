import getCookie from "../getCookie.js";


const useGetIdentity = () => {

    const identity = getCookie("identity");
    const identityData = identity ? JSON.parse(identity) : null;

    return {
        identity: identityData,
    };

}

export default useGetIdentity;