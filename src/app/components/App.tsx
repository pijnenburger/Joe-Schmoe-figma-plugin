import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);

    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const onCreate = async () => {
        const count = parseInt(textbox.current.value, 10);

        const fetchUrl = 'https://joeschmoe.io/api/v1/random';

        // const fetchUrl = "https://www.rijksmuseum.nl/api/nl/collection?key=m6fzmvxx&involvedMaker=Rembrandt+van+Rijn"

        let res = await fetch(fetchUrl);
        let text = await res.json();

        console.log(text);

        parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*');
    };

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div>
            <h2>Joe Schmoe</h2>
            <p>
                Count: <input ref={countRef} />
            </p>
            <button id="create" onClick={onCreate}>
                Create
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
