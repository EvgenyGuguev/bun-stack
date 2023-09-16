import {BaseHtml} from "../../main/layouts/BaseHtml";

export const Profile = async (jwt: any, set: any, auth: string) => {
    const profile = await jwt.verify(auth);

    return BaseHtml(
        <div id="profile">
            {profile ? <h1>Hello {profile.name}</h1> : <h1>Unauthorized</h1>}
            {profile ? <button hx-get="/logout" hx-target="#profile">logout</button> : null}
        </div>
    );
};