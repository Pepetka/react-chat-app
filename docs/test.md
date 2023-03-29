## Unit тестирование

Unit тестирование производится с помощью фреймворка *Jest*.

`npm run test:unit` - запуск unit тестирования

Для генерации отчета тестирования используется jest-html-reporters.
Отчет хранится в [html-report/report.html](../html-report/report.html).

Файлы тестов хранятся рядом с тестируемыми файлами.

Документация фреймворка - [jest](https://jestjs.io/docs/getting-started)

---

## Тестирование компонентов

Тестирование компонентов производится с помощью утилиты для тестирования *React Testing Library*.

`npm run test:unit` - запуск тестирования компонентов

Для генерации отчета тестирования используется jest-html-reporters.
Отчет хранится в [html-report/report.html](../html-report/report.html).

Файлы тестов хранятся рядом с файлами тестируемых компонентов.

Документация утилиты - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## Скриншотное тестирование

Скриншотное тестирование производится с помощью библиотеки *chromatic*.

Скриншоты снимаются с storybook stories.

`npm run test:ui` - запуск скриншотного тестирования

Документация библиотеки - [chromatic](https://www.chromatic.com/docs/)
