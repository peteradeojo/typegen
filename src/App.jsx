import { useState } from 'react';
import { getInferences, collator } from './generator.js';
import Github from '@mui/icons-material/GitHub.js';
import Twitter from '@mui/icons-material/Twitter.js';

function App() {
	const [text, setText] = useState('');
	const [gen, setGen] = useState('');

	// const generateType = () =>  {}

	const generateType = () => {
		try {
			const obj = JSON.parse(text);

			const infs = getInferences(obj, 1, 1);
			const t = collator(infs, 'TYPE');

			setGen(t);
		} catch (err) {
			setGen(err.message);
		}
	};

	return (
		<>
			<div className="App">
				<div className="row">
					<div>
						<h1>Type Generator</h1>
            <small>Give the repo a ⭐️</small>
					</div>
					<div className="navList">
						<a
							className="p-2"
							href="https://github.com/peteradeojo/typegen"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							<Github fontSize="large" />
						</a>
						<a
							href="https://twitter.com/boluwatifee__"
							target="_blank"
							className="p-2"
						>
							<Twitter fontSize="large" />
						</a>
					</div>
				</div>
				<div className="p-2"></div>
				<div>
					<textarea
						className="p-2"
						value={text}
						onChange={(e) => setText(e.target.value)}
            placeholder='{"message": "Paste JSON schema"}'
					>
						{text}
					</textarea>
					<button onClick={generateType}>Generate</button>
				</div>
				<div className="p-1"></div>
				<textarea className="p-2" defaultValue={gen}></textarea>
			</div>
		</>
	);
}

export default App;
