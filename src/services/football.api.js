import fetch from 'node-fetch';

export const football = (() => {

    let _apiKey = undefined;
    let _apiHost = undefined;
    let _teamId = '';
    let _seasonYear = 0;

    function _setAPIKey(key) {
        _apiKey = key;
    }

    function _setAPIHost(host) {
        _apiHost = host;
    }

    function _setTeamId(id) {
        _teamId = id;
    }

    function _setSeasonYear(year) {
        _seasonYear = year;
    }

    function _getTeamId() {
        return _teamId;
    }

    async function _getFixtues(year = _seasonYear) {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${year}&team=${_teamId}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": _apiHost,
                "x-rapidapi-key": _apiKey
            }
        });
        return response.json();
    }

    async function _getRecentFixtures() {
        const currentYear = new Date().getFullYear();
        return await _getFixtues(currentYear);
    }

    async function _getLostMatches() {
        let data = await _getFixtues()
        data = data.response;
        data = data.filter(match => {
            if ((match.teams.home.id == _teamId && match.teams.home.winner === false) || (match.teams.away.id == _teamId && match.teams.away.winner === false)) {
                return true;
            }

        });
        return data;
    }

    async function _getRandomLostMatch() {

    }

    return {
        setAPIKey: _setAPIKey,
        setAPIHost: _setAPIHost,
        setTeamId: _setTeamId,
        setSeasonYear: _setSeasonYear,
        getTeamId: _getTeamId,
        getFixtues: _getFixtues,
        getRecentFixtures: _getRecentFixtures,
        getLostMatches: _getLostMatches,
    }
})()