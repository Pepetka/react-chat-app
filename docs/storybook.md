## Storybook

Стори-кейсы каждого компонента находятся в файлах с расширением `.stories.tsx` рядом с файлами компонентов, к которым 
эти стори-кейсы относятся.

- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

Пример составления стори-кейсов:
```typescript jsx
import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'shared/Button',
	component: Button,
	argTypes: {
		theme: {
			options: ['primary', 'outline', 'clear'],
			control: { type: 'radio' },
		},
	},
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'Button',
	width: '100px',
	height: '50px',
};

export const Outline = Template.bind({});
Outline.args = {
	children: 'Button',
	theme: 'outline',
	width: '100px',
	height: '50px',
};
```

Пример перехвата запросов:
```typescript
Normal.parameters = {
	msw: [
		rest.get(
			`${__API__}messages?chatId=&userId=0&friendId=1`,
			(_req, res, ctx) => {
				return res(ctx.json(response));
			},
		),
	],
};
```

Документация библиотеки - [storybook](https://storybook.js.org/docs/react/get-started/install)

Документация библиотеки - [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)
