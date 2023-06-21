## Production build

**[ICE Chat App](https://remarkable-basbousa-d78cf9.netlify.app/)**

## Запуск проекта

- `npm install` - установка зависимостей
- `npm run start:dev` - запуск dev сервера + запуск dev проекта

---

## Скрипты

- `npm run dev` - запуск dev проекта
- `npm run start:dev:server` - запуск dev сервера
- `npm run start:dev` - запуск dev сервера + запуск dev проекта
- `npm run build` - сборка в prod режиме в папку dist
- `npm run preview` - предпросмотр сборки
- `npm run prettier` - форматирование файлов
- `npm run lint:ts` - проверка ts файлов линтером
- `npm run lint:ts:fix` - исправление ts файлов линтером
- `npm run test:unit` - запуск unit тесов с jest
- `npm run test:ui` - запуск скриншотных тестов с chromatic
- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook
- `npm run prepare` - прекоммит хуки с husky
- `npm run create:shared` - генерация компонента shared слоя
- `npm run create:widget` - генерация компонента widgets слоя
- `npm run create:page` - генерация компонента pages слоя
- `npm run create:entitie` - генерация компонента entities слоя
- `npm run create:feature` - генерация компонента features слоя

---

## Архитектура проекта

В проекте использовалась архитектурная методология для фронтенд проектов - **Feature-Sliced Design**

Документация методологии - [Feature-Sliced Design (FSD)](https://feature-sliced.design/ru/docs)

---

## Интернационализация проекта

Для интернационализации проекта используется библиотека i18next.
Переводы хранятся в public/locales.

Для комфортной работы с библиотекой рекомендуется установка соответствующих плагинов для среды разработки.

Документация библиотеки - [i18next](https://react.i18next.com/)

---

## Тестирование

Тестирование состоит их 3 типов тестов:
1) `npm run test:unit` - unit тестирование с jest
2) `npm run test:unit` - тестирование компонентов с React testing library
3) `npm run test:ui` - скриншотное тестирование ui с loki

[Подробнее о тестировании](./docs/test.md)

---

## Линтинг и форматирование

В проекте используется eslint для проверки typescript кода.
Для форматирования используется prettier.

##### Скрипты для запуска линтеров и форматирования
- `npm run lint:ts` - проверка ts файлов линтером
- `npm run lint:ts:fix` - исправление ts файлов линтером
- `npm run prettier` - форматирование файлов

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Для перехвата запросов на сервер используется msw-storybook-addon.

Файл со стори-кейсами (.stories.tsx) находятся рядом с компонентом.

- `npm run storybook` - запуск storybook
- `npm run storybook:build` - сборка storybook

[Подробнее о Storybook](./docs/storybook.md)

---

## Конфигурация проекта

Конфиг vite - [vite.config.ts](./vite.config.ts)

- [config/jest](./test/config/) - конфигурация jest
- [config/storybook](./.storybook/) - конфигурация storybook

---

## Генерация компонентов

Для генерации компонентов используется библиотека plop.

Конфиг библиотеки находится в [plopfile.js](./plopfile.js)

Шаблоны для генерации хранятся в [templates/](./templates/)

Скрипты для генерации компонентов:
- `npm run create:shared` - генерация компонента shared слоя
- `npm run create:widget` - генерация компонента widgets слоя
- `npm run create:page` - генерация компонента pages слоя
- `npm run create:entitie` - генерация компонента entities слоя
- `npm run create:feature` - генерация компонента features слоя

Документации библиотеки - [plop](https://plopjs.com/documentation/)

---

## CI pipeline и pre-commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и storybook, линтинг.

В прекоммит хуках происходит проверка линтинга и форматирования измененных файлов с помощью `lint-staged`, конфиг 
находится в [/.husky](./.husky)

---

### Работа с состоянием проекта

Взаимодействие с данными осуществляется с помощью менеджера состояния redux toolkit.

Запросы на сервер отправляются с применением [RTK query](./src/shared/api/rtkApi.ts).

Для асинхронного подключения reducer используется
[ReducerManager](./src/app/provider/Store/config/reducerManager.ts), применяемый в HOC
[DynamicModuleLoader](./src/shared/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

## Сущности (entities) по FSD

- [Chat](./src/entities/Chat/README.md)
- [Comment](./src/entities/Comment/README.md)
- [Friend](./src/entities/Friend/README.md)
- [Group](./src/entities/Group/README.md)
- [Message](./src/entities/Message/README.md)
- [Post](./src/entities/Post/README.md)
- [SocialData](./src/entities/SocialData/README.md)
- [User](./src/entities/User/README.md)

---

## Фичи (features) по FSD

- [AuthByUsername](./src/features/AuthByUsername/README.md)
- [GroupDataCard](./src/features/GroupDataCard/README.md)
- [LangSwitcher](./src/features/LangSwitcher/README.md)
- [PostListWithComments](./src/features/PostListWithComments/README.md)
- [ProfileCard](./src/features/ProfileCard/README.md)
- [RegisterByUsername](./src/features/RegisterByUsername/README.md)
- [SearchChatsByName](./src/features/SearchChatsByName/README.md)
- [SearchFriendsByName](./src/features/SearchFriendsByName/README.md)
- [SearchGroupsByName](./src/features/SearchGroupsByName/README.md)
- [ThemeSwitcher](./src/features/ThemeSwitcher/README.md)
