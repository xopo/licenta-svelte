import { writable } from 'svelte/store';
export const newdoc = writable({
    name: '',
    slug: '',
    url: '',
    type: 'pdf',
    file: ''
})