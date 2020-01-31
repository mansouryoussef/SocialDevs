// React component and page generator
// Creator - Youssef Manosur

const fs = require('fs');

// Command arguments arr
const args = [];

// Loop over the command arguments arr
process.argv.forEach((arg, i) => {
	// Skip the first 2 items
	if (i > 1) {
		// Add arg to args array
		args.push(arg);
	}
});

const generate = argsArr => {
	let folder = '';

	//Check for flags
	if (argsArr.includes('-p')) {
		folder = 'pages';
	} else if (argsArr.includes('-c')) {
		folder = 'components';
	} else if (argsArr.length === 0) {
		return console.log('No args found.');
	} else if (!argsArr.includes('-p') && !argsArr.includes('-c')) {
		return console.log('Error: Please specify folder. -p OR -c');
	}

	// Check if 'components' folder doesn't exist
	if (!fs.existsSync(`../${folder}`)) {
		// Create components folder
		fs.mkdirSync(`../${folder}`);
	}

	// Loop over argsArr
	argsArr.forEach(name => {
		// Check If component's name doesn't aleady exist and name item is not a flag
		if (!fs.existsSync(`../${folder}/${name}`) && name.charAt(0) !== '-') {
			// Create folder in ../components with the name of the component
			fs.mkdirSync(
				`../${folder}/${name.charAt(0).toUpperCase() + name.slice(1)}`
			);

			// Create a js file with react fn component starter
			fs.writeFileSync(
				`../${folder}/${name.charAt(0).toUpperCase() +
					name.slice(1)}/${name.charAt(0).toUpperCase() + name.slice(1)}.jsx`,
				`import React from 'react'
import Styles from "./${name}.module.scss"
export default function ${name.charAt(0).toUpperCase() + name.slice(1)}() {
    return (
        <div className={Styles.${name.toLowerCase()}${
					folder === 'components'
						? 'Container'
						: folder.substring(0, folder.length - 1)
				}}>
            <h1>${name.toLowerCase()}</h1>             
        </div>
        )
    }
                    `
			);

			// Create a sass file
			fs.writeFileSync(
				`../${folder}/${name}/${name}.module.scss`,
				`.${name.toLowerCase()}${
					folder === 'components'
						? 'Container'
						: folder.substring(0, folder.length - 1)
				} {}`
			);
		} else if (fs.existsSync(`./${folder}/${name}`)) {
			console.log(`${name} already exists!`);
		}
	});
};

// Run the fn
generate(args);

// Usage
// node gen.js - <folder> your_comonent_names_here
