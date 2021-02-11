import {h} from 'preact';
import {Provider, connect} from 'unistore/preact'
import {store, mutations} from '../store';
import {map} from 'ramda';

const Element = (props) => <li>
    {props.id}, {props[props.id].name}
    <button onClick={() => props.remove('element', props.id)}>remove</button>
</li>

const LayoutBase = (props) => <div id="app">
    <button onClick={() => props.create('element', {name: 'foo'})}>create</button>
    <ul>
        {props.element_ids ? map((id) => <Element id={id} {...props} />, props.element_ids) : undefined}
    </ul>
</div>


const Layout = connect(
    (state) => (state),
    () => (mutations)
)(LayoutBase)
const App = () => <Provider store={store}><Layout /></Provider>
export default App;
