import { writable } from 'svelte/store';
export const newdoc = writable({
    name: 'test new stuff',
    slug: 'asf',
    url: 'http://www.goto.com/somefile',
    type: 'pdf',
    file: ''
})