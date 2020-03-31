install:
	npm install
start:
	npx babel src --out-dir dist
run:
	npx babel-node 'src/bin/gendiff.js' ./__fixtures__/before.json ./__fixtures__/after.json
lint:
	npx eslint .
test:
	npm test