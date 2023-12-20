import {BaseHtml} from "../../main/layouts/BaseHtml";

export const LoginPage = () => {
    return BaseHtml(
        <div class="min-h-screen flex items-center justify-center" >
            <div class="bg-white p-8 rounded shadow-md w-96">
                <h2 class="text-2xl font-bold mb-6">Login</h2>
                <form class="space-y-4" hx-post="/auth/sign" hx-target="this">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="password" type="password" placeholder="Enter your password" />
                    </div>
                    <div>
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}