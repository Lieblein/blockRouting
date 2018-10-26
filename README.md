# [DEMO](https://lieblein.github.io/blockRouting/build/)

# Не выходи из роута, не совершай ошибку
 
Всем привет. Сегодня мы поговорим о блокировке роутинга в SPA-приложении.

Недавно я получила от пользователей такой фидбэк:
> Я заполняю форму и, не сохранив ее, перехожу на другую страницу. Заполненные данные пропадают. Нельзя ли сделать предупреждение при переходе на другую страницу?

Конечно, можно! И сейчас я расскажу, как.
Сразу предупрежу, что мы будем использовать `react-router-dom v4`. Четвертая версия значительно отличается от предыдущих, и блокировку роутинга раньше делали совсем не так.

Сеньорам-помидорам статья может показаться капитанской, поэтому сразу укажу ссылку на [демо](https://lieblein.github.io/blockRouting/build/) и рекомендую Вам изучить код в этой репке. Также в конце статьи будет краткий алгоритм реализации этой фичи. Мне же кажется, что документация `react-router`-а скупа на хорошие развернутые примеры, поэтому моя статья поможет Вам в реализации подобной фичи.
 
## Шаг №1, подготовка
Для демонстрации блокировки роутинга нам понадобится:
* Самая простая форма 1 шт,
* NavLink 2 шт,
* и классический confirm с двумя кнопками.

Блокировать роутинг мы будем только тогда, когда в форме есть какие-либо изменения, поэтому добавим к текстовому полю обработчик [onChange](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L64).
```js
onChange = ({ target: { value } }) => {
    const { defaultValue } =this.state;
    const changed = defaultValue !== value;
 
    this.setState({
        value,
        changed
    });
};
```
 
## Шаг №2, данные для confirm-а
`Confirm` мы будем рендерить в компоненте формы, но некоторые колбэки можно получить только из `BrowserRouter`, который у меня находится в компоненте [`App`](https://github.com/Lieblein/blockRouting/blob/master/src/components/App/index.jsx#L27). Чтобы связать эти два компонента я воспользуюсь redux-ом. Создадим [`reducer`](https://github.com/Lieblein/blockRouting/blob/master/src/reducers/confirm.js#L9):
```js
export default function confirmReducer(state = initialState, action) {
    switch (action.type) {
        case CONFIRM_SHOW: {
            const { goToNextPage, blockRouting } = action;
            return {
                ...state,
                visible: true,
                goToNextPage,
                blockRouting
            };
        }
 
        case CONFIRM_HIDE:
            return initialState;
 
        default:
            return state;
    }
}
```

Также добавим простейшие [`action-ы`](https://github.com/Lieblein/blockRouting/blob/master/src/actions/confirm.js#L3):
```js
export function showConfirm(goToNextPage, blockRouting) {
    return (dispatch) => {
        dispatch({ type: CONFIRM_SHOW, goToNextPage, blockRouting });
    };
}
 
export function hideConfirm() {
    return (dispatch) => {
        dispatch({ type: CONFIRM_HIDE });
    };
}
```

## Шаг №3, [`getUserConfirmation`](https://reacttraining.com/react-router/web/api/BrowserRouter/getuserconfirmation-func)
Поздравляю! Вы добрались до самой сути ─ блокировки роутинга. В недрах документации `react-router-а` можно откопать очень полезную функцию [`getUserConfirmation`](https://reacttraining.com/react-router/web/api/BrowserRouter/getuserconfirmation-func). Вдобавок есть очень скромный [пример ее использования](https://github.com/ReactTraining/history#customizing-the-confirm-dialog).
Использование колбэка для блокировки в таком ─ `callback(true/false)` ─  виде кажется мне не очень интуитивным. Поэтому я привязала к этой функции конкретные [аргументы](https://github.com/Lieblein/blockRouting/blob/master/src/components/App/index.jsx#L17). 
```jsx
getUserConfirmation = (message, callback) => {
    const { showConfirm } =this.props;
 
    const goToNextPage = callback.bind(null, true);
    const blockRouting = callback.bind(null, false);
    showConfirm(goToNextPage, blockRouting);
};	
 
render() {
    return (
        <BrowserRouter
            getUserConfirmation={ this.getUserConfirmation }>
	...
       <BrowserRouter />
    );
}
``` 
`BrowserRouter` у меня используется в компоненте `App`. `App` я привязала к ранее описанному `reducer-у`. `showConfirm` вызывает соответствующий `action`, и сохраняет колбэки `goToNextPage`, `blockRouting` в `store`.
 
## Шаг №4, показываем `confirm`
Сейчас в `storе` у нас есть все для того, чтобы отрендерить confirm. Нужно только подключить компонент с формой к нашему вездесущему reducer-у. И все, можно дописывать [`render`](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L137).
```jsx
render() {
    const { confirmVisible, goToNextPage } =this.props;
    const {value, valid} =this.state;
 
    return (
        <Form inline={ true } className='form'>
        …
        {
            confirmVisible &&
                <Confirm
                    onClose={ this.blockAndHide}
                    buttons={ [
                        {
                            text: 'Save',
                            onClick: this.saveAndGoNext
                        },
                        {
                            text: 'Go next',
                            onClick: goToNextPage
                        }
                    ] }
                > 
                    You have not saved form data
                </Confirm>
        }
        </Form>
    );
}
```

## Шаг №5, блокируем роутинг
На третьем шаге мы прописали `getUserConfirmation`. Теперь нужно, чтобы эта функция вызывалась при изменении значения в форме. Снова заглянем в документацию `react-router-а` и найдем там функцию [`history.block`](https://github.com/ReactTraining/history#blocking-transitions). `history.block` ─ это функция высшего порядка, при вызове она вернет нам функцию `unblock`. Дальше все просто, при изменении флага `changed` [блогируем/деблокируем роутинг](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L36).
```js
componentWillUpdate(nextProps, nextState) {
    const { history: { block } } =this.props;
    const{ changed } =this.state;
 
    if (changed !== nextState.changed) {
        if (nextState.changed) {
            this.setState({
                unblockRouting: block('message')
            });
        } else {
            this.enableRouting();
                this.setState({
                    unblockRouting: () => {}
                });
        }
    }
}
``` 
 
## Шаг №6, деблокируем роутинг
На данный момент наш confirm уже появляется, но слишком часто, тогда, когда он нам не нужен. К счастью, мы сохранили `unblockRouting` в `state` компонента, чтобы вызывать его при необходимости.
Во-первых, вспомним про [`componentWillUnmount`](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L55):
```js
componentWillUnmount() {
    this.enableRouting();
}
 
enableRouting = () => {
    this.state.unblockRouting();
    this.props.hideConfirm();
}
```
 
Во-вторых, после сохранения формы [блокировка нам тоже уже не нужна](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L84).
```js
save = () => {
    console.log('save');
    this.setState({
        changed: false
    });
};
```

Думаете, все, расходимся? Не так быстро!
 
## Шаг №7, валидация
Из-за confirm-а у нас появилась вторая кнопка сохранения. А разве стоит сохранять невалидную форму?
Для этого хитрого кейса я предлагаю такое изящное решение: меняем кнопку сохранения на отмену, чтобы пользователь мог исправить ошибки и сохранить свои данные. Нужно только чуть-чуть отредактировать [`render`](https://github.com/Lieblein/blockRouting/blob/master/src/components/PageMain/index.jsx#L138):
```jsx
render() {
    return (
        <Form inline={ true } className='form'>
        …
        {
            confirmVisible &&
                <Confirm
                    onClose={ this.blockAndHide}
                    buttons={ [
                        {
                            text: valid ? 'Save' :'Cancel',
                            onClick: valid ? this.saveAndGoNext : this.blockAndHide
                        },
                        {
                            text: 'Go next',
                            onClick: goToNextPage
                        }
                    ] }
                > 
                    You have not saved form data
                    {
                        !valid &&', and form has error'
                    }
                </Confirm>
        }
        </Form>
    );
}
``` 
Вот теперь фича готова! Наслаждайтесь.

## Краткий алгоритм
Ну и как обещала в начале статьи. Краткий алгоритм реализации фичи:
1. Сверстать форму. В `state` сохраняем флаги `changed` и `valid`; Сверстать confirm;
2. Создать для нашего confirm-а `reducer` и `action`;
3. Подключить `App` к `reducer-у` и добавить `getUserConfirmation` к `BrowserRouter`;
4. Подключить форму к `reducer-у,` и рендерить в ней confirm;
5. В `componentWillUpdate` блокировать/деблокировать роутинг при смене флага `changed`;
6. Деблокировать роутинг в `componentWillUnmount` и после сохранения формы;
7. Не забыть про валидацию.

Как видите, все просто! Фича понравилась как пользователям, так и моему менеджеру. Вскоре она стала распространяться и на другие мои формы и, пользователи получили лучший UX.

### P. S. Немного под капотом
Один из кейсов готовой фичи работает так:
1. пользователь вводит валидное значение в поле,
2. `this.state.changed` устанавливается в `true`,
3. вызывается `componentWillUpdate`, роутинг блокируется, и в `state` записывается `unblockRouting`,
4. пользователь пытается перейти на другую страницу,
5. `react-router` вызывает `getUserConfirmation`,
6. `action showConfirm` меняет `store` приложения,
7. появляется confirm,
8. пользователь сохраняет изменения,
9. происходит сохранение,
10. происходит переход по роутеру, который был инициирован на четвертом шаге,
11. вызывается `componentWillUnmount`,
12. `reducer` сбрасывается к `initialState` через `action hideConfirm`.
