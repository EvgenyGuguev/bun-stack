import {BaseHtml} from "../layouts/BaseHtml";

export const HomePage = () => {
    return BaseHtml(`
        <div class="flex flex-col" x-data="{ search: '' }">
            <div><h1>HOME</h1></div>
            
            <input type="text" x-model="search" class="border border-gray-300"/>
            <div>Searching for: <span x-text="search"></span></div>

            <div x-data="{ count: 0 }">
                <button x-on:click="count++">Increment</button>
                <span x-text="count"></span>
            </div>
        </div>

        <div x-data="{ open: false }">
            <button @click="open = ! open">Toggle</button>
 
            <div x-show="open" @click.outside="open = false">Contents...</div>
        </div>`
    );
}
