install:
	npm install
start:
	npx babel src --out-dir dist
run:
	npx babel-node 'src/bin/gendiff.js' before.json after.json
lint:
	npx eslint .
test:
	npm test