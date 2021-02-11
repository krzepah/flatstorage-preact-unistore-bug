import createStore from 'unistore'
import devtools from 'unistore/devtools'
import {without, concat} from 'ramda';

const initialState = ({
    element_ids: [],
    new_id: 1
})

export const store = process.env.NODE_ENV === 'production' ?
    createStore(initialState) : devtools(createStore(initialState))

export const mutations = {
    create: (state, subject, value) => {
        const {new_id} = state;
        return ({
            [subject + '_ids']: concat(state[subject + '_ids'], [new_id]),
            [new_id]: value,
            new_id: new_id + 1,
        })
    },
    update: (state, id, param, value) => ({[id]: {...state[id], [param]: value}}),
    remove: (state, subject, id) => {
        let r = state;
        delete r[id]
        r[subject + '_ids'] = without([id], state[subject + '_ids']);
        return r
    }
};

store.subscribe((e) => console.log(e))
