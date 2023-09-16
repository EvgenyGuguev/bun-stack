import {BaseHtml} from "../../main/layouts/BaseHtml";

export const Profile = async (jwt: any, set: any, auth: string) => {
    const profile = await jwt.verify(auth);

    return BaseHtml(
        <div>
            {profile ? <h1>Hello {profile.username}</h1> : <h1>Unauthorized</h1>}
        </div>
    );
};