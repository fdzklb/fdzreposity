import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// beautify error output
require('pretty-error').start();

configure({ adapter: new Adapter() });

export { toJson, shallow, mount, render };
