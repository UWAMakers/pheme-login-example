var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class PhemeCardManager {
    constructor(userToken) {
        if (!userToken) throw new Error('User Token Required');
        this.token = userToken;
        this.cards = [];
        this.url = 'https://auth.uwamakers.com/api/user/cards';
        this.fetchOpts = {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        };
    }

    // preseve the array in case used in vue or similar
    clearCards() {
        const len = this.cards.length;
        for (let i = 0; i < len; i++) this.cards.pop();
    }

    detroy() {
        this.userToken = '';
        this.url = '';
        this.clearCards();
    }

    find() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const res = yield fetch(`${_this.url}/?token=${_this.token}`, _extends({ method: 'GET' }, _this.fetchOpts));
            const body = yield res.json();
            if (!res.ok) console.error(res, body);
            if (!body.success) throw new Error(body.message);
            _this.clearCards();
            for (let card of body.cards) _this.cards.push(card);
            return body.cards;
        })();
    }

    create(uuid, name) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const res = yield fetch(`${_this2.url}/?token=${_this2.token}`, _extends({}, _this2.fetchOpts, {
                method: 'POST',
                body: JSON.stringify({
                    uuid,
                    name
                })
            }));
            const body = yield res.json();
            if (!res.ok) console.error(res, body);
            if (!body.success) throw new Error(body.message);
            _this2.cards.push(body.card);
            return body.card;
        })();
    }

    get(cardId) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const res = yield fetch(`${_this3.url}/${cardId}?token=${_this3.token}`, _extends({ method: 'GET' }, _this3.fetchOpts));
            const body = yield res.json();
            if (!res.ok) console.error(res, body);
            if (!body.success) throw new Error(body.message);
            return body.card;
        })();
    }

    patch(cardId, name) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const res = yield fetch(`${_this4.url}/${cardId}?token=${_this4.token}`, _extends({}, _this4.fetchOpts, {
                method: 'POST',
                body: JSON.stringify({
                    name
                })
            }));
            const body = yield res.json();
            if (!res.ok) console.error(res, body);
            if (!body.success) throw new Error(body.message);
            const i = _this4.cards.findIndex(function (card) {
                return card.cardId === body.card.cardId;
            });
            if (i !== -1) _this4.cards.splice(i, 1, body.card);
            return body.card;
        })();
    }

    delete(cardId) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const res = yield fetch(`${_this5.url}/${cardId}?token=${_this5.token}`, _extends({ method: 'DELETE' }, _this5.fetchOpts));
            const body = yield res.json();
            if (!res.ok) console.error(res, body);
            if (!body.success) throw new Error(body.message);
            const i = _this5.cards.findIndex(function (card) {
                return card.cardId === body.card.cardId;
            });
            if (i !== -1) _this5.cards.splice(i, 1);
            return body.card;
        })();
    }
};
