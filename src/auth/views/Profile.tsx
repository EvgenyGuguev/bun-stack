import {BaseHtml} from "../../main/layouts/BaseHtml";

export const Profile = async (jwt: any, set: any, auth: string) => {
    const profile = await jwt.verify(auth);

    return BaseHtml(
        profile ?
            <div id="profile">
                <h1>Hello {profile.email}</h1>
                <button hx-get="/auth/logout" hx-target="#profile">logout</button>
            </div>
            : <h1>Unauthorized</h1>
    );
};