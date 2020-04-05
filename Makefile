install:
	npm install
start:
	npx babel src --out-dir dist
run:
	npx babel-node 'src/bin/gendiff.js' --format plain ./__fixtures__/beforeTree.json ./__fixtures__/afterTree.json
lint:
	npx eslint .
test:
	npm test