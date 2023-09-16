import {BaseHtml} from "../../main/layouts/BaseHtml";

export const LoginPage = () => {
    return BaseHtml(
        <form
            class="flex flex-row space-x-3"
            hx-post="/sign"
            hx-target="this"
            _="on submit target.reset()"
        >
            <input type="text" name="username" class="border border-black" />
            <button type="submit">Log In</button>
        </form>
    )
}