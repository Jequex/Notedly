import { createGlobalStyle } from 'styled-components';
import { normalize } from 'normalize.css';


export default createGlobalStyle`
${normalize}

*, *:before, *:after {
    box-sizing: border-box
}

body, html {
    height: 100%,
    width
}
`;