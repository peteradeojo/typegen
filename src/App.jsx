import { useState } from 'react';
import { generateTypes, serialize } from './generator.js';
import Github from '@mui/icons-material/GitHub.js';
import Twitter from '@mui/icons-material/Twitter.js';

function App() {
	const [text, setText] = useState('');
	const [gen, setGen] = useState('');
	const [typeName, setType] = useState('HoeMath');

	const updateGen = (text) => text; //.replace(/\s+/, '&nbsp;');

	const generateType = () => {
		try {
			const obj = JSON.parse(text);

			const t = serialize(generateTypes(obj));
			setGen(`type ${typeName} = ` + t);
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
						<small>if you like it, give the repo a ⭐️?</small>
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
					<form
						onSubmit={(e) => {
							e.preventDefault();
							generateType();
						}}
					>
						<input
							type="text"
							className="form-control"
							placeholder="Name"
							onInput={(e) => setType(e.target.value)}
              value={typeName}
							required
						/>
						<div className="p-1"></div>
						<textarea
							className="p-2"
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder='{"message": "Paste JSON schema"}'
							required
						>
							{text}
						</textarea>
						<button type="submit">Generate</button>
					</form>
				</div>
				<div className="p-1"></div>
				<textarea className="p-2" defaultValue={gen}></textarea>
			</div>
		</>
	);
}

export default App;
