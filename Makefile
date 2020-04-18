install:
	npm install
start:
	npx babel src --out-dir dist
run:
	npx babel-node 'src/bin/gendiff.js' --format plain ./__fixtures__/beforeTree.ini ./__fixtures__/beforeTree.json
lint:
	npx eslint .
test:
	npm test
build:
	npm run build
test-coverage:
	npm test -- --coverage