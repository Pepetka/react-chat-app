export default function (plop) {
	plop.setGenerator('componentWithoutModel', {
		description: 'A generator for React component without model',
		prompts: [
			{
				type: 'input',
				name: 'layer',
				message: 'Layer name',
			},
			{
				type: 'input',
				name: 'name',
				message: 'Component name',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/{{withUI layer}}/{{name}}/ui/{{name}}.tsx',
				templateFile: 'templates/base/ui/Component.hbs',
			},
			{
				type: 'add',
				path: 'src/{{withUI layer}}/{{name}}/ui/{{name}}.stories.tsx',
				templateFile: 'templates/base/ui/Component.stories.hbs',
			},
			{
				type: 'add',
				path: 'src/{{withUI layer}}/{{name}}/index.ts',
				templateFile: 'templates/base/index.hbs',
			},
		],
	});
	plop.setGenerator('componentWithModel', {
		description: 'A generator for React component with model',
		prompts: [
			{
				type: 'input',
				name: 'layer',
				message: 'Layer name',
			},
			{
				type: 'input',
				name: 'name',
				message: 'Component name',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/ui/{{name}}.tsx',
				templateFile: 'templates/base/ui/Component.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/ui/{{name}}.stories.tsx',
				templateFile: 'templates/base/ui/Component.stories.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/index.ts',
				templateFile: 'templates/base/index.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/api/{{camelCase name}}Api.ts',
				templateFile: 'templates/api/api.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/model/selectors/{{camelCase name}}Selectors.ts',
				templateFile: 'templates/model/selectors/selectors.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/model/slice/{{camelCase name}}Slice.ts',
				templateFile: 'templates/model/slice/slice.hbs',
			},
			{
				type: 'add',
				path: 'src/{{layer}}/{{name}}/model/types/{{camelCase name}}Schema.ts',
				templateFile: 'templates/model/types/schema.hbs',
			},
		],
	});
	plop.setGenerator('page', {
		description: 'A generator for React pages',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Page name',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/pages/{{name}}/ui/{{name}}.tsx',
				templateFile: 'templates/pages/ui/Component.hbs',
			},
			{
				type: 'add',
				path: 'src/pages/{{name}}/ui/{{name}}.stories.tsx',
				templateFile: 'templates/pages/ui/Component.stories.hbs',
			},
			{
				type: 'add',
				path: 'src/pages/{{name}}/ui/{{name}}.lazy.ts',
				templateFile: 'templates/pages/ui/Component.lazy.ts.hbs',
			},
			{
				type: 'add',
				path: 'src/pages/{{name}}/index.ts',
				templateFile: 'templates/pages/index.hbs',
			},
		],
	});
	plop.setHelper('withUI', (txt) => {
		if (txt === 'shared') {
			return `${txt}/ui`;
		}

		return txt;
	});
}
